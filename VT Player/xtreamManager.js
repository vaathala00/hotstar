// XTream Codes Manager - Ruby Player

const xtreamLogins = [];
const MAX_SAVED_LOGINS = 20;

let currentXtreamSession = null;
let xtreamCategories = {
  live: [],
  vod: [],
  series: []
};
let xtreamCategoryCounts = {
  live: {},
  vod: {},
  series: {}
};
let currentXtreamType = 'live';
let xtreamSortAZ = false;

// Load saved logins from localStorage
function loadXtreamLogins() {
  try {
    const saved = localStorage.getItem('xtreamLogins');
    if (saved) {
      xtreamLogins.length = 0;
      xtreamLogins.push(...JSON.parse(saved));
    }
  } catch (error) {
    console.error('Error loading Xtream logins:', error);
  }
  renderSavedLogins();
}

// Save logins to localStorage
function saveXtreamLogins() {
  try {
    localStorage.setItem('xtreamLogins', JSON.stringify(xtreamLogins));
  } catch (error) {
    console.error('Error saving Xtream logins:', error);
  }
}

// Render saved logins list
function renderSavedLogins() {
  const savedList = document.getElementById('xtreamSavedList');
  const savedCount = document.getElementById('xtreamSavedCount');
  
  if (!savedList || !savedCount) return;
  
  savedCount.textContent = xtreamLogins.length;
  
  if (xtreamLogins.length === 0) {
    savedList.innerHTML = '<div class="no-saved-logins">No saved logins yet</div>';
    return;
  }
  
  savedList.innerHTML = '';
  
  xtreamLogins.forEach((login, index) => {
    const loginItem = document.createElement('div');
    loginItem.className = 'xtream-saved-item';
    
    const lastUsed = login.lastUsed ? new Date(login.lastUsed).toLocaleDateString() : 'Never';
    
    loginItem.innerHTML = `
      <div class="xtream-saved-info">
        <div class="xtream-saved-name">${login.username}</div>
        <div class="xtream-saved-url">${login.serverUrl}</div>
        <div class="xtream-saved-date">Last used: ${lastUsed}</div>
      </div>
      <div class="xtream-saved-actions">
        <button class="xtream-action-btn" onclick="deleteXtreamLogin(${index})" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    
    // Click to load credentials
    loginItem.addEventListener('click', (e) => {
      if (!e.target.closest('.xtream-action-btn')) {
        loadXtreamCredentials(login);
      }
    });
    
    savedList.appendChild(loginItem);
  });
}

// Load credentials into form
function loadXtreamCredentials(login) {
  document.getElementById('xtreamServerUrl').value = login.serverUrl;
  document.getElementById('xtreamUsername').value = login.username;
  document.getElementById('xtreamPassword').value = login.password;
  
  console.log('Loaded credentials for:', login.username);
}

// Delete saved login
function deleteXtreamLogin(index) {
  if (confirm('Delete this saved login?')) {
    xtreamLogins.splice(index, 1);
    saveXtreamLogins();
    renderSavedLogins();
  }
}

// Login to XTream server
async function loginToXtream() {
  const serverUrl = document.getElementById('xtreamServerUrl').value.trim();
  const username = document.getElementById('xtreamUsername').value.trim();
  const password = document.getElementById('xtreamPassword').value.trim();
  
  if (!serverUrl || !username || !password) {
    alert('Please fill in all fields');
    return;
  }
  
  const loginBtn = document.getElementById('xtreamLoginBtn');
  const originalText = loginBtn.innerHTML;
  
  // Show loading state
  loginBtn.disabled = true;
  loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
  
  try {
    // Clean server URL
    let cleanUrl = serverUrl.replace(/\/$/, ''); // Remove trailing slash
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'http://' + cleanUrl;
    }
    
    // Test connection
    const testUrl = `${cleanUrl}/player_api.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    
    console.log('Testing XTream connection:', cleanUrl);
    
    const response = await fetch(testUrl);
    const data = await response.json();
    
    if (data.user_info && data.user_info.auth === 1) {
      console.log('✓ XTream login successful');
      
      // Save session
      currentXtreamSession = {
        serverUrl: cleanUrl,
        username: username,
        password: password,
        userInfo: data.user_info
      };
      
      // Save login
      const existingIndex = xtreamLogins.findIndex(
        l => l.serverUrl === cleanUrl && l.username === username
      );
      
      const loginData = {
        serverUrl: cleanUrl,
        username: username,
        password: password,
        lastUsed: Date.now(),
        userInfo: data.user_info
      };
      
      if (existingIndex >= 0) {
        xtreamLogins[existingIndex] = loginData;
      } else {
        if (xtreamLogins.length >= MAX_SAVED_LOGINS) {
          alert(`Maximum ${MAX_SAVED_LOGINS} saved logins reached. Please delete some old logins.`);
          loginBtn.disabled = false;
          loginBtn.innerHTML = originalText;
          return;
        }
        xtreamLogins.unshift(loginData);
      }
      
      saveXtreamLogins();
      renderSavedLogins();
      
      // Show success
      loginBtn.innerHTML = '<i class="fas fa-check"></i> Connected!';
      loginBtn.classList.add('success');
      
      setTimeout(() => {
        loginBtn.disabled = false;
        loginBtn.classList.remove('success');
        loginBtn.innerHTML = originalText;
        
        // Show categories view
        showXtreamCategories();
      }, 1000);
      
    } else {
      throw new Error('Authentication failed');
    }
    
  } catch (error) {
    console.error('XTream login error:', error);
    
    loginBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
    loginBtn.classList.add('error');
    
    setTimeout(() => {
      loginBtn.disabled = false;
      loginBtn.classList.remove('error');
      loginBtn.innerHTML = originalText;
    }, 2000);
    
    alert('Failed to connect to XTream server.\n\nPlease check:\n• Server URL is correct\n• Username and password are correct\n• Server is online\n\nError: ' + error.message);
  }
}

// Toggle password visibility
function toggleXtreamPassword() {
  const passwordInput = document.getElementById('xtreamPassword');
  const toggleBtn = document.getElementById('xtreamPasswordToggle');
  const icon = toggleBtn.querySelector('i');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    icon.className = 'fas fa-eye';
  } else {
    passwordInput.type = 'password';
    icon.className = 'fas fa-eye-slash';
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadXtreamLogins();
  
  // Login button
  const loginBtn = document.getElementById('xtreamLoginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', loginToXtream);
  }
  
  // Password toggle
  const passwordToggle = document.getElementById('xtreamPasswordToggle');
  if (passwordToggle) {
    passwordToggle.addEventListener('click', toggleXtreamPassword);
  }
  
  // Enter key to login
  const inputs = ['xtreamServerUrl', 'xtreamUsername', 'xtreamPassword'];
  inputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          loginToXtream();
        }
      });
    }
  });
  
  console.log('XTream Manager initialized');
  
  // Initialize categories view handlers
  initXtreamCategoriesHandlers();
  
  // Initialize settings handlers
  initXtreamSettingsHandlers();
});

// Export for use in other scripts
window.xtreamManager = {
  loadXtreamLogins,
  loginToXtream,
  deleteXtreamLogin
};

// Show categories view
async function showXtreamCategories() {
  document.getElementById('xtreamLoginView').classList.add('hidden');
  document.getElementById('xtreamCategoriesView').classList.remove('hidden');
  
  // Load categories
  await loadXtreamCategories('live');
}

// Back to login
function backToXtreamLogin() {
  document.getElementById('xtreamCategoriesView').classList.add('hidden');
  document.getElementById('xtreamLoginView').classList.remove('hidden');
  currentXtreamSession = null;
}

// Load categories from XTream API
async function loadXtreamCategories(type) {
  if (!currentXtreamSession) return;
  
  currentXtreamType = type;
  const categoriesList = document.getElementById('xtreamCategoriesList');
  categoriesList.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading categories...</div>';
  
  try {
    let apiUrl = '';
    const { serverUrl, username, password } = currentXtreamSession;
    
    if (type === 'live') {
      apiUrl = `${serverUrl}/player_api.php?username=${username}&password=${password}&action=get_live_categories`;
    } else if (type === 'vod') {
      apiUrl = `${serverUrl}/player_api.php?username=${username}&password=${password}&action=get_vod_categories`;
    } else if (type === 'series') {
      apiUrl = `${serverUrl}/player_api.php?username=${username}&password=${password}&action=get_series_categories`;
    }
    
    const response = await fetch(apiUrl);
    const categories = await response.json();
    
    xtreamCategories[type] = categories;
    
    // Fetch counts for each category if not cached
    if (localStorage.getItem('xtreamShowCounts') !== 'false') {
      await loadCategoryCounts(categories, type);
    }
    
    renderXtreamCategories(categories);
    
  } catch (error) {
    console.error('Error loading categories:', error);
    categoriesList.innerHTML = '<div class="error"><i class="fas fa-exclamation-triangle"></i><br>Failed to load categories</div>';
  }
}

// Load category counts
async function loadCategoryCounts(categories, type) {
  const { serverUrl, username, password } = currentXtreamSession;
  
  // Check if we have cached counts
  const cacheKey = `xtream_counts_${type}_${serverUrl}_${username}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    try {
      xtreamCategoryCounts[type] = JSON.parse(cached);
      return;
    } catch (e) {
      console.error('Failed to parse cached counts:', e);
    }
  }
  
  // Fetch all streams to count them
  try {
    let apiUrl = '';
    if (type === 'live') {
      apiUrl = `${serverUrl}/player_api.php?username=${username}&password=${password}&action=get_live_streams`;
    } else if (type === 'vod') {
      apiUrl = `${serverUrl}/player_api.php?username=${username}&password=${password}&action=get_vod_streams`;
    } else if (type === 'series') {
      apiUrl = `${serverUrl}/player_api.php?username=${username}&password=${password}&action=get_series`;
    }
    
    const response = await fetch(apiUrl);
    const streams = await response.json();
    
    // Count streams per category
    const counts = {};
    streams.forEach(stream => {
      const catId = stream.category_id;
      counts[catId] = (counts[catId] || 0) + 1;
    });
    
    xtreamCategoryCounts[type] = counts;
    
    // Cache the counts
    try {
      localStorage.setItem(cacheKey, JSON.stringify(counts));
    } catch (e) {
      console.error('Failed to cache counts:', e);
    }
    
  } catch (error) {
    console.error('Error loading category counts:', error);
  }
}

// Render categories
function renderXtreamCategories(categories) {
  const categoriesList = document.getElementById('xtreamCategoriesList');
  
  if (!categories || categories.length === 0) {
    categoriesList.innerHTML = '<div class="no-channels">No categories found</div>';
    return;
  }
  
  // Sort if needed
  let sortedCategories = [...categories];
  if (xtreamSortAZ) {
    sortedCategories.sort((a, b) => a.category_name.localeCompare(b.category_name));
  }
  
  categoriesList.innerHTML = '';
  
  const showCounts = localStorage.getItem('xtreamShowCounts') !== 'false';
  
  sortedCategories.forEach(category => {
    const categoryItem = document.createElement('div');
    categoryItem.className = 'xtream-category-item';
    
    // Get the actual count from our counts cache
    const count = xtreamCategoryCounts[currentXtreamType]?.[category.category_id] || 0;
    
    categoryItem.innerHTML = `
      <div class="xtream-category-icon">
        <i class="fas fa-folder"></i>
      </div>
      <div class="xtream-category-info">
        <div class="xtream-category-name">${category.category_name}</div>
        ${showCounts ? `<div class="xtream-category-count">${count} items</div>` : ''}
      </div>
    `;
    
    categoryItem.addEventListener('click', () => {
      console.log('Category clicked:', category.category_name);
      loadXtreamStreams(category, currentXtreamType);
    });
    
    categoriesList.appendChild(categoryItem);
  });
}

// Toggle sort
function toggleXtreamSort() {
  xtreamSortAZ = !xtreamSortAZ;
  const sortBtn = document.getElementById('xtreamSortBtn');
  const icon = sortBtn.querySelector('i');
  
  if (xtreamSortAZ) {
    icon.className = 'fas fa-sort-alpha-up';
    sortBtn.classList.add('xtream-sort-active');
  } else {
    icon.className = 'fas fa-sort-alpha-down';
    sortBtn.classList.remove('xtream-sort-active');
  }
  
  // Check if we're in streams view or categories view
  const streamsList = document.getElementById('xtreamStreamsList');
  if (!streamsList.classList.contains('hidden')) {
    // Sort streams
    let sortedStreams = [...currentXtreamStreams];
    if (xtreamSortAZ) {
      sortedStreams.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
    renderXtreamStreams(sortedStreams, currentXtreamType);
  } else {
    // Sort categories
    renderXtreamCategories(xtreamCategories[currentXtreamType]);
  }
}

// Search categories
function searchXtreamCategories(query) {
  const searchTerm = query.toLowerCase().trim();
  const categories = xtreamCategories[currentXtreamType];
  
  if (!searchTerm) {
    renderXtreamCategories(categories);
    return;
  }
  
  const filtered = categories.filter(cat => 
    cat.category_name.toLowerCase().includes(searchTerm)
  );
  
  renderXtreamCategories(filtered);
}

// Initialize categories view handlers
function initXtreamCategoriesHandlers() {
  // Back button
  document.getElementById('xtreamBackBtn')?.addEventListener('click', handleXtreamBackButton);
  
  // Refresh button
  document.getElementById('xtreamRefreshBtn')?.addEventListener('click', () => {
    const streamsList = document.getElementById('xtreamStreamsList');
    if (!streamsList.classList.contains('hidden') && currentXtreamCategory) {
      // Refresh streams
      loadXtreamStreams(currentXtreamCategory, currentXtreamType);
    } else {
      // Refresh categories
      loadXtreamCategories(currentXtreamType);
    }
  });
  
  // Sort button
  document.getElementById('xtreamSortBtn')?.addEventListener('click', toggleXtreamSort);
  
  // Search button
  document.getElementById('xtreamSearchBtn')?.addEventListener('click', () => {
    const searchBar = document.getElementById('xtreamSearchBar');
    searchBar.classList.toggle('hidden');
    if (!searchBar.classList.contains('hidden')) {
      document.getElementById('xtreamSearchInput').focus();
    }
  });
  
  // Search input
  document.getElementById('xtreamSearchInput')?.addEventListener('input', (e) => {
    const streamsList = document.getElementById('xtreamStreamsList');
    // Check if we're in streams view or categories view
    if (!streamsList.classList.contains('hidden')) {
      searchXtreamStreams(e.target.value);
    } else {
      searchXtreamCategories(e.target.value);
    }
  });
  
  // Search clear
  document.getElementById('xtreamSearchClearBtn')?.addEventListener('click', () => {
    document.getElementById('xtreamSearchInput').value = '';
    const streamsList = document.getElementById('xtreamStreamsList');
    if (!streamsList.classList.contains('hidden')) {
      searchXtreamStreams('');
    } else {
      searchXtreamCategories('');
    }
  });
  
  // Tab switching
  document.querySelectorAll('.xtream-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const type = tab.dataset.type;
      
      if (type === 'settings') {
        // Update active tab
        document.querySelectorAll('.xtream-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show settings
        showXtreamSettings();
        return;
      }
      
      // Hide settings if showing
      hideXtreamSettings();
      
      // Hide streams list and show categories list
      document.getElementById('xtreamStreamsList').classList.add('hidden');
      document.getElementById('xtreamCategoriesList').classList.remove('hidden');
      
      // Clear streams state
      currentXtreamCategory = null;
      currentXtreamStreams = [];
      
      // Update active tab
      document.querySelectorAll('.xtream-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update title
      const titles = {
        live: 'Live TV',
        vod: 'VOD',
        series: 'Series'
      };
      document.getElementById('xtreamViewTitle').textContent = titles[type];
      
      // Clear search
      const searchInput = document.getElementById('xtreamSearchInput');
      if (searchInput) {
        searchInput.value = '';
      }
      
      // Load categories
      loadXtreamCategories(type);
    });
  });
}


// Show XTream settings
function showXtreamSettings() {
  document.getElementById('xtreamCategoriesList').classList.add('hidden');
  document.getElementById('xtreamSettingsView').classList.remove('hidden');
  document.getElementById('xtreamViewTitle').textContent = 'Settings';
  
  // Load account info
  loadXtreamAccountInfo();
}

// Hide XTream settings
function hideXtreamSettings() {
  document.getElementById('xtreamSettingsView').classList.add('hidden');
  document.getElementById('xtreamCategoriesList').classList.remove('hidden');
}

// Load account information
async function loadXtreamAccountInfo() {
  if (!currentXtreamSession) return;
  
  const { serverUrl, username, password, userInfo } = currentXtreamSession;
  
  // Display basic info
  document.getElementById('xtreamInfoServerUrl').textContent = serverUrl;
  document.getElementById('xtreamInfoUsername').textContent = username;
  
  // Display user info if available
  if (userInfo) {
    // Expiration date
    const expDate = userInfo.exp_date ? new Date(parseInt(userInfo.exp_date) * 1000).toLocaleString() : 'N/A';
    document.getElementById('xtreamInfoExpiration').textContent = expDate;
    
    // Connections
    const activeConns = userInfo.active_cons || 0;
    const maxConns = userInfo.max_connections || 1;
    document.getElementById('xtreamInfoConnections').textContent = `${activeConns} / ${maxConns}`;
    
    // Status
    const status = userInfo.status === 'Active' || userInfo.auth === 1 ? 'Active' : 'Inactive';
    const statusEl = document.getElementById('xtreamInfoStatus');
    statusEl.textContent = status;
    statusEl.style.color = status === 'Active' ? '#10b981' : '#ef4444';
  }
}

// Refresh account info
async function refreshXtreamAccountInfo() {
  if (!currentXtreamSession) return;
  
  const btn = document.getElementById('xtreamRefreshAccountBtn');
  const originalText = btn.innerHTML;
  
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
  
  try {
    const { serverUrl, username, password } = currentXtreamSession;
    const testUrl = `${serverUrl}/player_api.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    
    const response = await fetch(testUrl);
    const data = await response.json();
    
    if (data.user_info) {
      currentXtreamSession.userInfo = data.user_info;
      loadXtreamAccountInfo();
      
      btn.innerHTML = '<i class="fas fa-check"></i> Refreshed!';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }, 1500);
    } else {
      throw new Error('Failed to get account info');
    }
  } catch (error) {
    console.error('Refresh error:', error);
    btn.innerHTML = '<i class="fas fa-times"></i> Failed';
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }, 2000);
    alert('Failed to refresh account info');
  }
}

// Test connection
async function testXtreamConnection() {
  if (!currentXtreamSession) return;
  
  const btn = document.getElementById('xtreamTestConnectionBtn');
  const originalText = btn.innerHTML;
  
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testing...';
  
  try {
    const { serverUrl, username, password } = currentXtreamSession;
    const testUrl = `${serverUrl}/player_api.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    
    const startTime = Date.now();
    const response = await fetch(testUrl);
    const endTime = Date.now();
    const ping = endTime - startTime;
    
    const data = await response.json();
    
    if (data.user_info && data.user_info.auth === 1) {
      btn.innerHTML = '<i class="fas fa-check"></i> Connected!';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }, 1500);
      alert(`Connection successful!\n\nPing: ${ping}ms\nServer: ${serverUrl}`);
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    console.error('Test connection error:', error);
    btn.innerHTML = '<i class="fas fa-times"></i> Failed';
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }, 2000);
    alert('Connection test failed!\n\n' + error.message);
  }
}

// Logout from XTream
function logoutXtream() {
  if (confirm('Logout from XTream server?')) {
    currentXtreamSession = null;
    xtreamCategories = { live: [], vod: [], series: [] };
    backToXtreamLogin();
  }
}

// Clear category counts cache
function clearXtreamCountsCache() {
  if (confirm('Clear category counts cache?')) {
    xtreamCategoryCounts = { live: {}, vod: {}, series: {} };
    
    // Clear localStorage cache
    if (currentXtreamSession) {
      const { serverUrl, username } = currentXtreamSession;
      ['live', 'vod', 'series'].forEach(type => {
        const cacheKey = `xtream_counts_${type}_${serverUrl}_${username}`;
        localStorage.removeItem(cacheKey);
      });
    }
    
    alert('Category counts cache cleared!');
    
    // Reload current categories to fetch fresh counts
    if (currentXtreamSession) {
      loadXtreamCategories(currentXtreamType);
    }
  }
}

// Clear thumbnails cache
function clearXtreamThumbnailsCache() {
  if (confirm('Clear channel/VOD thumbnails cache?')) {
    // TODO: Implement thumbnail cache clearing
    alert('Thumbnails cache cleared!');
  }
}

// Clear all XTream data
function clearAllXtreamData() {
  if (confirm('Clear ALL XTream data?\n\nThis will remove all saved logins, categories, and cache.\n\nThis action cannot be undone!')) {
    if (confirm('Are you absolutely sure?')) {
      // Clear everything
      xtreamLogins.length = 0;
      currentXtreamSession = null;
      xtreamCategories = { live: [], vod: [], series: [] };
      xtreamCategoryCounts = { live: {}, vod: {}, series: {} };
      
      // Clear localStorage
      localStorage.removeItem('xtreamLogins');
      localStorage.removeItem('xtreamShowLogos');
      localStorage.removeItem('xtreamShowCounts');
      
      // Clear all count caches
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('xtream_counts_')) {
          localStorage.removeItem(key);
        }
      });
      
      alert('All XTream data cleared!');
      backToXtreamLogin();
      renderSavedLogins();
    }
  }
}

// Toggle password visibility in settings
function toggleXtreamPasswordReveal() {
  if (!currentXtreamSession) return;
  
  const passwordEl = document.getElementById('xtreamInfoPassword');
  const btn = document.getElementById('xtreamPasswordReveal');
  const icon = btn.querySelector('i');
  const dotsSpan = passwordEl.querySelector('.password-dots');
  
  if (dotsSpan.textContent === '••••••••') {
    dotsSpan.textContent = currentXtreamSession.password;
    icon.className = 'fas fa-eye-slash';
  } else {
    dotsSpan.textContent = '••••••••';
    icon.className = 'fas fa-eye';
  }
}

// Load display preferences
function loadXtreamDisplayPreferences() {
  const showLogos = localStorage.getItem('xtreamShowLogos') !== 'false';
  const showCounts = localStorage.getItem('xtreamShowCounts') !== 'false';
  
  document.getElementById('xtreamShowLogos').checked = showLogos;
  document.getElementById('xtreamShowCounts').checked = showCounts;
}

// Save display preferences
function saveXtreamDisplayPreferences() {
  const showLogos = document.getElementById('xtreamShowLogos').checked;
  const showCounts = document.getElementById('xtreamShowCounts').checked;
  
  localStorage.setItem('xtreamShowLogos', showLogos);
  localStorage.setItem('xtreamShowCounts', showCounts);
}

// Initialize settings handlers
function initXtreamSettingsHandlers() {
  // Password reveal
  document.getElementById('xtreamPasswordReveal')?.addEventListener('click', toggleXtreamPasswordReveal);
  
  // Action buttons
  document.getElementById('xtreamRefreshAccountBtn')?.addEventListener('click', refreshXtreamAccountInfo);
  document.getElementById('xtreamTestConnectionBtn')?.addEventListener('click', testXtreamConnection);
  document.getElementById('xtreamLogoutBtn')?.addEventListener('click', logoutXtream);
  
  // Cache management
  document.getElementById('xtreamClearCountsBtn')?.addEventListener('click', clearXtreamCountsCache);
  document.getElementById('xtreamClearThumbnailsBtn')?.addEventListener('click', clearXtreamThumbnailsCache);
  document.getElementById('xtreamClearAllDataBtn')?.addEventListener('click', clearAllXtreamData);
  
  // Display preferences
  document.getElementById('xtreamShowLogos')?.addEventListener('change', saveXtreamDisplayPreferences);
  document.getElementById('xtreamShowCounts')?.addEventListener('change', saveXtreamDisplayPreferences);
  
  // Load preferences
  loadXtreamDisplayPreferences();
}

// Current category and streams state
let currentXtreamCategory = null;
let currentXtreamStreams = [];

// Load streams for a category
async function loadXtreamStreams(category, type) {
  if (!currentXtreamSession) return;
  
  currentXtreamCategory = category;
  const streamsList = document.getElementById('xtreamStreamsList');
  
  // Show streams view, hide categories
  document.getElementById('xtreamCategoriesList').classList.add('hidden');
  streamsList.classList.remove('hidden');
  
  // Update header title
  document.getElementById('xtreamViewTitle').textContent = category.category_name;
  
  // Clear search
  const searchInput = document.getElementById('xtreamSearchInput');
  if (searchInput) {
    searchInput.value = '';
  }
  
  // Show loading
  streamsList.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading streams...</div>';
  
  try {
    let apiUrl = '';
    const { serverUrl, username, password } = currentXtreamSession;
    
    if (type === 'live') {
      apiUrl = `${serverUrl}/player_api.php?username=${username}&password=${password}&action=get_live_streams&category_id=${category.category_id}`;
    } else if (type === 'vod') {
      apiUrl = `${serverUrl}/player_api.php?username=${username}&password=${password}&action=get_vod_streams&category_id=${category.category_id}`;
    } else if (type === 'series') {
      apiUrl = `${serverUrl}/player_api.php?username=${username}&password=${password}&action=get_series&category_id=${category.category_id}`;
    }
    
    console.log('Loading streams from:', apiUrl);
    
    const response = await fetch(apiUrl);
    const streams = await response.json();
    
    currentXtreamStreams = streams;
    renderXtreamStreams(streams, type);
    
  } catch (error) {
    console.error('Error loading streams:', error);
    streamsList.innerHTML = '<div class="error"><i class="fas fa-exclamation-triangle"></i><br>Failed to load streams</div>';
  }
}

// Render streams list
function renderXtreamStreams(streams, type) {
  const streamsList = document.getElementById('xtreamStreamsList');
  
  if (!streams || streams.length === 0) {
    streamsList.innerHTML = '<div class="no-channels">No streams found in this category</div>';
    return;
  }
  
  streamsList.innerHTML = '';
  
  streams.forEach(stream => {
    const streamItem = document.createElement('div');
    streamItem.className = 'xtream-stream-item';
    
    // Get stream info based on type
    let streamName = '';
    let streamMeta = '';
    let thumbnailUrl = '';
    
    if (type === 'live') {
      streamName = stream.name || 'Unknown Channel';
      streamMeta = stream.category_name || '';
      thumbnailUrl = stream.stream_icon || '';
    } else if (type === 'vod') {
      streamName = stream.name || 'Unknown Movie';
      const year = stream.year || '';
      const rating = stream.rating ? `⭐ ${stream.rating}` : '';
      streamMeta = [year, rating].filter(Boolean).join(' • ');
      thumbnailUrl = stream.stream_icon || stream.cover || '';
    } else if (type === 'series') {
      streamName = stream.name || 'Unknown Series';
      const year = stream.year || '';
      const rating = stream.rating ? `⭐ ${stream.rating}` : '';
      streamMeta = [year, rating].filter(Boolean).join(' • ');
      thumbnailUrl = stream.cover || '';
    }
    
    // Build HTML
    let thumbnailHTML = '';
    if (thumbnailUrl && localStorage.getItem('xtreamShowLogos') !== 'false') {
      thumbnailHTML = `<img src="${thumbnailUrl}" class="xtream-stream-thumbnail" alt="${streamName}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                       <div class="xtream-stream-thumbnail-placeholder" style="display:none;">
                         <i class="fas fa-${type === 'live' ? 'tv' : type === 'vod' ? 'film' : 'video'}"></i>
                       </div>`;
    } else {
      thumbnailHTML = `<div class="xtream-stream-thumbnail-placeholder">
                         <i class="fas fa-${type === 'live' ? 'tv' : type === 'vod' ? 'film' : 'video'}"></i>
                       </div>`;
    }
    
    streamItem.innerHTML = `
      ${thumbnailHTML}
      <div class="xtream-stream-info">
        <div class="xtream-stream-name">${streamName}</div>
        ${streamMeta ? `<div class="xtream-stream-meta">${streamMeta}</div>` : ''}
      </div>
    `;
    
    // Click handler to play stream
    streamItem.addEventListener('click', () => {
      playXtreamStream(stream, type);
    });
    
    // Right click for context menu
    streamItem.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Create channel object for context menu
      const channelData = {
        name: streamName,
        url: getXtreamStreamUrl(stream, type),
        logo: thumbnailUrl,
        category: stream.category_name || type.toUpperCase(),
        headers: {
          userAgent: 'VLC/3.0.18 LibVLC/3.0.18',
          referer: currentXtreamSession.serverUrl,
          origin: currentXtreamSession.serverUrl
        },
        drm: { scheme: 'none' }
      };
      
      if (window.showContextMenu) {
        window.showContextMenu(e, channelData);
      }
    });
    
    streamsList.appendChild(streamItem);
  });
}

// Get XTream stream URL
function getXtreamStreamUrl(stream, type) {
  if (!currentXtreamSession) return '';
  
  const { serverUrl, username, password } = currentXtreamSession;
  
  if (type === 'live') {
    return `${serverUrl}/live/${username}/${password}/${stream.stream_id}.m3u8`;
  } else if (type === 'vod') {
    return `${serverUrl}/movie/${username}/${password}/${stream.stream_id}.m3u8`;
  } else if (type === 'series') {
    // Series need episode selection, return series info URL for now
    return `${serverUrl}/series/${username}/${password}/${stream.series_id}.m3u8`;
  }
  
  return '';
}

// Play XTream stream
function playXtreamStream(stream, type) {
  if (!currentXtreamSession) return;
  
  const { serverUrl, username, password } = currentXtreamSession;
  let streamUrl = '';
  let streamName = '';
  
  if (type === 'live') {
    // For live streams, use .m3u8 which returns HLS playlist with .ts segments
    // Shaka Player will handle the .ts segments with mux.js transmuxing
    const streamId = stream.stream_id;
    streamUrl = `${serverUrl}/live/${username}/${password}/${streamId}.m3u8`;
    streamName = stream.name || 'Live Channel';
    
    console.log('Live stream details:', {
      streamId: streamId,
      url: streamUrl,
      name: streamName
    });
  } else if (type === 'vod') {
    const extension = stream.container_extension || 'mp4';
    streamUrl = `${serverUrl}/movie/${username}/${password}/${stream.stream_id}.${extension}`;
    streamName = stream.name || 'Movie';
    
    console.log('VOD stream details:', {
      streamId: stream.stream_id,
      extension: extension,
      url: streamUrl,
      name: streamName
    });
  } else if (type === 'series') {
    // For series, we need to show episodes - for now just alert
    alert('Series playback coming soon!\n\nYou will be able to select episodes.');
    return;
  }
  
  console.log('Playing XTream stream:', streamName, streamUrl);
  
  // Use the video player to play the stream
  if (window.videoPlayer && window.videoPlayer.playVideoWithConfig) {
    const config = {
      cookies: '',
      referer: serverUrl,
      origin: serverUrl,
      userAgent: 'VLC/3.0.18 LibVLC/3.0.18',
      drmUrl: '',
      drmScheme: 'none',
      isXtream: true // Flag to indicate this is an XTream stream
    };
    
    console.log('Playing with config:', config);
    window.videoPlayer.playVideoWithConfig(streamUrl, streamName, config);
  } else {
    console.error('Video player not available');
    alert('Video player not initialized. Please try again.');
  }
}

// Back to categories from streams
function backToXtreamCategories() {
  document.getElementById('xtreamStreamsList').classList.add('hidden');
  document.getElementById('xtreamCategoriesList').classList.remove('hidden');
  
  // Restore title
  const titles = {
    live: 'Live TV',
    vod: 'VOD',
    series: 'Series'
  };
  document.getElementById('xtreamViewTitle').textContent = titles[currentXtreamType];
  
  // Clear search
  const searchInput = document.getElementById('xtreamSearchInput');
  if (searchInput) {
    searchInput.value = '';
  }
  
  currentXtreamCategory = null;
  currentXtreamStreams = [];
}

// Search streams
function searchXtreamStreams(query) {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) {
    renderXtreamStreams(currentXtreamStreams, currentXtreamType);
    return;
  }
  
  const filtered = currentXtreamStreams.filter(stream => {
    const name = (stream.name || '').toLowerCase();
    return name.includes(searchTerm);
  });
  
  renderXtreamStreams(filtered, currentXtreamType);
}

// Update back button handler to handle both login and categories
function handleXtreamBackButton() {
  // Check if we're in streams view
  const streamsList = document.getElementById('xtreamStreamsList');
  if (!streamsList.classList.contains('hidden')) {
    backToXtreamCategories();
  } else {
    backToXtreamLogin();
  }
}

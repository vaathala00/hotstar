// Navigation handling
const navItems = document.querySelectorAll('.nav-item');
const viewSidebars = document.querySelectorAll('.view-sidebar');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const viewName = item.getAttribute('data-view');
    
    // Update active nav item
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    
    // Show corresponding sidebar
    viewSidebars.forEach(sidebar => {
      if (sidebar.id === `${viewName}-sidebar`) {
        sidebar.classList.remove('hidden');
        sidebar.classList.add('active');
      } else {
        sidebar.classList.remove('hidden', 'active');
        sidebar.classList.add('hidden');
      }
    });
    
    // Trigger view-specific actions
    if (viewName === 'wishlist' && window.wishlistManager) {
      // Render wishlist when switching to wishlist tab
      window.wishlistManager.renderWishlist();
    }
  });
});

// Search toggle
const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const searchClearBtn = document.getElementById('searchClearBtn');

if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    const isHidden = searchBar.classList.contains('hidden');
    
    if (isHidden) {
      // Show search bar
      searchBar.classList.remove('hidden');
      searchInput.focus();
    } else {
      // Hide search bar and clear search
      searchBar.classList.add('hidden');
      searchInput.value = '';
      if (window.mediaLibrary) {
        window.mediaLibrary.searchVideos('');
      }
    }
  });
}

// Clear search button
if (searchClearBtn) {
  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    if (window.mediaLibrary) {
      window.mediaLibrary.searchVideos('');
    }
  });
}

// Search functionality
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    if (window.mediaLibrary) {
      window.mediaLibrary.searchVideos(e.target.value);
    }
  });
}

// View toggle (list/grid)
const viewToggle = document.getElementById('viewToggle');
const videoList = document.getElementById('videoList');

if (viewToggle) {
  viewToggle.addEventListener('click', () => {
    videoList.classList.toggle('grid-view');
    const icon = viewToggle.querySelector('i');
    if (videoList.classList.contains('grid-view')) {
      icon.className = 'fas fa-list';
    } else {
      icon.className = 'fas fa-th';
    }
  });
}

// Filter tabs
document.querySelectorAll('.filter-tab').forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Filter videos
    const filters = ['all', 'videos', 'music'];
    if (window.mediaLibrary) {
      window.mediaLibrary.filterVideos(filters[index]);
    }
  });
});


// Wishlist search toggle
const wishlistSearchBtn = document.getElementById('wishlistSearchBtn');
const wishlistSearchBar = document.getElementById('wishlistSearchBar');
const wishlistSearchClearBtn = document.getElementById('wishlistSearchClearBtn');
const wishlistSearchInput = document.getElementById('wishlistSearchInput');

if (wishlistSearchBtn) {
  wishlistSearchBtn.addEventListener('click', () => {
    const isHidden = wishlistSearchBar.classList.contains('hidden');
    
    if (isHidden) {
      wishlistSearchBar.classList.remove('hidden');
      wishlistSearchInput.focus();
    } else {
      wishlistSearchBar.classList.add('hidden');
      wishlistSearchInput.value = '';
      if (window.wishlistManager) {
        window.wishlistManager.searchWishlist('');
      }
    }
  });
}

if (wishlistSearchClearBtn) {
  wishlistSearchClearBtn.addEventListener('click', () => {
    wishlistSearchInput.value = '';
    if (window.wishlistManager) {
      window.wishlistManager.searchWishlist('');
    }
    wishlistSearchInput.focus();
  });
}

// Telegram group button
const telegramGroupBtn = document.getElementById('telegramGroupBtn');
if (telegramGroupBtn) {
  telegramGroupBtn.addEventListener('click', () => {
    // Open Telegram group in default browser
    if (window.electronAPI && window.electronAPI.openExternal) {
      window.electronAPI.openExternal('https://t.me/chatstadium');
    } else {
      // Fallback for web version
      window.open('https://t.me/chatstadium', '_blank');
    }
  });
}

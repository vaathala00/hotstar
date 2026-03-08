// IPTV Manager - Ruby Player
const iptvPlaylists = [];
let iptvCurrentPlaylist = null;
let iptvChannels = [];
let selectedPlaylistIndex = -1;
let iptvFilteredChannels = [];
let iptvCategories = [];

// Load playlists from localStorage
function loadPlaylists() {
  try {
    const saved = localStorage.getItem('iptvPlaylists');
    console.log('Loading playlists from localStorage:', saved ? 'Found data' : 'No data');
    if (saved) {
      iptvPlaylists.length = 0;
      const parsed = JSON.parse(saved);
      console.log('Parsed playlists:', parsed.length, 'items');
      iptvPlaylists.push(...parsed);
    }
  } catch (error) {
    console.error('Error loading playlists:', error);
  }
  renderPlaylists();
}

// Save playlists
function savePlaylists() {
  try {
    localStorage.setItem('iptvPlaylists', JSON.stringify(iptvPlaylists));
  } catch (error) {
    console.error('Error saving playlists:', error);
  }
}

// Render playlist list
function renderPlaylists() {
  const playlistList = document.getElementById('playlistList');
  
  console.log('Rendering playlists:', iptvPlaylists.length, 'items');
  console.log('Playlist list element:', playlistList ? 'Found' : 'NOT FOUND');
  
  if (!playlistList) return;
  
  if (iptvPlaylists.length === 0) {
    playlistList.innerHTML = '<div class="no-playlists">No playlists available</div>';
    return;
  }
  
  playlistList.innerHTML = '';
  
  // Sort playlists - pinned first
  const sortedPlaylists = [...iptvPlaylists].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });
  
  sortedPlaylists.forEach((playlist) => {
    const index = iptvPlaylists.indexOf(playlist);
    const playlistItem = document.createElement('div');
    playlistItem.className = 'playlist-item';
    if (playlist.pinned) {
      playlistItem.classList.add('pinned');
    }
    
    playlistItem.innerHTML = `
      ${playlist.pinned ? '<div class="pin-indicator"><i class="fas fa-thumbtack"></i></div>' : ''}
      <div class="playlist-logo">
        <img src="${playlist.logo || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22%3E%3Crect fill=%22%23dc2626%22 width=%2280%22 height=%2280%22/%3E%3Ctext x=%2240%22 y=%2245%22 font-family=%22Arial%22 font-size=%2230%22 fill=%22%23fff%22 text-anchor=%22middle%22%3E${playlist.name.charAt(0).toUpperCase()}%3C/text%3E%3C/svg%3E'}" alt="${playlist.name}">
      </div>
      <div class="playlist-info">
        <div class="playlist-name">${playlist.name}</div>
        <div class="playlist-count">${playlist.channelCount || 0} channels</div>
      </div>
    `;
    
    // Left click to open
    playlistItem.addEventListener('click', () => {
      openPlaylist(playlist);
    });
    
    // Right click for context menu
    playlistItem.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      selectedPlaylistIndex = index;
      console.log('Right-clicked playlist:', playlist.name, 'at index:', index);
      console.log('Mouse position:', e.clientX, e.clientY);
      showPlaylistContextMenu(e.clientX, e.clientY, playlist);
    });
    
    playlistList.appendChild(playlistItem);
  });
}

// Open playlist
function openPlaylist(playlist) {
  iptvCurrentPlaylist = playlist;
  
  // Hide playlist view, show channel view
  document.getElementById('iptvPlaylistView').classList.add('hidden');
  document.getElementById('iptvChannelView').classList.remove('hidden');
  
  // Hide the main IPTV header (Ruby IPTV with buttons)
  document.getElementById('iptvLibraryHeader')?.classList.add('hidden');
  
  // Hide search bar when opening playlist
  const searchBar = document.getElementById('channelSearchBar');
  if (searchBar) {
    searchBar.classList.add('hidden');
  }
  
  // Clear search input
  const searchInput = document.getElementById('channelSearchInput');
  if (searchInput) {
    searchInput.value = '';
  }
  
  // Update header
  document.getElementById('currentPlaylistName').textContent = playlist.name;
  
  // Load channels
  loadChannels(playlist);
}

// Back to playlists
function backToPlaylists() {
  document.getElementById('iptvPlaylistView').classList.remove('hidden');
  document.getElementById('iptvChannelView').classList.add('hidden');
  
  // Show the main IPTV header again
  document.getElementById('iptvLibraryHeader')?.classList.remove('hidden');
  
  iptvCurrentPlaylist = null;
}

// Load channels from playlist
async function loadChannels(playlist) {
  const channelList = document.getElementById('channelList');
  channelList.innerHTML = '<div class="loading">Loading channels...</div>';
  
  try {
    // Check if playlist has pre-parsed channels
    if (playlist.channels && playlist.channels.length > 0) {
      console.log('Using pre-parsed channels from playlist:', playlist.channels.length);
      iptvChannels = playlist.channels;
      iptvFilteredChannels = iptvChannels;
    } else {
      // Fallback: Parse M3U playlist from URL
      console.log('Fetching playlist from URL:', playlist.url);
      
      let m3uContent = '';
      
      // Try to use Electron API for better header control
      if (window.electronAPI && window.electronAPI.fetchPlaylist) {
        console.log('✓ Using Electron API to fetch playlist (VLC User-Agent)...');
        const result = await window.electronAPI.fetchPlaylist(playlist.url);
        
        if (result.success) {
          m3uContent = result.content;
          console.log('✓ Playlist fetched successfully via Electron API');
        } else {
          throw new Error(result.error || 'Failed to fetch playlist');
        }
      } else {
        // Fallback to fetch API
        console.warn('⚠ Electron API not available, using fetch API');
        const response = await fetch(playlist.url);
        m3uContent = await response.text();
      }
      
      // Use advanced parser to extract headers and DRM
      iptvChannels = parseM3UAdvanced(m3uContent);
      iptvFilteredChannels = iptvChannels;
      
      // Update the playlist object with parsed channels
      playlist.channels = iptvChannels;
      playlist.channelCount = iptvChannels.length;
      savePlaylists();
    }
    
    console.log('Loaded channels:', iptvChannels.length);
    console.log('Sample channel:', iptvChannels[0]);
    
    // Extract categories
    iptvCategories = [...new Set(iptvChannels.map(ch => ch.category).filter(Boolean))];
    renderCategories();
    
    // Update count
    document.getElementById('channelCount').textContent = `${iptvChannels.length} channels`;
    
    renderChannels();
  } catch (error) {
    console.error('Error loading channels:', error);
    channelList.innerHTML = '<div class="error">Error loading channels</div>';
  }
}

// Refresh current channel list
async function refreshChannels() {
  if (!iptvCurrentPlaylist) {
    console.log('No playlist loaded to refresh');
    return;
  }
  
  console.log('Refreshing channels from:', iptvCurrentPlaylist.name);
  
  const channelList = document.getElementById('channelList');
  channelList.innerHTML = '<div class="loading">Refreshing channels...</div>';
  
  try {
    // Force re-fetch from URL with increased timeout
    console.log('Force fetching playlist from URL:', iptvCurrentPlaylist.url);
    
    let m3uContent = '';
    
    // Try to use Electron API for better header control
    if (window.electronAPI && window.electronAPI.fetchPlaylist) {
      console.log('✓ Using Electron API to fetch playlist (VLC User-Agent)...');
      
      // Show progress
      channelList.innerHTML = '<div class="loading">Downloading playlist... (this may take up to 60 seconds for large playlists)</div>';
      
      const result = await window.electronAPI.fetchPlaylist(iptvCurrentPlaylist.url);
      
      if (result.success) {
        m3uContent = result.content;
        console.log('✓ Playlist fetched successfully via Electron API');
      } else {
        throw new Error(result.error || 'Failed to fetch playlist');
      }
    } else {
      // Fallback to fetch API with increased timeout
      console.warn('⚠ Electron API not available, using fetch API');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds
      
      const response = await fetch(iptvCurrentPlaylist.url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'VLC/3.0.18 LibVLC/3.0.18',
          'Accept': '*/*'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      m3uContent = await response.text();
    }
    
    // Check if we got HTML instead of M3U
    if (m3uContent.trim().toLowerCase().startsWith('<html') || m3uContent.trim().toLowerCase().startsWith('<!doctype')) {
      throw new Error('Server returned HTML instead of M3U playlist. The URL may require authentication or the token may have expired.');
    }
    
    // Parse the fresh content
    channelList.innerHTML = '<div class="loading">Parsing channels... (this may take a moment for large playlists)</div>';
    
    let channels = [];
    
    // Try main process parsing first
    if (window.electronAPI && window.electronAPI.parseM3U) {
      console.log('✓ Using main process for parsing...');
      const result = await window.electronAPI.parseM3U(m3uContent);
      
      if (result.success) {
        channels = result.channels;
      } else {
        throw new Error(result.error || 'Failed to parse playlist');
      }
    } else {
      // Fallback to renderer parsing
      console.warn('⚠ Using renderer process for parsing (slower)');
      channels = parseM3UAdvanced(m3uContent);
    }
    
    iptvChannels = channels;
    iptvFilteredChannels = iptvChannels;
    
    // Update the stored playlist with fresh channels
    iptvCurrentPlaylist.channels = iptvChannels;
    iptvCurrentPlaylist.channelCount = iptvChannels.length;
    
    // Update in the playlists array
    const playlistIndex = iptvPlaylists.findIndex(p => p.name === iptvCurrentPlaylist.name);
    if (playlistIndex >= 0) {
      iptvPlaylists[playlistIndex].channels = iptvChannels;
      iptvPlaylists[playlistIndex].channelCount = iptvChannels.length;
      savePlaylists();
    }
    
    console.log('✓ Playlist refreshed:', iptvChannels.length, 'channels');
    
    // Extract categories
    iptvCategories = [...new Set(iptvChannels.map(ch => ch.category).filter(Boolean))];
    renderCategories();
    
    // Update count
    document.getElementById('channelCount').textContent = `${iptvChannels.length} channels`;
    
    renderChannels();
    
    // Show success notification
    alert(`Playlist refreshed successfully!\n\n${iptvChannels.length} channels loaded.`);
  } catch (error) {
    console.error('Error refreshing channels:', error);
    channelList.innerHTML = '<div class="error">Error refreshing channels</div>';
    
    let errorMsg = error.message;
    if (error.name === 'AbortError') {
      errorMsg = 'Request timed out after 60 seconds.\n\nThe playlist server is not responding or the playlist is too large.\n\nTry:\n1. Check your internet connection\n2. Try again later\n3. Contact your playlist provider';
    }
    
    alert(`Failed to refresh playlist:\n\n${errorMsg}\n\nThe token may have expired. Try re-adding the playlist with a fresh URL.`);
  }
}

// Parse M3U content
function parseM3U(content) {
  const lines = content.split('\n');
  const parsedChannels = [];
  let currentChannel = {};
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('#EXTINF:')) {
      // Parse channel info
      const nameMatch = line.match(/,(.+)$/);
      const logoMatch = line.match(/tvg-logo="([^"]+)"/);
      const groupMatch = line.match(/group-title="([^"]+)"/);
      
      currentChannel = {
        name: nameMatch ? nameMatch[1] : 'Unknown',
        logo: logoMatch ? logoMatch[1] : '',
        category: groupMatch ? groupMatch[1] : 'Uncategorized'
      };
    } else if (line && !line.startsWith('#') && currentChannel.name) {
      currentChannel.url = line;
      parsedChannels.push(currentChannel);
      currentChannel = {};
    }
  }
  
  return parsedChannels;
}

// Advanced M3U Parser with full support
function parseM3UAdvanced(content) {
  console.log('=== Parsing M3U ===');
  console.log('Content length:', content.length);
  console.log('First 200 chars:', content.substring(0, 200));
  
  // Pre-process content to handle tags without line breaks
  // Split concatenated tags like #KODIPROP:...#KODIPROP:...#EXTINF:...
  content = content.replace(/#KODIPROP:/g, '\n#KODIPROP:');
  content = content.replace(/#EXTVLCOPT:/g, '\n#EXTVLCOPT:');
  content = content.replace(/#EXTHTTP:/g, '\n#EXTHTTP:');
  content = content.replace(/#EXTINF:/g, '\n#EXTINF:');
  
  const lines = content.split('\n');
  console.log('Total lines after preprocessing:', lines.length);
  
  const parsedChannels = [];
  let currentChannel = {};
  let kodiProps = {};
  let vlcOpts = {};
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines and comments (except special tags)
    if (!line || (line.startsWith('#') && !line.startsWith('#EXTINF') && !line.startsWith('#KODIPROP') && !line.startsWith('#EXTVLCOPT') && !line.startsWith('#EXTHTTP'))) {
      continue;
    }
    
    // Parse #EXTINF tags
    if (line.startsWith('#EXTINF:')) {
      // Extract attributes first
      const logoMatch = line.match(/tvg-logo="([^"]+)"/);
      const groupMatch = line.match(/group-title="([^"]+)"/);
      const idMatch = line.match(/tvg-id="([^"]+)"/);
      
      // Match name after the last comma that's outside of quotes
      // This handles cases where logo URLs contain commas
      let nameMatch = null;
      let urlOnSameLine = null;
      
      const lastCommaIndex = line.lastIndexOf(',');
      if (lastCommaIndex !== -1) {
        const afterComma = line.substring(lastCommaIndex + 1).trim();
        
        // Check if URL is on the same line (starts with http)
        if (afterComma.startsWith('http://') || afterComma.startsWith('https://')) {
          // Extract name before the URL
          const urlStartIndex = afterComma.search(/https?:\/\//);
          if (urlStartIndex > 0) {
            nameMatch = [null, afterComma.substring(0, urlStartIndex).trim()];
            urlOnSameLine = afterComma.substring(urlStartIndex).trim();
          } else {
            // No name, just URL
            nameMatch = [null, 'Unknown'];
            urlOnSameLine = afterComma;
          }
        } else {
          // Normal case: just the name
          nameMatch = [null, afterComma];
        }
      }
      
      currentChannel = {
        name: nameMatch ? nameMatch[1].trim() : 'Unknown',
        logo: logoMatch ? logoMatch[1] : '',
        category: groupMatch ? groupMatch[1] : 'Uncategorized',
        id: idMatch ? idMatch[1] : '',
        headers: {},
        drm: {}
      };
      
      // Copy headers from vlcOpts if they exist
      if (Object.keys(vlcOpts).length > 0) {
        currentChannel.headers = {
          userAgent: vlcOpts.userAgent || '',
          referer: vlcOpts.referer || '',
          origin: vlcOpts.origin || ''
        };
        console.log('Applied headers to channel:', currentChannel.headers);
      }
      
      // Copy DRM properties from kodiProps if they exist
      if (Object.keys(kodiProps).length > 0) {
        currentChannel.drm = {
          scheme: kodiProps.scheme || 'none',
          keyId: kodiProps.keyId || '',
          key: kodiProps.key || '',
          licenseUrl: kodiProps.licenseUrl || ''
        };
        console.log('Applied DRM to channel:', currentChannel.drm);
      }
      
      // If URL is on the same line, process it immediately
      if (urlOnSameLine) {
        currentChannel.url = urlOnSameLine;
        
        // Auto-detect DRM from URL patterns if not already set
        if (!currentChannel.drm || Object.keys(currentChannel.drm).length === 0 || !currentChannel.drm.scheme) {
          // Check for keys.vodep39240327.workers.dev pattern (JioTV proxy)
          if (urlOnSameLine.includes('keys.vodep39240327.workers.dev/mpd/')) {
            const idMatch = urlOnSameLine.match(/\/mpd\/(\d+)/);
            if (idMatch) {
              const channelId = idMatch[1];
              currentChannel.drm = {
                scheme: 'clearkey',
                licenseUrl: `https://keys.vodep39240327.workers.dev/key/${channelId}`,
                keyId: '',
                key: ''
              };
              console.log('Auto-detected JioTV DRM for channel ID:', channelId);
            }
          }
        }
        
        parsedChannels.push(currentChannel);
        console.log('Added channel (same line):', currentChannel.name, 'URL:', urlOnSameLine.substring(0, 50) + '...', 'DRM:', currentChannel.drm.scheme || 'none');
        currentChannel = {};
        kodiProps = {};
        vlcOpts = {};
      }
    }
    // Parse #KODIPROP tags (DRM)
    else if (line.startsWith('#KODIPROP:')) {
      const propMatch = line.match(/#KODIPROP:(.+?)=(.+)/);
      if (propMatch) {
        const key = propMatch[1].trim();
        const value = propMatch[2].trim();
        
        if (key === 'inputstream.adaptive.license_type') {
          kodiProps.scheme = value.toLowerCase();
          console.log('Found DRM scheme:', value.toLowerCase());
        } else if (key === 'inputstream.adaptive.license_key') {
          // Check if it's a URL (license server) or key pair (keyid:key)
          if (value.startsWith('http://') || value.startsWith('https://')) {
            // It's a license URL
            kodiProps.licenseUrl = value;
            console.log('Found license URL:', value);
          } else {
            // Parse ClearKey format: keyid:key (hex format)
            const keyParts = value.split(':');
            if (keyParts.length === 2) {
              // Keys are already in hex format from KODIPROP
              kodiProps.keyId = keyParts[0].trim();
              kodiProps.key = keyParts[1].trim();
              console.log('Found ClearKey pair - KeyID:', keyParts[0].trim(), 'Key:', keyParts[1].trim());
            } else {
              console.warn('Invalid ClearKey format:', value);
            }
          }
        } else if (key === 'inputstream.adaptive.license_url') {
          // Direct license URL property
          kodiProps.licenseUrl = value;
          console.log('Found license URL (direct):', value);
        }
      }
    }
    // Parse #EXTVLCOPT tags (Headers)
    else if (line.startsWith('#EXTVLCOPT:')) {
      const optMatch = line.match(/#EXTVLCOPT:(.+?)=(.+)/);
      if (optMatch) {
        const key = optMatch[1].trim();
        const value = optMatch[2].trim();
        
        if (key === 'http-user-agent') {
          vlcOpts.userAgent = value;
        } else if (key === 'http-referrer') {
          vlcOpts.referer = value;
        } else if (key === 'http-origin') {
          vlcOpts.origin = value;
        }
      }
    }
    // Parse #EXTHTTP tags (JSON headers)
    else if (line.startsWith('#EXTHTTP:')) {
      try {
        const jsonMatch = line.match(/#EXTHTTP:(.+)/);
        if (jsonMatch) {
          console.log('Parsing EXTHTTP:', jsonMatch[1]);
          const headers = JSON.parse(jsonMatch[1]);
          console.log('Parsed headers:', headers);
          
          // Ensure currentChannel and headers exist
          if (!currentChannel.headers) {
            currentChannel.headers = {};
          }
          
          // Extract cookie from JSON (case-insensitive)
          if (headers.cookie) {
            currentChannel.headers.cookies = headers.cookie;
          } else if (headers.Cookie) {
            currentChannel.headers.cookies = headers.Cookie;
          }
          
          // Extract other headers (normalize to lowercase keys)
          Object.keys(headers).forEach(key => {
            const lowerKey = key.toLowerCase();
            console.log(`Processing header: ${key} (${lowerKey}) = ${headers[key]}`);
            if (lowerKey === 'cookie') {
              // Already handled above
              return;
            } else if (lowerKey === 'origin') {
              currentChannel.headers.origin = headers[key];
            } else if (lowerKey === 'referer' || lowerKey === 'referrer') {
              currentChannel.headers.referer = headers[key];
            } else if (lowerKey === 'user-agent') {
              currentChannel.headers.userAgent = headers[key];
            } else {
              // Store other headers as-is (skip metadata fields)
              if (lowerKey !== 'telegram' && lowerKey !== 'creator') {
                currentChannel.headers[key] = headers[key];
              }
            }
          });
          
          console.log('Channel headers after EXTHTTP:', currentChannel.headers);
        }
      } catch (e) {
        console.error('Failed to parse EXTHTTP:', line);
        console.error('Error:', e);
      }
    }
    // Parse URL line
    else if (line && !line.startsWith('#') && currentChannel.name) {
      let url = line;
      
      // Extract pipe-separated headers (url|User-Agent=...&Referer=...)
      if (url.includes('|')) {
        const parts = url.split('|');
        url = parts[0];
        
        if (parts[1]) {
          const headerPairs = parts[1].split('&');
          headerPairs.forEach(pair => {
            // Split only on the FIRST = to handle values with = signs
            const firstEqualIndex = pair.indexOf('=');
            if (firstEqualIndex === -1) return;
            
            const key = pair.substring(0, firstEqualIndex).trim();
            const value = pair.substring(firstEqualIndex + 1).trim();
            
            if (key === 'User-Agent') {
              currentChannel.headers.userAgent = value;
            } else if (key === 'Referer') {
              currentChannel.headers.referer = value;
            } else if (key === 'Origin') {
              currentChannel.headers.origin = value;
            } else if (key === 'Cookie') {
              currentChannel.headers.cookies = value;
            }
          });
        }
      }
      
      // Extract cookies from URL query parameters
      try {
        const urlObj = new URL(url);
        const cookieParams = ['__hdnea__', 'token', 'auth', 'key', 'session', 'hdntl'];
        const extractedCookies = [];
        
        cookieParams.forEach(param => {
          const value = urlObj.searchParams.get(param);
          if (value) {
            extractedCookies.push(`${param}=${value}`);
          }
        });
        
        if (extractedCookies.length > 0 && !currentChannel.headers.cookies) {
          currentChannel.headers.cookies = extractedCookies.join('; ');
        }
      } catch (e) {
        // URL parsing failed, continue anyway
      }
      
      currentChannel.url = url;
      
      // Auto-detect DRM from URL patterns if not already set
      if (!currentChannel.drm || Object.keys(currentChannel.drm).length === 0 || !currentChannel.drm.scheme) {
        // Check for keys.vodep39240327.workers.dev pattern (JioTV proxy)
        if (url.includes('keys.vodep39240327.workers.dev/mpd/')) {
          const idMatch = url.match(/\/mpd\/(\d+)/);
          if (idMatch) {
            const channelId = idMatch[1];
            currentChannel.drm = {
              scheme: 'clearkey',
              licenseUrl: `https://keys.vodep39240327.workers.dev/key/${channelId}`,
              keyId: '',
              key: ''
            };
            console.log('Auto-detected JioTV DRM for channel ID:', channelId);
          }
        }
      }
      
      parsedChannels.push(currentChannel);
      
      console.log('Added channel:', currentChannel.name, 'with', Object.keys(currentChannel.headers).length, 'headers', 'DRM:', currentChannel.drm?.scheme || 'none');
      
      // Reset for next channel
      currentChannel = {};
      kodiProps = {};
      vlcOpts = {};
    }
  }
  
  console.log('=== Parsing Complete ===');
  console.log('Total channels parsed:', parsedChannels.length);
  if (parsedChannels.length > 0) {
    console.log('Sample channel:', parsedChannels[0]);
  }
  
  return parsedChannels;
}

// Render categories
function renderCategories() {
  const categoryTabs = document.getElementById('categoryTabs');
  
  // Create dropdown selector for default category
  const dropdownContainer = document.createElement('div');
  dropdownContainer.className = 'category-dropdown-container';
  dropdownContainer.innerHTML = `
    <select class="category-dropdown" id="defaultCategorySelect">
      <option value="all">Default: All</option>
    </select>
  `;
  
  // Add categories to dropdown
  const dropdown = dropdownContainer.querySelector('.category-dropdown');
  iptvCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = `Default: ${category}`;
    dropdown.appendChild(option);
  });
  
  // Handle dropdown change
  dropdown.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;
    // Set as default and filter immediately
    filterByCategory(selectedCategory);
    
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    const targetTab = document.querySelector(`[data-category="${selectedCategory}"]`);
    if (targetTab) {
      targetTab.classList.add('active');
    }
  });
  
  // Clear and rebuild tabs
  categoryTabs.innerHTML = '';
  categoryTabs.appendChild(dropdownContainer);
  
  // Add "All" button
  const allTab = document.createElement('button');
  allTab.className = 'category-tab active';
  allTab.textContent = 'All';
  allTab.dataset.category = 'all';
  allTab.addEventListener('click', () => {
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    allTab.classList.add('active');
    filterByCategory('all');
    dropdown.value = 'all'; // Update dropdown
  });
  categoryTabs.appendChild(allTab);
  
  // Add category tabs
  iptvCategories.forEach(category => {
    const tab = document.createElement('button');
    tab.className = 'category-tab';
    tab.textContent = category;
    tab.dataset.category = category;
    
    tab.addEventListener('click', () => {
      document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterByCategory(category);
      dropdown.value = category; // Update dropdown
    });
    
    categoryTabs.appendChild(tab);
  });
}

// Filter by category
function filterByCategory(category) {
  if (category === 'all') {
    iptvFilteredChannels = iptvChannels;
  } else {
    iptvFilteredChannels = iptvChannels.filter(ch => ch.category === category);
  }
  renderChannels();
}

// Render channels (optimized for large playlists with virtual scrolling)
function renderChannels() {
  const channelList = document.getElementById('channelList');
  
  if (iptvFilteredChannels.length === 0) {
    channelList.innerHTML = '<div class="no-channels">No channels found</div>';
    return;
  }
  
  channelList.innerHTML = '';
  
  // For very large playlists (>500 channels), use virtual scrolling
  if (iptvFilteredChannels.length > 500) {
    console.log('Using virtual scrolling for', iptvFilteredChannels.length, 'channels');
    try {
      renderChannelsVirtual();
      return;
    } catch (error) {
      console.error('Virtual scrolling failed, falling back to batch rendering:', error);
      // Fall through to batch rendering
    }
  }
  
  // For smaller playlists, render in batches
  const BATCH_SIZE = 50;
  let currentIndex = 0;
  
  function renderBatch() {
    const fragment = document.createDocumentFragment();
    const endIndex = Math.min(currentIndex + BATCH_SIZE, iptvFilteredChannels.length);
    
    for (let i = currentIndex; i < endIndex; i++) {
      const channel = iptvFilteredChannels[i];
      const channelItem = createChannelElement(channel);
      fragment.appendChild(channelItem);
    }
    
    channelList.appendChild(fragment);
    currentIndex = endIndex;
    
    // Continue rendering if there are more channels
    if (currentIndex < iptvFilteredChannels.length) {
      requestAnimationFrame(renderBatch);
    }
  }
  
  renderBatch();
}

// Virtual scrolling for large playlists (renders only visible items)
function renderChannelsVirtual() {
  const channelList = document.getElementById('channelList');
  const ITEM_HEIGHT = 74; // Height of each channel item
  const BUFFER_SIZE = 10; // Extra items to render above/below viewport
  
  let scrollTop = 0;
  let startIndex = 0;
  let endIndex = 0;
  
  // Create container with full height
  const container = document.createElement('div');
  container.style.height = (iptvFilteredChannels.length * ITEM_HEIGHT) + 'px';
  container.style.position = 'relative';
  container.style.width = '100%';
  channelList.appendChild(container);
  
  function updateVisibleItems() {
    const viewportHeight = channelList.clientHeight;
    const visibleCount = Math.ceil(viewportHeight / ITEM_HEIGHT);
    
    const newStartIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_SIZE);
    const newEndIndex = Math.min(
      iptvFilteredChannels.length,
      newStartIndex + visibleCount + (BUFFER_SIZE * 2)
    );
    
    // Only update if range changed significantly
    if (Math.abs(newStartIndex - startIndex) < 5 && Math.abs(newEndIndex - endIndex) < 5) {
      return;
    }
    
    startIndex = newStartIndex;
    endIndex = newEndIndex;
    
    console.log('Rendering virtual items:', startIndex, 'to', endIndex, 'of', iptvFilteredChannels.length);
    
    // Clear and render visible items
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    
    for (let i = startIndex; i < endIndex; i++) {
      const channel = iptvFilteredChannels[i];
      const channelItem = createChannelElement(channel);
      channelItem.style.position = 'absolute';
      channelItem.style.top = (i * ITEM_HEIGHT) + 'px';
      channelItem.style.left = '0';
      channelItem.style.right = '0';
      channelItem.style.height = ITEM_HEIGHT + 'px';
      fragment.appendChild(channelItem);
    }
    
    container.appendChild(fragment);
  }
  
  // Initial render
  updateVisibleItems();
  
  // Update on scroll with throttling
  let scrollTimeout = null;
  channelList.addEventListener('scroll', () => {
    scrollTop = channelList.scrollTop;
    
    if (scrollTimeout) {
      return;
    }
    
    scrollTimeout = setTimeout(() => {
      updateVisibleItems();
      scrollTimeout = null;
    }, 50);
  });
}

// Create channel element (extracted for reuse)
function createChannelElement(channel) {
  const channelItem = document.createElement('div');
  channelItem.className = 'channel-item';
  
  // Ensure channel has required properties
  if (!channel || !channel.name) {
    console.error('Invalid channel:', channel);
    return channelItem;
  }
  
  channelItem.innerHTML = `
    <div class="channel-logo">
      <img src="${channel.logo || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 60 60%22%3E%3Crect fill=%22%232a2a2a%22 width=%2260%22 height=%2260%22/%3E%3Ctext x=%2230%22 y=%2235%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23dc2626%22 text-anchor=%22middle%22%3E📺%3C/text%3E%3C/svg%3E'}" alt="${channel.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 60 60%22%3E%3Crect fill=%22%232a2a2a%22 width=%2260%22 height=%2260%22/%3E%3Ctext x=%2230%22 y=%2235%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23dc2626%22 text-anchor=%22middle%22%3E📺%3C/text%3E%3C/svg%3E'" loading="lazy">
    </div>
    <div class="channel-info">
      <div class="channel-name">${channel.name}</div>
      <div class="channel-category">${channel.category || 'Uncategorized'}</div>
    </div>
  `;
  
  // Left click to play
  channelItem.addEventListener('click', (e) => {
    e.stopPropagation();
    playChannel(channel);
  });
  
  // Right click for context menu
  channelItem.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.showContextMenu) {
      window.showContextMenu(e, channel);
    }
  });
  
  return channelItem;
}

// Play channel with debounce to prevent accidental double-clicks
let playChannelTimeout = null;
function playChannel(channel) {
  // Clear any pending play request
  if (playChannelTimeout) {
    clearTimeout(playChannelTimeout);
  }
  
  // Debounce: wait 200ms before actually playing
  playChannelTimeout = setTimeout(() => {
    console.log('=== Playing Channel ===');
    console.log('Channel:', channel);
    console.log('Headers:', channel.headers);
    console.log('DRM:', channel.drm);
    
    if (window.videoPlayer) {
      // Check if channel has advanced headers or DRM
      if (channel.headers || channel.drm) {
        const config = {
          url: channel.url,
          cookies: channel.headers?.cookies || '',
          referer: channel.headers?.referer || '',
          origin: channel.headers?.origin || '',
          userAgent: channel.headers?.userAgent || '',
          drmScheme: channel.drm?.scheme || 'none',
          drmUrl: channel.drm?.licenseUrl || '',
          keyId: channel.drm?.keyId || '',
          key: channel.drm?.key || ''
        };
        
        // If no drmUrl but we have a key field that's a URL, use it
        if (!config.drmUrl && channel.drm?.key && 
            (channel.drm.key.startsWith('http://') || channel.drm.key.startsWith('https://'))) {
          config.drmUrl = channel.drm.key;
          config.key = ''; // Clear the key field since it's actually a URL
          console.log('Using key field as license URL:', config.drmUrl);
        }
        
        console.log('Playing with config:', config);
        window.videoPlayer.playVideoWithConfig(channel.url, channel.name, config);
      } else {
        console.log('Playing without config (no headers/DRM)');
        window.videoPlayer.playVideo(channel.url, channel.name);
      }
    }
    
    playChannelTimeout = null;
  }, 200);
}

// Add playlist dialog
function showAddPlaylistDialog() {
  const popup = document.getElementById('addPlaylistPopup');
  if (popup) {
    popup.classList.remove('hidden');
    document.getElementById('playlistName')?.focus();
  }
}

// Hide add playlist popup
function hideAddPlaylistPopup() {
  const popup = document.getElementById('addPlaylistPopup');
  if (popup) {
    popup.classList.add('hidden');
    // Clear form
    document.getElementById('playlistName').value = '';
    document.getElementById('playlistUrl').value = '';
    document.getElementById('playlistFileInput').value = '';
    document.getElementById('fileNameDisplay').textContent = 'Select M3U File';
  }
}

// Import playlist
async function importPlaylist() {
  const name = document.getElementById('playlistName')?.value.trim();
  const activeTab = document.querySelector('.popup-tab.active')?.dataset.tab;
  
  if (!name) {
    alert('Please enter a playlist name');
    return;
  }
  
  const importBtn = document.getElementById('addPlaylistImportBtn');
  const originalText = importBtn.textContent;
  
  // Disable button and show processing state
  importBtn.disabled = true;
  importBtn.classList.add('processing');
  importBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  
  let m3uContent = '';
  
  try {
    if (activeTab === 'file') {
      const fileInput = document.getElementById('playlistFileInput');
      if (!fileInput.files || !fileInput.files[0]) {
        alert('Please select a file');
        importBtn.disabled = false;
        importBtn.classList.remove('processing');
        importBtn.textContent = originalText;
        return;
      }
      
      const file = fileInput.files[0];
      importBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Reading file...';
      m3uContent = await file.text();
    } else if (activeTab === 'link') {
      const url = document.getElementById('playlistUrl')?.value.trim();
      if (!url) {
        alert('Please enter a playlist URL');
        importBtn.disabled = false;
        importBtn.classList.remove('processing');
        importBtn.textContent = originalText;
        return;
      }
      
      importBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
      
      // Try to use Electron API for better header control
      if (window.electronAPI && window.electronAPI.fetchPlaylist) {
        console.log('✓ Using Electron API to fetch playlist (VLC User-Agent)...');
        const result = await window.electronAPI.fetchPlaylist(url);
        
        if (result.success) {
          m3uContent = result.content;
          console.log('✓ Playlist fetched successfully via Electron API');
        } else {
          throw new Error(result.error || 'Failed to fetch playlist');
        }
      } else {
        // Fallback to fetch API
        console.warn('⚠ Electron API not available, using fetch API (may not work with some servers)');
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'VLC/3.0.18 LibVLC/3.0.18',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9'
          },
          redirect: 'follow'
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        m3uContent = await response.text();
        console.log('Playlist fetched via fetch API');
      }
      
      // Check if we got HTML instead of M3U
      if (m3uContent.trim().toLowerCase().startsWith('<html') || m3uContent.trim().toLowerCase().startsWith('<!doctype')) {
        alert('Error: Server returned HTML instead of M3U playlist.\n\nThe URL may require authentication or may be blocked.\n\nTry:\n1. Check if the URL is correct\n2. Get a fresh URL/token\n3. Download the playlist file and import it using the File tab');
        importBtn.disabled = false;
        importBtn.classList.remove('processing');
        importBtn.textContent = originalText;
        return;
      }
      
      // Check if content looks like M3U
      if (!m3uContent.includes('#EXTM3U') && !m3uContent.includes('#EXTINF')) {
        alert('Error: Invalid M3U format.\n\nThe content does not contain M3U tags.');
        importBtn.disabled = false;
        importBtn.classList.remove('processing');
        importBtn.textContent = originalText;
        return;
      }
    } else {
      alert('QR/URL import coming soon!');
      importBtn.disabled = false;
      importBtn.classList.remove('processing');
      importBtn.textContent = originalText;
      return;
    }
    
    // Parse playlist
    importBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Parsing channels...';
    
    let channels = [];
    
    // Try to use main process parsing for better performance
    if (window.electronAPI && window.electronAPI.parseM3U) {
      console.log('✓ Using main process for M3U parsing (faster)...');
      const result = await window.electronAPI.parseM3U(m3uContent);
      
      if (result.success) {
        channels = result.channels;
        console.log('✓ Parsed in main process:', channels.length, 'channels');
      } else {
        throw new Error(result.error || 'Failed to parse playlist');
      }
    } else {
      // Fallback to renderer process parsing
      console.warn('⚠ Main process parsing not available, using renderer (slower)');
      channels = await new Promise((resolve) => {
        if (window.requestIdleCallback) {
          requestIdleCallback(() => {
            resolve(parseM3UAdvanced(m3uContent));
          });
        } else {
          setTimeout(() => {
            resolve(parseM3UAdvanced(m3uContent));
          }, 0);
        }
      });
    }
    
    importBtn.innerHTML = '<i class="fas fa-check"></i> Saving...';
    
    iptvPlaylists.push({
      name: name,
      url: activeTab === 'link' ? document.getElementById('playlistUrl').value : 'local',
      channelCount: channels.length,
      logo: '',
      channels: channels
    });
    
    savePlaylists();
    renderPlaylists();
    
    // Success state
    importBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
    importBtn.classList.remove('processing');
    importBtn.classList.add('success');
    
    setTimeout(() => {
      hideAddPlaylistPopup();
      importBtn.disabled = false;
      importBtn.classList.remove('success');
      importBtn.textContent = originalText;
    }, 1000);
    
  } catch (error) {
    console.error('Import error:', error);
    importBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
    importBtn.classList.remove('processing');
    importBtn.classList.add('error');
    
    setTimeout(() => {
      importBtn.disabled = false;
      importBtn.classList.remove('error');
      importBtn.textContent = originalText;
    }, 2000);
    
    alert('Failed to import playlist:\n\n' + error.message);
  }
}

// Add playlist
async function addPlaylist(name, url) {
  // Show loading indicator
  const playlistList = document.getElementById('playlistList');
  const loadingItem = document.createElement('div');
  loadingItem.className = 'playlist-item loading-playlist';
  loadingItem.innerHTML = `
    <div class="playlist-logo">
      <i class="fas fa-spinner fa-spin" style="font-size: 24px; color: #dc2626;"></i>
    </div>
    <div class="playlist-info">
      <div class="playlist-name">${name}</div>
      <div class="playlist-count">Loading...</div>
    </div>
  `;
  playlistList.appendChild(loadingItem);
  
  try {
    console.log('Loading playlist:', url);
    
    let content = '';
    let contentType = '';
    
    // Try to use Electron API for better header control
    if (window.electronAPI && window.electronAPI.fetchPlaylist) {
      console.log('✓ Using Electron API to fetch playlist (VLC User-Agent)...');
      const result = await window.electronAPI.fetchPlaylist(url);
      
      if (result.success) {
        content = result.content;
        contentType = result.contentType || '';
        console.log('✓ Playlist fetched successfully via Electron API');
      } else {
        throw new Error(result.error || 'Failed to fetch playlist');
      }
    } else {
      // Fallback to fetch API
      console.warn('⚠ Electron API not available, using fetch API (may not work with some servers)');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'VLC/3.0.18 LibVLC/3.0.18',
          'Accept': '*/*',
          'Accept-Language': 'en-US,en;q=0.9'
        },
        redirect: 'follow'
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      content = await response.text();
      contentType = response.headers.get('content-type') || '';
      console.log('Playlist fetched via fetch API');
    }
    
    console.log('Playlist content length:', content.length);
    console.log('Content type:', contentType);
    console.log('First 200 chars:', content.substring(0, 200));
    
    // Check if we got HTML instead of M3U
    if (content.trim().toLowerCase().startsWith('<html') || content.trim().toLowerCase().startsWith('<!doctype')) {
      throw new Error('Server returned HTML instead of M3U playlist. The URL may require authentication or may be blocked.');
    }
    
    // Check if content looks like M3U
    if (!content.includes('#EXTM3U') && !content.includes('#EXTINF')) {
      throw new Error('Invalid M3U format. Content does not contain M3U tags.');
    }
    
    // Parse playlist
    const channels = parseM3UAdvanced(content);
    console.log(`Parsed ${channels.length} channels`);
    
    if (channels.length === 0) {
      throw new Error('No channels found in playlist');
    }
    
    // Add playlist with channel count
    const newPlaylist = {
      name: name,
      url: url,
      channelCount: channels.length,
      logo: '',
      channels: channels
    };
    
    iptvPlaylists.push(newPlaylist);
    savePlaylists();
    
    // Remove loading indicator
    loadingItem.remove();
    
    // Re-render playlists
    renderPlaylists();
    
    console.log('Playlist added successfully');
    
  } catch (error) {
    console.error('Error loading playlist:', error);
    
    // Remove loading indicator
    loadingItem.remove();
    
    // Show error message
    let errorMsg = 'Failed to load playlist';
    let errorDetails = '';
    
    if (error.name === 'AbortError') {
      errorMsg = 'Playlist loading timed out (30s)';
      errorDetails = 'The server took too long to respond.';
    } else if (error.message.includes('HTML instead of M3U')) {
      errorMsg = 'Invalid Response';
      errorDetails = 'The server returned a webpage instead of a playlist.\n\nPossible causes:\n• URL requires authentication\n• Token expired or invalid\n• Server is blocking the request\n• URL is incorrect\n\nSolutions:\n1. If this is an XTream server, use the XTream tab instead\n2. Check if the URL is correct\n3. Get a fresh URL/token from your provider\n4. Download the playlist file and import it using File tab\n5. Try opening the URL in a browser to see what it returns';
    } else if (error.message.includes('Invalid M3U format')) {
      errorMsg = 'Invalid Playlist Format';
      errorDetails = 'The content does not appear to be a valid M3U playlist.';
    } else if (error.message) {
      errorMsg = error.message;
    }
    
    alert(`Error: ${errorMsg}\n\n${errorDetails}\n\nURL: ${url}`);
  }
}

// Play URL dialog
function showPlayURLDialog() {
  const popup = document.getElementById('streamPopup');
  if (popup) {
    popup.classList.remove('hidden');
    document.getElementById('streamUrl')?.focus();
  }
}

// Hide stream popup
function hideStreamPopup() {
  const popup = document.getElementById('streamPopup');
  if (popup) {
    popup.classList.add('hidden');
    // Clear form
    document.getElementById('streamUrl').value = '';
    document.getElementById('streamCookies').value = '';
    document.getElementById('streamReferer').value = '';
    document.getElementById('streamOrigin').value = '';
    document.getElementById('streamDrmUrl').value = '';
    document.getElementById('streamUserAgent').value = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    document.getElementById('streamDrmScheme').value = 'none';
    document.getElementById('customUserAgentGroup').classList.add('hidden');
  }
}

// Parse URL with embedded parameters (e.g., url|drmScheme=clearkey&drmLicense=keyId:key)
function parseStreamURL(urlString) {
  const config = {
    url: '',
    cookies: '',
    referer: '',
    origin: '',
    drmUrl: '',
    userAgent: '',
    drmScheme: 'none',
    keyId: '',
    key: ''
  };
  
  // Decode URL-encoded characters first
  let decodedUrl = urlString;
  try {
    decodedUrl = decodeURIComponent(urlString);
  } catch (e) {
    // If decoding fails, use original
    decodedUrl = urlString;
  }
  
  // Check if URL contains pipe separator (| or %7C)
  if (decodedUrl.includes('|')) {
    const parts = decodedUrl.split('|');
    // Clean the URL - remove trailing ? or other query separators
    config.url = parts[0].trim().replace(/[?&]$/, '');
    
    // Parse parameters after pipe
    const params = parts.slice(1).join('|');
    const paramPairs = params.split('&');
    
    paramPairs.forEach(pair => {
      // Split only on the FIRST = to handle values with = signs
      const firstEqualIndex = pair.indexOf('=');
      if (firstEqualIndex === -1) return;
      
      const key = pair.substring(0, firstEqualIndex).trim();
      const value = pair.substring(firstEqualIndex + 1).trim();
      const lowerKey = key.toLowerCase();
      
      if (lowerKey === 'drmscheme') {
        config.drmScheme = value.toLowerCase();
      } else if (lowerKey === 'drmlicense') {
        // Handle ClearKey format: keyId:key
        if (value.includes(':')) {
          const [keyId, key] = value.split(':');
          config.keyId = keyId.trim();
          config.key = key.trim();
        } else {
          config.drmUrl = value;
        }
      } else if (lowerKey === 'cookie' || lowerKey === 'cookies') {
        config.cookies = value;
      } else if (lowerKey === 'referer' || lowerKey === 'referrer') {
        config.referer = value;
      } else if (lowerKey === 'origin') {
        config.origin = value;
      } else if (lowerKey === 'useragent' || lowerKey === 'user-agent') {
        config.userAgent = value;
      }
    });
  } else {
    config.url = decodedUrl.trim();
  }
  
  return config;
}

// Play stream with configuration
function playStreamWithConfig() {
  let url = document.getElementById('streamUrl')?.value.trim();
  
  if (!url) {
    alert('Please enter a stream URL');
    return;
  }
  
  console.log('=== Stream Config Debug ===');
  console.log('Raw URL from input:', url);
  
  // Parse URL if it contains embedded parameters
  let parsedConfig = parseStreamURL(url);
  console.log('Parsed config:', parsedConfig);
  
  // Use parsed URL (without parameters)
  url = parsedConfig.url;
  
  const drmScheme = document.getElementById('streamDrmScheme')?.value;
  const drmUrlValue = document.getElementById('streamDrmUrl')?.value.trim();
  
  console.log('DRM Scheme from dropdown:', drmScheme);
  console.log('DRM URL/License from field:', drmUrlValue);
  
  const config = {
    cookies: document.getElementById('streamCookies')?.value.trim() || parsedConfig.cookies,
    referer: document.getElementById('streamReferer')?.value.trim() || parsedConfig.referer,
    origin: document.getElementById('streamOrigin')?.value.trim() || parsedConfig.origin,
    userAgent: document.getElementById('streamUserAgent')?.value,
    drmScheme: drmScheme !== 'none' ? drmScheme : parsedConfig.drmScheme
  };
  
  // If custom user agent is selected
  if (config.userAgent === 'custom') {
    config.userAgent = document.getElementById('customUserAgent')?.value.trim();
  }
  
  // If no user agent from form, use parsed one
  if (!config.userAgent || config.userAgent === 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36') {
    if (parsedConfig.userAgent) {
      config.userAgent = parsedConfig.userAgent;
    }
  }
  
  // Handle ClearKey with keyId:key format
  // Priority: form fields > parsed from URL
  if (config.drmScheme === 'clearkey') {
    console.log('ClearKey detected, processing keys...');
    if (drmUrlValue && drmUrlValue.includes(':')) {
      const [keyId, key] = drmUrlValue.split(':').map(s => s.trim());
      config.keyId = keyId;
      config.key = key;
      console.log('Keys from form field:', { keyId, key });
    } else if (parsedConfig.keyId && parsedConfig.key) {
      config.keyId = parsedConfig.keyId;
      config.key = parsedConfig.key;
      console.log('Keys from parsed URL:', { keyId: parsedConfig.keyId, key: parsedConfig.key });
    } else if (drmUrlValue) {
      config.drmUrl = drmUrlValue;
      console.log('DRM URL (not key:value format):', drmUrlValue);
    }
  } else if (drmUrlValue) {
    config.drmUrl = drmUrlValue;
  } else if (parsedConfig.drmUrl) {
    config.drmUrl = parsedConfig.drmUrl;
  }
  
  console.log('=== Final Config ===');
  console.log('Clean URL:', url);
  console.log('Config:', config);
  
  // Play video with configuration
  if (window.videoPlayer) {
    window.videoPlayer.playVideoWithConfig(url, 'Live Stream', config);
  }
  
  hideStreamPopup();
}

// Show QR code (placeholder)
function showQRConfig() {
  alert('QR Code configuration coming soon!');
}

// Search channels
function searchChannels(query) {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) {
    iptvFilteredChannels = iptvChannels;
  } else {
    iptvFilteredChannels = iptvChannels.filter(ch => 
      ch.name.toLowerCase().includes(searchTerm) ||
      ch.category.toLowerCase().includes(searchTerm)
    );
  }
  
  renderChannels();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadPlaylists();
  
  // Button handlers
  document.getElementById('iptvAddBtn')?.addEventListener('click', showAddPlaylistDialog);
  document.getElementById('iptvPlayBtn')?.addEventListener('click', showPlayURLDialog);
  document.getElementById('iptvRefreshBtn')?.addEventListener('click', loadPlaylists);
  document.getElementById('backToPlaylistsBtn')?.addEventListener('click', backToPlaylists);
  
  // Add Playlist popup handlers
  document.getElementById('addPlaylistCancelBtn')?.addEventListener('click', hideAddPlaylistPopup);
  document.getElementById('addPlaylistImportBtn')?.addEventListener('click', importPlaylist);
  
  // File selection
  document.getElementById('selectFileBtn')?.addEventListener('click', () => {
    document.getElementById('playlistFileInput')?.click();
  });
  
  document.getElementById('playlistFileInput')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      document.getElementById('fileNameDisplay').textContent = file.name;
    }
  });
  
  // Tab switching
  document.querySelectorAll('.popup-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      
      // Update active tab
      document.querySelectorAll('.popup-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show corresponding content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
      });
      document.getElementById(`${tabName}Tab`)?.classList.remove('hidden');
    });
  });
  
  // Close add playlist popup when clicking outside
  document.getElementById('addPlaylistPopup')?.addEventListener('click', (e) => {
    if (e.target.id === 'addPlaylistPopup') {
      hideAddPlaylistPopup();
    }
  });
  
  // Prevent popup content clicks from closing
  document.querySelectorAll('.stream-popup-content').forEach(content => {
    content.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
  
  // Stream popup handlers
  document.getElementById('streamCancelBtn')?.addEventListener('click', hideStreamPopup);
  document.getElementById('streamPlayBtn')?.addEventListener('click', playStreamWithConfig);
  document.getElementById('streamQrBtn')?.addEventListener('click', showQRConfig);
  
  // User Agent dropdown
  document.getElementById('streamUserAgent')?.addEventListener('change', (e) => {
    const customGroup = document.getElementById('customUserAgentGroup');
    if (e.target.value === 'custom') {
      customGroup?.classList.remove('hidden');
    } else {
      customGroup?.classList.add('hidden');
    }
  });
  
  // Close popup when clicking outside
  document.getElementById('streamPopup')?.addEventListener('click', (e) => {
    if (e.target.id === 'streamPopup') {
      hideStreamPopup();
    }
  });
  
  // Channel search
  document.getElementById('channelSearchBtn')?.addEventListener('click', () => {
    const searchBar = document.getElementById('channelSearchBar');
    searchBar.classList.toggle('hidden');
    if (!searchBar.classList.contains('hidden')) {
      document.getElementById('channelSearchInput').focus();
    }
  });
  
  document.getElementById('channelSearchInput')?.addEventListener('input', (e) => {
    searchChannels(e.target.value);
  });
  
  document.getElementById('channelSearchClearBtn')?.addEventListener('click', () => {
    document.getElementById('channelSearchInput').value = '';
    searchChannels('');
  });
  
  // Channel view toggle
  document.getElementById('channelViewBtn')?.addEventListener('click', () => {
    const channelList = document.getElementById('channelList');
    channelList.classList.toggle('grid-view');
    const icon = document.querySelector('#channelViewBtn i');
    if (channelList.classList.contains('grid-view')) {
      icon.className = 'fas fa-list';
    } else {
      icon.className = 'fas fa-th';
    }
  });
  
  // Channel refresh button
  document.getElementById('channelRefreshBtn')?.addEventListener('click', refreshChannels);
  
  // Context menu handlers
  document.getElementById('contextShareChannel')?.addEventListener('click', async () => {
    const contextMenu = document.getElementById('channelContextMenu');
    const channelData = JSON.parse(contextMenu.dataset.channelData || '{}');
    
    try {
      const deeplink = await window.deeplinkManager.generateDeeplink(channelData);
      
      // Share using Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: channelData.name,
          text: `Watch ${channelData.name} on Ruby Player`,
          url: deeplink
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(deeplink);
        alert('Deeplink copied to clipboard!');
      }
    } catch (error) {
      console.error('Share error:', error);
      alert('Failed to share channel');
    }
    
    contextMenu.classList.add('hidden');
  });
  
  document.getElementById('contextCopyLink')?.addEventListener('click', async () => {
    const contextMenu = document.getElementById('channelContextMenu');
    const channelData = JSON.parse(contextMenu.dataset.channelData || '{}');
    
    try {
      const deeplink = await window.deeplinkManager.generateDeeplink(channelData);
      await navigator.clipboard.writeText(deeplink);
      alert('Deeplink copied to clipboard!');
    } catch (error) {
      console.error('Copy error:', error);
      alert('Failed to copy deeplink');
    }
    
    contextMenu.classList.add('hidden');
  });
  
  // Playlist context menu handlers
  document.getElementById('contextEditPlaylistName')?.addEventListener('click', () => {
    if (selectedPlaylistIndex >= 0) {
      editPlaylistName(selectedPlaylistIndex);
    }
    hidePlaylistContextMenu();
  });
  
  document.getElementById('contextEditPlaylistURL')?.addEventListener('click', () => {
    if (selectedPlaylistIndex >= 0) {
      editPlaylistURL(selectedPlaylistIndex);
    }
    hidePlaylistContextMenu();
  });
  
  document.getElementById('contextPinPlaylist')?.addEventListener('click', () => {
    if (selectedPlaylistIndex >= 0) {
      togglePinPlaylist(selectedPlaylistIndex);
    }
    hidePlaylistContextMenu();
  });
  
  document.getElementById('contextSharePlaylist')?.addEventListener('click', async () => {
    if (selectedPlaylistIndex >= 0) {
      await sharePlaylist(selectedPlaylistIndex);
    }
    hidePlaylistContextMenu();
  });
  
  document.getElementById('contextDeletePlaylist')?.addEventListener('click', () => {
    if (selectedPlaylistIndex >= 0) {
      deletePlaylist(selectedPlaylistIndex);
    }
    hidePlaylistContextMenu();
  });
  
  // Hide context menus when clicking outside
  document.addEventListener('click', (e) => {
    const contextMenu = document.getElementById('playlistContextMenu');
    if (contextMenu && !contextMenu.contains(e.target)) {
      hidePlaylistContextMenu();
    }
  });
  
  // Also hide on contextmenu event outside the menu
  document.addEventListener('contextmenu', (e) => {
    const contextMenu = document.getElementById('playlistContextMenu');
    const playlistItem = e.target.closest('.playlist-item');
    
    // Only hide if right-clicking outside both the menu and playlist items
    if (contextMenu && !contextMenu.contains(e.target) && !playlistItem) {
      hidePlaylistContextMenu();
    }
  });
  
  // Prevent context menu from closing when clicking inside it
  document.getElementById('playlistContextMenu')?.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  // Hide menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hidePlaylistContextMenu();
    }
  });
  
  // Hide menu when scrolling the playlist
  const playlistList = document.getElementById('playlistList');
  if (playlistList) {
    playlistList.addEventListener('scroll', () => {
      hidePlaylistContextMenu();
    });
  }
});

// Show playlist context menu
function showPlaylistContextMenu(x, y, playlist) {
  console.log('=== showPlaylistContextMenu called ===');
  console.log('Position:', x, y);
  
  const contextMenu = document.getElementById('playlistContextMenu');
  
  if (!contextMenu) {
    console.error('Playlist context menu not found!');
    return;
  }
  
  // First hide it to reset state
  contextMenu.classList.add('hidden');
  
  // Update pin button text
  const pinBtn = document.getElementById('contextPinPlaylist');
  if (pinBtn) {
    const icon = pinBtn.querySelector('i');
    const text = pinBtn.querySelector('span');
    if (playlist.pinned) {
      icon.className = 'fas fa-times';
      text.textContent = 'Unpin';
    } else {
      icon.className = 'fas fa-thumbtack';
      text.textContent = 'Pin to Top';
    }
  }
  
  // Position the menu BEFORE showing it
  contextMenu.style.left = x + 'px';
  contextMenu.style.top = y + 'px';
  contextMenu.style.opacity = '1';
  contextMenu.style.visibility = 'visible';
  
  // Use setTimeout to ensure the menu shows after event propagation
  setTimeout(() => {
    contextMenu.classList.remove('hidden');
    console.log('Menu shown at:', contextMenu.style.left, contextMenu.style.top);
    console.log('Menu visibility:', window.getComputedStyle(contextMenu).visibility);
    console.log('Menu opacity:', window.getComputedStyle(contextMenu).opacity);
    console.log('Menu display:', window.getComputedStyle(contextMenu).display);
  }, 10);
}

// Hide playlist context menu
function hidePlaylistContextMenu() {
  const contextMenu = document.getElementById('playlistContextMenu');
  if (contextMenu) {
    console.log('Hiding playlist context menu');
    contextMenu.classList.add('hidden');
  }
}

// Toggle pin playlist
function togglePinPlaylist(index) {
  if (index >= 0 && index < iptvPlaylists.length) {
    iptvPlaylists[index].pinned = !iptvPlaylists[index].pinned;
    savePlaylists();
    renderPlaylists();
  }
}

// Share playlist
async function sharePlaylist(index) {
  if (index < 0 || index >= iptvPlaylists.length) return;
  
  const playlist = iptvPlaylists[index];
  
  try {
    // Check if deeplinkManager is available
    if (!window.deeplinkManager || !window.deeplinkManager.generatePlaylistDeeplink) {
      console.error('deeplinkManager not available');
      alert('Deeplink manager not ready. Please refresh the page and try again.');
      return;
    }
    
    const deeplink = await window.deeplinkManager.generatePlaylistDeeplink(playlist);
    
    console.log('Generated playlist deeplink:', deeplink);
    
    // Try to use Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Share Playlist: ${playlist.name}`,
          text: `Check out this playlist: ${playlist.name}`,
          url: deeplink
        });
        return;
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Share API error:', error);
        }
      }
    }
    
    // Fallback: copy to clipboard
    await navigator.clipboard.writeText(deeplink);
    alert('Playlist deeplink copied to clipboard!\n\n' + deeplink);
  } catch (error) {
    console.error('Share playlist error:', error);
    alert('Failed to share playlist: ' + error.message);
  }
}

// Custom prompt dialog (since prompt() is not supported in Electron)
function customPrompt(message, defaultValue = '') {
  return new Promise((resolve) => {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10001;
    `;
    
    // Create dialog
    const dialog = document.createElement('div');
    dialog.style.cssText = `
      background: #ffffff;
      border-radius: 12px;
      padding: 24px;
      min-width: 400px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    `;
    
    if (document.body.classList.contains('dark-theme')) {
      dialog.style.background = '#1a1a1a';
      dialog.style.color = '#ffffff';
    }
    
    dialog.innerHTML = `
      <div style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">${message}</div>
      <input type="text" id="promptInput" value="${defaultValue}" style="
        width: 100%;
        padding: 10px;
        border: 1px solid #d0d0d0;
        border-radius: 6px;
        font-size: 14px;
        margin-bottom: 16px;
        background: ${document.body.classList.contains('dark-theme') ? '#0a0a0a' : '#ffffff'};
        color: ${document.body.classList.contains('dark-theme') ? '#ffffff' : '#1a1a1a'};
      ">
      <div style="display: flex; gap: 10px; justify-content: flex-end;">
        <button id="promptCancel" style="
          padding: 8px 20px;
          border: 1px solid #d0d0d0;
          border-radius: 6px;
          background: transparent;
          cursor: pointer;
          font-size: 14px;
          color: ${document.body.classList.contains('dark-theme') ? '#ffffff' : '#1a1a1a'};
        ">Cancel</button>
        <button id="promptOk" style="
          padding: 8px 20px;
          border: none;
          border-radius: 6px;
          background: #dc2626;
          color: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        ">OK</button>
      </div>
    `;
    
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    
    const input = document.getElementById('promptInput');
    input.focus();
    input.select();
    
    const cleanup = (value) => {
      document.body.removeChild(overlay);
      resolve(value);
    };
    
    document.getElementById('promptOk').onclick = () => cleanup(input.value);
    document.getElementById('promptCancel').onclick = () => cleanup(null);
    input.onkeydown = (e) => {
      if (e.key === 'Enter') cleanup(input.value);
      if (e.key === 'Escape') cleanup(null);
    };
  });
}

// Edit playlist name
async function editPlaylistName(index) {
  if (index < 0 || index >= iptvPlaylists.length) return;
  
  const playlist = iptvPlaylists[index];
  const newName = await customPrompt('Edit Playlist Name:', playlist.name);
  
  if (newName && newName.trim() !== '' && newName !== playlist.name) {
    iptvPlaylists[index].name = newName.trim();
    savePlaylists();
    renderPlaylists();
    
    // Update header if this playlist is currently open
    if (iptvCurrentPlaylist === playlist) {
      document.getElementById('currentPlaylistName').textContent = newName.trim();
    }
  }
}

// Edit playlist URL
async function editPlaylistURL(index) {
  if (index < 0 || index >= iptvPlaylists.length) return;
  
  const playlist = iptvPlaylists[index];
  const newURL = await customPrompt('Edit Playlist URL:', playlist.url);
  
  if (newURL && newURL.trim() !== '' && newURL !== playlist.url) {
    const confirmed = confirm(
      'Changing the URL will reload the playlist.\n\n' +
      'Do you want to continue?'
    );
    
    if (confirmed) {
      iptvPlaylists[index].url = newURL.trim();
      // Clear cached channels to force reload
      iptvPlaylists[index].channels = [];
      iptvPlaylists[index].channelCount = 0;
      savePlaylists();
      renderPlaylists();
      
      alert('Playlist URL updated. Open the playlist to reload channels.');
    }
  }
}

// Delete playlist
function deletePlaylist(index) {
  if (index < 0 || index >= iptvPlaylists.length) return;
  
  const playlist = iptvPlaylists[index];
  const confirmed = confirm(`Delete playlist "${playlist.name}"?\n\nThis action cannot be undone.`);
  
  if (confirmed) {
    iptvPlaylists.splice(index, 1);
    savePlaylists();
    renderPlaylists();
  }
}

window.iptvManager = {
  loadPlaylists,
  addPlaylist,
  playChannel
};

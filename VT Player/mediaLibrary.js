// Media Library Management
let allVideos = [];
let filteredVideos = [];
let currentFilter = 'all';

// Initialize media library
async function initMediaLibrary() {
  const videoList = document.getElementById('videoList');
  
  // Don't auto-scan, show empty state with instructions
  videoList.innerHTML = `
    <div class="no-videos">
      <i class="fas fa-folder-open" style="font-size: 48px; color: #dc2626; margin-bottom: 16px;"></i>
      <p style="font-size: 16px; margin-bottom: 8px;">No media files added</p>
      <p style="font-size: 13px; color: #666;">Click the <i class="fas fa-plus"></i> button above to add videos or music</p>
    </div>
  `;
  
  // Set up event listeners for manual file selection
  setupMediaControls();
}

// Setup media controls
function setupMediaControls() {
  console.log('Setting up media controls...');
  
  // Plus button to manually add files
  const addMediaBtn = document.getElementById('addMediaBtn');
  console.log('Add media button:', addMediaBtn);
  
  if (addMediaBtn) {
    addMediaBtn.onclick = async () => {
      console.log('Plus button clicked!');
      try {
        if (!window.electronAPI || !window.electronAPI.selectMediaFiles) {
          console.error('electronAPI.selectMediaFiles not available');
          alert('File selection not available. Please restart the app.');
          return;
        }
        
        console.log('Opening file picker...');
        const files = await window.electronAPI.selectMediaFiles();
        console.log('Selected files:', files);
        
        if (files && files.length > 0) {
          // Format file sizes
          const formattedFiles = files.map(file => ({
            ...file,
            sizeFormatted: formatFileSize(file.size)
          }));
          
          allVideos = [...allVideos, ...formattedFiles];
          filteredVideos = allVideos;
          applyFilter(currentFilter);
          renderVideoList();
          console.log('Files added successfully');
        } else {
          console.log('No files selected');
        }
      } catch (error) {
        console.error('Error selecting files:', error);
        alert('Error selecting files: ' + error.message);
      }
    };
    console.log('Plus button event listener attached');
  } else {
    console.error('Add media button not found!');
  }
  
  // Search button to toggle search bar
  const searchBtn = document.getElementById('searchBtn');
  const searchBar = document.getElementById('searchBar');
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  
  if (searchBtn && searchBar) {
    searchBtn.onclick = () => {
      searchBar.classList.toggle('hidden');
      if (!searchBar.classList.contains('hidden')) {
        searchInput.focus();
      } else {
        searchInput.value = '';
        filterBySearch('');
      }
    };
  }
  
  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterBySearch(e.target.value);
    });
  }
  
  // Clear search
  if (searchClearBtn) {
    searchClearBtn.onclick = () => {
      searchInput.value = '';
      filterBySearch('');
      searchInput.focus();
    };
  }
}

// Filter by search query
function filterBySearch(query) {
  if (!query) {
    filteredVideos = allVideos.filter(video => {
      if (currentFilter === 'all') return true;
      if (currentFilter === 'videos') return video.type === 'video';
      if (currentFilter === 'music') return video.type === 'audio';
      return true;
    });
  } else {
    const lowerQuery = query.toLowerCase();
    filteredVideos = allVideos.filter(video => {
      const matchesSearch = video.name.toLowerCase().includes(lowerQuery);
      if (currentFilter === 'all') return matchesSearch;
      if (currentFilter === 'videos') return matchesSearch && video.type === 'video';
      if (currentFilter === 'music') return matchesSearch && video.type === 'audio';
      return matchesSearch;
    });
  }
  renderVideoList();
}

// Apply filter by type
function applyFilter(filter) {
  currentFilter = filter;
  filteredVideos = allVideos.filter(video => {
    if (filter === 'all') return true;
    if (filter === 'videos') return video.type === 'video';
    if (filter === 'music') return video.type === 'audio';
    return true;
  });
  renderVideoList();
}

// Format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Render video list
function renderVideoList() {
  const videoList = document.getElementById('videoList');
  videoList.innerHTML = '';
  
  if (filteredVideos.length === 0) {
    videoList.innerHTML = '<div class="no-videos">No videos found</div>';
    return;
  }
  
  console.log('Rendering', filteredVideos.length, 'videos'); // Debug
  
  filteredVideos.forEach((video, index) => {
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';
    videoItem.dataset.path = video.path;
    
    // Create thumbnail element
    let thumbnailContent;
    if (video.type === 'audio') {
      thumbnailContent = '<i class="fas fa-music music-icon"></i>';
    } else {
      // For video files, create a video element to capture thumbnail
      thumbnailContent = `
        <video class="video-thumb-preview" preload="metadata" muted>
          <source src="file:///${video.path.replace(/\\/g, '/')}" type="video/mp4">
        </video>
        <i class="fas fa-video video-icon video-fallback"></i>
      `;
    }
    
    const videoName = video.name || 'Unknown';
    const videoSize = video.sizeFormatted || '0 B';
    
    console.log(`Video ${index}:`, videoName, videoSize); // Debug
    
    videoItem.innerHTML = `
      <div class="video-thumbnail">
        ${thumbnailContent}
      </div>
      <div class="video-info">
        <div class="video-title" title="${videoName}">${videoName}</div>
        <div class="video-size">${videoSize}</div>
      </div>
    `;
    
    // For video thumbnails, seek to 1 second to get a frame
    if (video.type === 'video') {
      const videoThumb = videoItem.querySelector('.video-thumb-preview');
      const fallbackIcon = videoItem.querySelector('.video-fallback');
      
      if (videoThumb) {
        videoThumb.addEventListener('loadedmetadata', () => {
          videoThumb.currentTime = Math.min(1, videoThumb.duration * 0.1);
        });
        
        videoThumb.addEventListener('seeked', () => {
          // Hide fallback icon once video frame is loaded
          if (fallbackIcon) {
            fallbackIcon.style.display = 'none';
          }
        });
        
        videoThumb.addEventListener('error', () => {
          // Show fallback icon on error
          videoThumb.style.display = 'none';
          if (fallbackIcon) {
            fallbackIcon.style.display = 'flex';
          }
        });
      }
    }
    
    // Click to play
    videoItem.addEventListener('click', () => {
      playLocalVideo(video.path);
    });
    
    videoList.appendChild(videoItem);
  });
  
  console.log('Rendered HTML:', videoList.innerHTML.substring(0, 500)); // Debug first 500 chars
}

// Play local video file
function playLocalVideo(videoPath) {
  const placeholder = document.getElementById('playerPlaceholder');
  const video = document.getElementById('video');
  const fileName = videoPath.split('\\').pop();
  
  // Hide placeholder
  if (placeholder) {
    placeholder.style.display = 'none';
  }
  
  // Check if it's an audio file
  const audioExts = ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.m4a', '.wma'];
  const isAudio = audioExts.some(ext => videoPath.toLowerCase().endsWith(ext));
  
  if (isAudio) {
    // Play as audio with visualizer
    if (window.audioPlayer) {
      // Set playlist (all audio files)
      const audioFiles = filteredVideos.filter(v => v.type === 'audio');
      const currentIndex = audioFiles.findIndex(f => f.path === videoPath);
      window.audioPlayer.setPlaylist(audioFiles, currentIndex);
      window.audioPlayer.playAudioFile(videoPath, fileName);
    }
  } else {
    // Play as video with custom player
    if (window.videoPlayer) {
      window.videoPlayer.playVideo(videoPath, fileName);
    }
  }
  
  // Update status
  const statusEl = document.getElementById('status');
  if (statusEl) {
    statusEl.textContent = `Playing: ${fileName}`;
  }
}

// Filter videos
function filterVideos(type) {
  currentFilter = type;
  
  if (type === 'all') {
    filteredVideos = allVideos;
  } else if (type === 'videos') {
    filteredVideos = allVideos.filter(v => v.type === 'video');
  } else if (type === 'music') {
    filteredVideos = allVideos.filter(v => v.type === 'audio');
  }
  
  renderVideoList();
}

// Search videos
function searchVideos(query) {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) {
    filteredVideos = allVideos.filter(v => {
      if (currentFilter === 'all') return true;
      if (currentFilter === 'videos') return v.type === 'video';
      if (currentFilter === 'music') return v.type === 'audio';
      return true;
    });
  } else {
    filteredVideos = allVideos.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(searchTerm);
      const matchesFilter = 
        currentFilter === 'all' ||
        (currentFilter === 'videos' && v.type === 'video') ||
        (currentFilter === 'music' && v.type === 'audio');
      return matchesSearch && matchesFilter;
    });
  }
  
  renderVideoList();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMediaLibrary);
} else {
  initMediaLibrary();
}

// Export functions
window.mediaLibrary = {
  filterVideos,
  searchVideos,
  refresh: initMediaLibrary
};

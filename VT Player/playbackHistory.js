// Playback History Manager
let playbackHistory = [];
const MAX_HISTORY = 10;

// Load history from localStorage
function loadHistory() {
  try {
    const saved = localStorage.getItem('playbackHistory');
    if (saved) {
      playbackHistory = JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading history:', error);
  }
  renderHistory();
}

// Save history to localStorage
function saveHistory() {
  try {
    localStorage.setItem('playbackHistory', JSON.stringify(playbackHistory));
  } catch (error) {
    console.error('Error saving history:', error);
  }
}

// Add to history
function addToHistory(videoPath, videoName, currentTime, duration) {
  // Remove if already exists
  playbackHistory = playbackHistory.filter(item => item.path !== videoPath);
  
  // Add to beginning
  playbackHistory.unshift({
    path: videoPath,
    name: videoName,
    currentTime: currentTime,
    duration: duration,
    timestamp: Date.now(),
    progress: duration > 0 ? (currentTime / duration) * 100 : 0
  });
  
  // Keep only MAX_HISTORY items
  if (playbackHistory.length > MAX_HISTORY) {
    playbackHistory = playbackHistory.slice(0, MAX_HISTORY);
  }
  
  saveHistory();
  renderHistory();
}

// Get resume time for video
function getResumeTime(videoPath) {
  const item = playbackHistory.find(h => h.path === videoPath);
  return item ? item.currentTime : 0;
}

// Render history list
function renderHistory() {
  const historyList = document.getElementById('historyList');
  
  if (!historyList) return;
  
  if (playbackHistory.length === 0) {
    historyList.innerHTML = '<div class="no-history">No recent videos</div>';
    return;
  }
  
  historyList.innerHTML = '';
  
  playbackHistory.forEach(item => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    const timeAgo = getTimeAgo(item.timestamp);
    const progressText = item.progress > 5 ? `${Math.round(item.progress)}% watched` : 'Just started';
    
    historyItem.innerHTML = `
      <div class="history-thumb">
        <video preload="metadata" muted>
          <source src="file:///${item.path.replace(/\\/g, '/')}" type="video/mp4">
        </video>
      </div>
      <div class="history-info">
        <div class="history-title" title="${item.name}">${item.name}</div>
        <div class="history-meta">
          <span class="history-time">${timeAgo}</span>
          <span class="history-progress">${progressText}</span>
        </div>
      </div>
    `;
    
    // Seek thumbnail
    const videoThumb = historyItem.querySelector('video');
    if (videoThumb) {
      videoThumb.addEventListener('loadedmetadata', () => {
        videoThumb.currentTime = Math.min(item.currentTime || 1, videoThumb.duration * 0.1);
      });
    }
    
    // Click to resume
    historyItem.addEventListener('click', () => {
      if (window.videoPlayer) {
        window.videoPlayer.playVideo(item.path, item.name);
        // Resume from saved position after a short delay
        setTimeout(() => {
          const video = document.getElementById('video');
          if (video && item.currentTime > 5) {
            video.currentTime = item.currentTime;
          }
        }, 500);
      }
    });
    
    historyList.appendChild(historyItem);
  });
}

// Clear history
function clearHistory() {
  if (confirm('Clear all playback history?')) {
    playbackHistory = [];
    saveHistory();
    renderHistory();
  }
}

// Get time ago string
function getTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// Update playing info
function updatePlayingInfo(videoPath, videoName) {
  const infoFileName = document.getElementById('infoFileName');
  if (infoFileName) {
    infoFileName.textContent = videoName;
  }
  
  const video = document.getElementById('video');
  if (video) {
    video.addEventListener('loadedmetadata', () => {
      const infoDuration = document.getElementById('infoDuration');
      const infoResolution = document.getElementById('infoResolution');
      
      if (infoDuration) {
        infoDuration.textContent = formatTime(video.duration);
      }
      if (infoResolution) {
        infoResolution.textContent = `${video.videoWidth}x${video.videoHeight}`;
      }
    });
  }
  
  // Get file size (if available from video object)
  // This would need to be passed from the video scanner
}

// Take screenshot
function takeScreenshot() {
  const video = document.getElementById('video');
  if (!video || video.paused) {
    alert('No video playing');
    return;
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `screenshot_${Date.now()}.png`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Screenshot saved!');
  });
}

// Add to wishlist
function addCurrentToWishlist() {
  const btn = document.getElementById('addToWishlistBtn');
  const icon = btn?.querySelector('i');
  
  if (icon) {
    const isInWishlist = icon.classList.contains('fas');
    icon.className = isInWishlist ? 'far fa-star' : 'fas fa-star';
    btn.classList.toggle('active', !isInWishlist);
    
    showNotification(isInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist');
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function showNotification(message) {
  // Use existing notification system
  if (window.videoPlayer) {
    let notification = document.getElementById('videoNotification');
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'videoNotification';
      notification.className = 'video-notification';
      document.getElementById('videoContainer')?.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadHistory();
  
  // Button handlers
  document.getElementById('screenshotBtn')?.addEventListener('click', takeScreenshot);
  document.getElementById('addToWishlistBtn')?.addEventListener('click', addCurrentToWishlist);
  document.getElementById('clearHistoryBtn')?.addEventListener('click', clearHistory);
  
  // Track video progress
  const video = document.getElementById('video');
  if (video) {
    let saveInterval;
    
    video.addEventListener('play', () => {
      // Save progress every 10 seconds
      saveInterval = setInterval(() => {
        const videoPlayerContainer = document.getElementById('videoPlayerContainer');
        if (!videoPlayerContainer?.classList.contains('hidden') && window.currentVideoPath && window.currentVideoName) {
          addToHistory(window.currentVideoPath, window.currentVideoName, video.currentTime, video.duration);
        }
      }, 10000);
    });
    
    video.addEventListener('pause', () => {
      clearInterval(saveInterval);
    });
    
    video.addEventListener('ended', () => {
      clearInterval(saveInterval);
      // Mark as completed
      if (window.currentVideoPath && window.currentVideoName) {
        addToHistory(window.currentVideoPath, window.currentVideoName, video.duration, video.duration);
      }
    });
  }
});

window.playbackHistory = {
  addToHistory,
  getResumeTime,
  updatePlayingInfo
};

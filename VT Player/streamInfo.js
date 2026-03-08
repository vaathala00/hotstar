// Stream Info Panel - Real-time playback statistics

let statsUpdateInterval = null;
let currentStreamName = 'No stream playing';

// Initialize stream info panel
function initStreamInfo() {
  // Refresh stats button
  document.getElementById('refreshStatsBtn')?.addEventListener('click', updateStreamStats);
  
  // Start updating stats every 2 seconds
  startStatsUpdates();
}

// Start periodic stats updates
function startStatsUpdates() {
  if (statsUpdateInterval) {
    clearInterval(statsUpdateInterval);
  }
  
  statsUpdateInterval = setInterval(() => {
    updateStreamStats();
  }, 2000); // Update every 2 seconds
}

// Stop stats updates
function stopStatsUpdates() {
  if (statsUpdateInterval) {
    clearInterval(statsUpdateInterval);
    statsUpdateInterval = null;
  }
}

// Update stream statistics
function updateStreamStats() {
  const video = document.getElementById('video');
  
  if (!video) {
    console.warn('Stream Info: Video element not found');
    return;
  }
  
  // Check if video has a source (playing or loading)
  if (!video.src && !video.currentSrc) {
    // No video loaded
    setStreamInfo('streamName', 'No stream playing');
    setStreamInfo('streamResolution', '--');
    setStreamInfo('streamBitrate', '--');
    setStreamInfo('streamFps', '--');
    setStreamInfo('streamCodec', '--');
    setStreamInfo('streamBuffer', '--');
    setStreamInfo('streamNetwork', '--');
    setStreamInfo('streamDropped', '--');
    return;
  }
  
  // Stream name
  setStreamInfo('streamName', currentStreamName);
  
  console.log('Stream Info Update:', {
    videoSrc: video.src,
    paused: video.paused,
    width: video.videoWidth,
    height: video.videoHeight,
    currentTime: video.currentTime,
    duration: video.duration,
    hasShakaPlayer: !!window.shakaPlayer
  });
  
  // Resolution
  if (video.videoWidth && video.videoHeight) {
    const resolution = `${video.videoWidth}x${video.videoHeight}`;
    setStreamInfo('streamResolution', resolution);
  } else {
    setStreamInfo('streamResolution', 'Loading...');
  }
  
  // Get Shaka Player stats if available
  if (window.shakaPlayer) {
    try {
      const stats = window.shakaPlayer.getStats();
      
      // Bitrate (convert to Mbps)
      if (stats.estimatedBandwidth) {
        const mbps = (stats.estimatedBandwidth / 1000000).toFixed(2);
        setStreamInfo('streamBitrate', `${mbps} Mbps`, mbps > 5 ? 'good' : mbps > 2 ? 'warning' : 'error');
      }
      
      // FPS
      if (video.getVideoPlaybackQuality) {
        const quality = video.getVideoPlaybackQuality();
        const fps = calculateFPS(quality);
        if (fps) {
          setStreamInfo('streamFps', `${fps} fps`, fps >= 24 ? 'good' : 'warning');
        }
      }
      
      // Codec
      const variant = window.shakaPlayer.getVariantTracks().find(t => t.active);
      if (variant) {
        const codec = variant.videoCodec || 'Unknown';
        setStreamInfo('streamCodec', codec.split('.')[0].toUpperCase());
      }
      
      // Buffer health
      const buffered = video.buffered;
      if (buffered.length > 0) {
        const bufferEnd = buffered.end(buffered.length - 1);
        const bufferAhead = bufferEnd - video.currentTime;
        const bufferSeconds = bufferAhead.toFixed(1);
        setStreamInfo('streamBuffer', `${bufferSeconds}s`, bufferAhead > 5 ? 'good' : bufferAhead > 2 ? 'warning' : 'error');
      }
      
      // Network state
      const networkState = getNetworkState(video.networkState);
      setStreamInfo('streamNetwork', networkState.text, networkState.class);
      
      // Dropped frames
      if (video.getVideoPlaybackQuality) {
        const quality = video.getVideoPlaybackQuality();
        const dropped = quality.droppedVideoFrames || 0;
        const total = quality.totalVideoFrames || 0;
        const dropRate = total > 0 ? ((dropped / total) * 100).toFixed(1) : 0;
        setStreamInfo('streamDropped', `${dropped} (${dropRate}%)`, dropRate < 1 ? 'good' : dropRate < 5 ? 'warning' : 'error');
      }
      
    } catch (error) {
      console.error('Error getting Shaka stats:', error);
    }
  } else {
    // Fallback for non-Shaka playback
    setStreamInfo('streamBitrate', 'N/A');
    setStreamInfo('streamCodec', 'Native');
    
    // Buffer
    const buffered = video.buffered;
    if (buffered.length > 0) {
      const bufferEnd = buffered.end(buffered.length - 1);
      const bufferAhead = bufferEnd - video.currentTime;
      setStreamInfo('streamBuffer', `${bufferAhead.toFixed(1)}s`);
    }
    
    // Network state
    const networkState = getNetworkState(video.networkState);
    setStreamInfo('streamNetwork', networkState.text, networkState.class);
  }
}

// Calculate FPS from video quality metrics
let lastFrameCount = 0;
let lastFrameTime = Date.now();

function calculateFPS(quality) {
  const currentFrames = quality.totalVideoFrames;
  const currentTime = Date.now();
  
  if (lastFrameCount > 0) {
    const framesDiff = currentFrames - lastFrameCount;
    const timeDiff = (currentTime - lastFrameTime) / 1000; // Convert to seconds
    
    if (timeDiff > 0) {
      const fps = Math.round(framesDiff / timeDiff);
      lastFrameCount = currentFrames;
      lastFrameTime = currentTime;
      return fps;
    }
  }
  
  lastFrameCount = currentFrames;
  lastFrameTime = currentTime;
  return null;
}

// Get network state description
function getNetworkState(state) {
  switch (state) {
    case 0: // NETWORK_EMPTY
      return { text: 'Empty', class: 'error' };
    case 1: // NETWORK_IDLE
      return { text: 'Idle', class: 'good' };
    case 2: // NETWORK_LOADING
      return { text: 'Loading', class: 'warning' };
    case 3: // NETWORK_NO_SOURCE
      return { text: 'No Source', class: 'error' };
    default:
      return { text: 'Unknown', class: '' };
  }
}

// Set stream info value
function setStreamInfo(elementId, value, className = '') {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = value;
    element.className = 'info-value';
    if (className) {
      element.classList.add(className);
    }
  }
}

// Set current stream name
function setStreamName(name) {
  currentStreamName = name || 'Unknown Stream';
  setStreamInfo('streamName', currentStreamName);
}

// Reset all stats
function resetStreamStats() {
  currentStreamName = 'No stream playing';
  lastFrameCount = 0;
  lastFrameTime = Date.now();
  updateStreamStats();
}

// Export functions
window.streamInfo = {
  init: initStreamInfo,
  update: updateStreamStats,
  setName: setStreamName,
  reset: resetStreamStats,
  start: startStatsUpdates,
  stop: stopStatsUpdates
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initStreamInfo();
});

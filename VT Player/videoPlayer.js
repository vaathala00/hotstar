// Custom Video Player Controller

// Initialize window.videoPlayer object immediately so it's always available
window.videoPlayer = window.videoPlayer || {};
console.log('✓ Video Player object initialized');

let currentVideoTitle = '';
let brightness = 100;
let isInWishlist = false;
let audioContext = null;
let gainNode = null;
let mediaSource = null;
let currentVolume = 100; // 0-200%

// Helper function to convert base64url to hex
function base64ToHex(base64url) {
  // Convert base64url to base64
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  
  // Add padding if needed
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  
  // Decode base64 to binary
  const binary = atob(base64);
  
  // Convert binary to hex
  let hex = '';
  for (let i = 0; i < binary.length; i++) {
    const byte = binary.charCodeAt(i).toString(16).padStart(2, '0');
    hex += byte;
  }
  
  return hex;
}

// Initialize Web Audio API for volume boost
function initAudioContext(video) {
  if (audioContext) return; // Already initialized
  
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    mediaSource = audioContext.createMediaElementSource(video);
    gainNode = audioContext.createGain();
    
    // Connect: video -> gain -> speakers
    mediaSource.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Set initial gain (1.0 = 100%)
    gainNode.gain.value = 1.0;
    
    console.log('✓ Web Audio API initialized for volume boost');
  } catch (error) {
    console.error('Failed to initialize Web Audio API:', error);
  }
}

// Set volume (0-200%)
function setVolume(percent) {
  const video = document.getElementById('video');
  currentVolume = Math.max(0, Math.min(200, percent));
  
  if (gainNode) {
    // Use gain node for volume boost (0-200% -> 0.0-2.0)
    gainNode.gain.value = currentVolume / 100;
    // Keep video element at max volume
    video.volume = 1.0;
  } else {
    // Fallback to native volume (0-100% only)
    video.volume = Math.min(currentVolume, 100) / 100;
  }
  
  updateVolumeSlider();
  updateVideoVolumeIcon();
}

// Update video filters (Contrast & Saturation)
function updateVideoFilters() {
  const video = document.getElementById('video');
  const contrastSlider = document.getElementById('contrastSlider');
  const saturationSlider = document.getElementById('saturationSlider');
  const contrastValue = document.getElementById('contrastValue');
  const saturationValue = document.getElementById('saturationValue');
  
  if (!video || !contrastSlider || !saturationSlider) return;
  
  const contrast = parseInt(contrastSlider.value);
  const saturation = parseInt(saturationSlider.value);
  
  // Update value displays
  if (contrastValue) contrastValue.textContent = `${contrast}%`;
  if (saturationValue) saturationValue.textContent = `${saturation}%`;
  
  // Apply CSS filters to video element
  // Combine with existing brightness filter
  video.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
  
  // Save settings to localStorage
  try {
    localStorage.setItem('videoContrast', contrast.toString());
    localStorage.setItem('videoSaturation', saturation.toString());
  } catch (error) {
    console.error('Failed to save video adjustment settings:', error);
  }
}

// Load saved video adjustment settings
function loadVideoAdjustments() {
  try {
    const savedContrast = localStorage.getItem('videoContrast');
    const savedSaturation = localStorage.getItem('videoSaturation');
    
    const contrastSlider = document.getElementById('contrastSlider');
    const saturationSlider = document.getElementById('saturationSlider');
    
    if (savedContrast && contrastSlider) {
      contrastSlider.value = savedContrast;
    }
    
    if (savedSaturation && saturationSlider) {
      saturationSlider.value = savedSaturation;
    }
    
    // Apply the loaded settings
    updateVideoFilters();
  } catch (error) {
    console.error('Failed to load video adjustment settings:', error);
  }
}

// Reset contrast to 100%
function resetContrast() {
  const contrastSlider = document.getElementById('contrastSlider');
  if (contrastSlider) {
    contrastSlider.value = 100;
    updateVideoFilters();
    showVideoNotification('Contrast Reset to 100%');
  }
}

// Reset saturation to 100%
function resetSaturation() {
  const saturationSlider = document.getElementById('saturationSlider');
  if (saturationSlider) {
    saturationSlider.value = 100;
    updateVideoFilters();
    showVideoNotification('Saturation Reset to 100%');
  }
}

// Initialize video player
function initVideoPlayer() {
  const video = document.getElementById('video');
  const videoContainer = document.getElementById('videoContainer');
  
  // Initialize Web Audio API for volume boost
  video.addEventListener('loadedmetadata', () => {
    initAudioContext(video);
  }, { once: false });
  
  // Control buttons
  document.getElementById('videoPlayPauseBtn')?.addEventListener('click', toggleVideoPlayPause);
  document.getElementById('videoPrevBtn')?.addEventListener('click', playPreviousVideo);
  document.getElementById('videoNextBtn')?.addEventListener('click', playNextVideo);
  document.getElementById('videoMuteBtn')?.addEventListener('click', toggleVideoMute);
  document.getElementById('videoPipBtn')?.addEventListener('click', togglePIP);
  document.getElementById('videoFullscreenBtn')?.addEventListener('click', toggleFullscreen);
  document.getElementById('videoAspectBtn')?.addEventListener('click', cycleAspectRatio);
  document.getElementById('videoWishlistBtn')?.addEventListener('click', toggleWishlist);
  
  // Volume slider
  const volumeSlider = document.getElementById('videoVolumeSlider');
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      setVolume(parseInt(e.target.value));
    });
    
    // Click on volume button to show/hide slider
    document.getElementById('videoMuteBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const volumeControl = document.querySelector('.video-volume-control');
      volumeControl?.classList.toggle('show');
    });
  }
  
  // Video adjustment sliders (Contrast & Saturation)
  const contrastSlider = document.getElementById('contrastSlider');
  const saturationSlider = document.getElementById('saturationSlider');
  
  if (contrastSlider) {
    contrastSlider.addEventListener('input', (e) => {
      updateVideoFilters();
    });
  }
  
  if (saturationSlider) {
    saturationSlider.addEventListener('input', (e) => {
      updateVideoFilters();
    });
  }
  
  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyPress);
  
  // Dropdowns
  document.getElementById('videoSpeedBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown('speedDropdown');
  });
  document.getElementById('videoAudioBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown('audioDropdown');
  });
  document.getElementById('videoQualityBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown('qualityDropdown');
  });
  document.getElementById('videoCcBtn')?.addEventListener('click', toggleCC);
  
  // Speed options
  document.querySelectorAll('.speed-option').forEach(option => {
    option.addEventListener('click', () => {
      const speed = parseFloat(option.dataset.speed);
      video.playbackRate = speed;
      document.querySelectorAll('.speed-option').forEach(o => o.classList.remove('active'));
      option.classList.add('active');
      closeAllDropdowns();
    });
  });
  
  // Seek bar
  const videoSeekBar = document.querySelector('.video-seek-bar');
  videoSeekBar?.addEventListener('click', handleVideoSeek);
  
  // Mouse wheel for brightness/volume
  videoContainer?.addEventListener('wheel', handleMouseWheel, { passive: false });
  
  // Video events
  video.addEventListener('timeupdate', updateVideoProgress);
  video.addEventListener('play', () => updateVideoPlayPauseButton(true));
  video.addEventListener('pause', () => updateVideoPlayPauseButton(false));
  video.addEventListener('volumechange', updateVideoVolumeIcon);
  
  // Click on time display to go to live
  document.getElementById('videoCurrentTime')?.addEventListener('click', goToLive);
  
  // Hide controls on mouse idle
  let controlsTimeout;
  videoContainer?.addEventListener('mousemove', () => {
    showVideoControls();
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(hideVideoControls, 3000);
  });
  
  videoContainer?.addEventListener('mouseleave', hideVideoControls);
  
  // Click to play/pause
  video.addEventListener('click', toggleVideoPlayPause);
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', closeAllDropdowns);
  
  // Load saved video adjustment settings
  loadVideoAdjustments();
}

// Handle keyboard shortcuts
function handleKeyPress(e) {
  // Check if user is typing in an input field or textarea FIRST
  const activeElement = document.activeElement;
  const isInputFocused = activeElement && (
    activeElement.tagName === 'INPUT' ||
    activeElement.tagName === 'TEXTAREA' ||
    activeElement.isContentEditable
  );
  
  // If input is focused, don't handle ANY video shortcuts - let the input work normally
  if (isInputFocused) {
    console.log('Input focused, ignoring video shortcuts');
    return; // Exit immediately, don't preventDefault
  }
  
  const videoPlayerContainer = document.getElementById('videoPlayerContainer');
  
  // Only handle shortcuts when video player is visible
  if (videoPlayerContainer?.classList.contains('hidden')) {
    return;
  }
  
  // Handle Ctrl+C+R to reset contrast
  if (e.ctrlKey && e.key.toLowerCase() === 'c') {
    e.preventDefault();
    // Wait for 'r' key
    const resetContrastHandler = (event) => {
      if (event.key.toLowerCase() === 'r') {
        event.preventDefault();
        resetContrast();
        document.removeEventListener('keydown', resetContrastHandler);
      } else {
        document.removeEventListener('keydown', resetContrastHandler);
      }
    };
    document.addEventListener('keydown', resetContrastHandler);
    return;
  }
  
  // Handle Ctrl+S+R to reset saturation
  if (e.ctrlKey && e.key.toLowerCase() === 's') {
    e.preventDefault();
    // Wait for 'r' key
    const resetSaturationHandler = (event) => {
      if (event.key.toLowerCase() === 'r') {
        event.preventDefault();
        resetSaturation();
        document.removeEventListener('keydown', resetSaturationHandler);
      } else {
        document.removeEventListener('keydown', resetSaturationHandler);
      }
    };
    document.addEventListener('keydown', resetSaturationHandler);
    return;
  }
  
  // Now handle video shortcuts
  switch(e.key.toLowerCase()) {
    case ' ':
    case 'spacebar':
      e.preventDefault();
      toggleVideoPlayPause();
      break;
    case 'm':
      e.preventDefault();
      toggleVideoMute();
      break;
    case 'f':
      e.preventDefault();
      toggleFullscreen();
      break;
    case 'escape':
      if (document.fullscreenElement) {
        e.preventDefault();
        document.exitFullscreen();
      }
      break;
    case 'arrowleft':
      e.preventDefault();
      seekVideo(-5); // Seek backward 5 seconds
      break;
    case 'arrowright':
      e.preventDefault();
      seekVideo(5); // Seek forward 5 seconds
      break;
    case 'arrowup':
      e.preventDefault();
      changeVolume(0.1); // Increase volume
      break;
    case 'arrowdown':
      e.preventDefault();
      changeVolume(-0.1); // Decrease volume
      break;
  }
}

// Seek video
function seekVideo(seconds) {
  const video = document.getElementById('video');
  video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
}

// Change volume
function changeVolume(delta) {
  const newVolume = currentVolume + (delta * 100);
  setVolume(newVolume);
  showVolumeBar();
}

// Toggle dropdown
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  const isVisible = dropdown.style.display === 'block';
  closeAllDropdowns();
  if (!isVisible) {
    dropdown.style.display = 'block';
  }
}

function closeAllDropdowns() {
  document.querySelectorAll('.video-dropdown').forEach(d => d.style.display = 'none');
}

// Show/hide controls
function showVideoControls() {
  const overlay = document.querySelector('.video-controls-overlay');
  const container = document.getElementById('videoContainer');
  overlay?.classList.remove('hidden');
  container?.classList.remove('hide-cursor');
}

function hideVideoControls() {
  const video = document.getElementById('video');
  const overlay = document.querySelector('.video-controls-overlay');
  const container = document.getElementById('videoContainer');
  
  if (!video.paused) {
    overlay?.classList.add('hidden');
    container?.classList.add('hide-cursor');
  }
}

// Play video
async function playVideo(videoPath, videoTitle) {
  const video = document.getElementById('video');
  const placeholder = document.getElementById('playerPlaceholder');
  const videoPlayerContainer = document.getElementById('videoPlayerContainer');
  
  // Prevent multiple simultaneous loads
  if (window.videoLoading) {
    console.warn('Video already loading, ignoring duplicate request');
    return;
  }
  
  window.videoLoading = true;
  
  currentVideoTitle = videoTitle;
  window.currentVideoPath = videoPath;
  window.currentVideoName = videoTitle;
  
  // Hide placeholder and audio player
  if (placeholder) placeholder.style.display = 'none';
  if (window.audioPlayer) window.audioPlayer.showAudioPlayer(false);
  
  // Show video player
  videoPlayerContainer?.classList.remove('hidden');
  
  // Load video - check if it's a URL or local file
  if (videoPath.startsWith('http://') || videoPath.startsWith('https://')) {
    // For URLs, use playVideoWithConfig for better streaming support
    playVideoWithConfig(videoPath, videoTitle, {});
  } else {
    // For local files, destroy Shaka Player if it exists and use native video element
    if (window.shakaPlayer) {
      try {
        await window.shakaPlayer.destroy();
        window.shakaPlayer = null;
        console.log('✓ Shaka Player destroyed for local playback');
      } catch (error) {
        console.error('Error destroying Shaka Player:', error);
        window.shakaPlayer = null;
      }
    }
    
    // Clear any stream headers
    if (window.electronAPI && window.electronAPI.clearStreamHeaders) {
      await window.electronAPI.clearStreamHeaders();
    }
    
    // Use native video element for local files
    video.src = `file:///${videoPath.replace(/\\/g, '/')}`;
    video.load();
    
    video.play().then(() => {
      window.videoLoading = false;
    }).catch(error => {
      console.error('Playback error:', error);
      window.videoLoading = false;
    });
  }
  
  // Update title
  document.getElementById('videoTitle').textContent = videoTitle;
  
  // Reset brightness and apply saved adjustments
  brightness = 100;
  updateVideoFilters();
  
  // Initialize volume to 100% if not set
  if (currentVolume === 100 && !gainNode) {
    setVolume(100);
  }
  updateVolumeSlider();
  
  // Update playing info
  if (window.playbackHistory) {
    window.playbackHistory.updatePlayingInfo(videoPath, videoTitle);
  }
}

// Play video with custom configuration (for streams)
async function playVideoWithConfig(url, title, config = {}) {
  const video = document.getElementById('video');
  const placeholder = document.getElementById('playerPlaceholder');
  const videoPlayerContainer = document.getElementById('videoPlayerContainer');
  
  // Cancel any previous loading
  window.videoLoading = false;
  
  // Pause current video first
  if (!video.paused) {
    video.pause();
  }
  
  currentVideoTitle = title;
  window.currentVideoPath = url;
  window.currentVideoName = title;
  
  // Set stream name in info panel
  if (window.streamInfo) {
    window.streamInfo.setName(title);
  }
  
  // Hide placeholder and audio player
  if (placeholder) placeholder.style.display = 'none';
  if (window.audioPlayer) window.audioPlayer.showAudioPlayer(false);
  
  // Show video player
  videoPlayerContainer?.classList.remove('hidden');
  
  // Update title
  document.getElementById('videoTitle').textContent = title;
  
  // Reset brightness and apply saved adjustments
  brightness = 100;
  updateVideoFilters();
  
  // Initialize volume
  if (!gainNode) {
    setVolume(currentVolume);
  }
  updateVolumeSlider();
  
  // Trigger stats update when video starts playing
  const onPlaying = () => {
    if (window.streamInfo) {
      window.streamInfo.update();
    }
    video.removeEventListener('playing', onPlaying);
  };
  video.addEventListener('playing', onPlaying);
  
  // Also clear loading flag on error
  const onError = () => {
    video.removeEventListener('error', onError);
  };
  video.addEventListener('error', onError, { once: true });
  
  // Check if Shaka Player is available and if we need advanced features
  const needsShaka = config.drmScheme !== 'none' || 
                     url.includes('.m3u8') || 
                     url.includes('.mpd') ||
                     config.referer ||
                     config.cookies ||
                     config.userAgent;
  
  if (window.shaka && needsShaka) {
    loadWithShaka(url, config);
  } else {
    // Simple video element playback for direct video files (mp4, mkv, etc.)
    video.src = url;
    video.load();
    video.play().then(() => {
      console.log('✓ Video playback started');
    }).catch(error => {
      console.error('Playback error:', error);
      // Don't show notification for "interrupted" errors as they're expected during channel switching
      if (!error.message.includes('interrupted')) {
        showVideoNotification('Failed to play video');
      }
    });
  }
}

// Load stream with Shaka Player
async function loadWithShaka(url, config) {
  const video = document.getElementById('video');
  
  // Check if mux.js is loaded
  if (typeof muxjs === 'undefined') {
    console.warn('⚠ mux.js is not loaded! MPEG-TS transmuxing will not work.');
    console.warn('Please run: npm install');
  } else {
    console.log('✓ mux.js is loaded and available');
  }
  
  // Allow rapid channel switching - cancel previous load if any
  if (window.shakaPlayerLoading) {
    console.log('Cancelling previous load for rapid channel switch');
  }
  
  window.shakaPlayerLoading = true;
  
  try {
    console.log('=== Loading Stream ===');
    console.log('URL:', url);
    console.log('Config:', config);
    
    // Set headers via Electron main process for proper injection
    if (window.electronAPI && window.electronAPI.setStreamHeaders) {
      await window.electronAPI.setStreamHeaders({
        userAgent: config.userAgent || 'plaYtv/7.1.5 (Linux;Android 13) ExoPlayerLib/2.11.6',
        referer: config.referer || '',
        origin: config.origin || '',
        cookie: config.cookies || ''
      });
      console.log('✓ Stream headers set via Electron API');
    }
    
    // Reset video element completely
    video.pause();
    video.removeAttribute('src');
    video.load();
    
    // Destroy existing player if any
    if (window.shakaPlayer) {
      try {
        await window.shakaPlayer.destroy();
        console.log('✓ Previous Shaka Player destroyed');
      } catch (e) {
        console.warn('Error destroying previous player:', e);
      }
      window.shakaPlayer = null;
    }
    
    // Wait longer for cleanup to complete
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Create new Shaka Player instance
    window.shakaPlayer = new shaka.Player();
    await window.shakaPlayer.attach(video);
    console.log('✓ Shaka Player attached to video element');
    
    // Check if transmuxer is available
    if (shaka.transmuxer && shaka.transmuxer.TransmuxerEngine) {
      console.log('✓ Transmuxer engine available');
    } else {
      console.warn('⚠ Transmuxer engine not available - TS streams may not work');
    }
    
    // Error handling
    window.shakaPlayer.addEventListener('error', (event) => {
      console.error('Shaka Player error:', event.detail);
      showVideoNotification('Playback error: ' + (event.detail.message || 'Unknown error'));
    });
    
    // Add event listener for manifest parsed
    window.shakaPlayer.addEventListener('manifestparsed', () => {
      console.log('✓ Manifest parsed successfully');
      const tracks = window.shakaPlayer.getVariantTracks();
      console.log('Available tracks:', tracks.length);
      if (tracks.length > 0) {
        console.log('Sample track:', {
          id: tracks[0].id,
          bandwidth: tracks[0].bandwidth,
          width: tracks[0].width,
          height: tracks[0].height,
          videoCodec: tracks[0].videoCodec,
          audioCodec: tracks[0].audioCodec,
          mimeType: tracks[0].mimeType,
          codecs: tracks[0].codecs
        });
        
        // Check if transmuxing is needed
        if (tracks[0].mimeType && tracks[0].mimeType.includes('mp2t')) {
          console.log('⚠ MPEG-TS detected, transmuxing required');
        }
      }
      
      // Log all available tracks
      tracks.forEach((track, index) => {
        console.log(`Track ${index}:`, {
          videoCodec: track.videoCodec,
          audioCodec: track.audioCodec,
          mimeType: track.mimeType
        });
        
        // Check for unsupported audio codecs
        if (track.audioCodec && (track.audioCodec.includes('ac-3') || track.audioCodec.includes('ec-3') || track.audioCodec.includes('eac3'))) {
          console.warn(`⚠ Unsupported audio codec detected: ${track.audioCodec}`);
          console.warn('AC-3/E-AC-3 (Dolby Digital) is not supported in browsers');
          console.warn('Attempting to play video-only...');
        }
      });
      
      // Check if stream requires DRM but we don't have keys
      const drmInfo = window.shakaPlayer.drmInfo();
      if (drmInfo && (!config.drmScheme || config.drmScheme === 'none')) {
        console.warn('⚠ Stream requires DRM but no DRM configuration provided');
        console.warn('DRM Info:', drmInfo);
      }
    });
    
    // Add event listener for streaming events
    window.shakaPlayer.addEventListener('streaming', (event) => {
      console.log('Streaming event:', event.type);
    });
    
    // Configure Shaka Player for optimal streaming
    const shakaConfig = {
      streaming: {
        bufferingGoal: 10,
        rebufferingGoal: 2,
        bufferBehind: 10,
        retryParameters: {
          timeout: 45000,
          maxAttempts: 10,
          baseDelay: 2000,
          backoffFactor: 2,
          fuzzFactor: 0.5
        },
        alwaysStreamText: false,
        ignoreTextStreamFailures: true,
        startAtSegmentBoundary: false,
        durationBackoff: 1,
        safeSeekOffset: 5,
        stallEnabled: true,
        stallThreshold: 1,
        stallSkip: 0.1,
        gapDetectionThreshold: 0.5,
        failureCallback: (error) => {
          console.error('Streaming failure callback:', error);
        }
      },
      manifest: {
        retryParameters: {
          timeout: 45000,
          maxAttempts: 10,
          baseDelay: 2000,
          backoffFactor: 2,
          fuzzFactor: 0.5
        },
        availabilityWindowOverride: 300,
        dash: {
          ignoreMinBufferTime: true,
          autoCorrectDrift: true
        },
        hls: {
          // Ignore text stream failures for better compatibility
          ignoreTextStreamFailures: true,
          ignoreImageStreamFailures: true,
          // Ignore unsupported codecs like AC-3
          ignoreManifestProgramDateTime: false,
          // Use audio codec preferences
          useFullSegmentsForStartTime: false
        }
      },
      mediaSource: {
        // Force transmuxing for MPEG-TS segments in HLS streams
        forceTransmux: true,
        // Add codec preferences for better compatibility
        codecSwitchingStrategy: 'smooth',
        // Ensure SourceBuffer is created with correct MIME type
        sourceBufferEmsgLimit: Infinity
      },
      preferredAudioCodecs: [
        // Prefer AAC over AC-3 (browsers don't support AC-3)
        'mp4a.40.2',  // AAC-LC
        'mp4a.40.5',  // AAC-HE
        'mp4a.40.29', // AAC-HEv2
        'mp4a.67',    // AAC-ELD
        'mp4a.69',    // MP3
        'opus'        // Opus
      ],
      // Allow playback even if audio codec is not supported
      restrictions: {
        minWidth: 0,
        maxWidth: Infinity,
        minHeight: 0,
        maxHeight: Infinity,
        minPixels: 0,
        maxPixels: Infinity,
        minFrameRate: 0,
        maxFrameRate: Infinity,
        minBandwidth: 0,
        maxBandwidth: Infinity
      },
      abr: {
        enabled: true,
        defaultBandwidthEstimate: 5000000,
        switchInterval: 8,
        bandwidthUpgradeTarget: 0.85,
        bandwidthDowngradeTarget: 0.95
      },
      drm: {
        retryParameters: {
          timeout: 45000,
          maxAttempts: 10,
          baseDelay: 2000,
          backoffFactor: 2,
          fuzzFactor: 0.5
        }
      }
    };
    
    // Configure DRM if needed
    if (config.drmScheme && config.drmScheme !== 'none') {
      if (config.drmScheme === 'clearkey') {
        // Check if we have a license URL (could be in drmUrl or key field)
        let licenseUrl = config.drmUrl;
        
        // Sometimes the license URL is in the 'key' field (from KODIPROP parsing)
        if (!licenseUrl && config.key && (config.key.startsWith('http://') || config.key.startsWith('https://'))) {
          licenseUrl = config.key;
          console.log('License URL found in key field:', licenseUrl);
        }
        
        if (licenseUrl) {
          // ClearKey with license server - fetch keys and provide them directly
          console.log('✓ Fetching ClearKey keys from license server:', licenseUrl);
          
          try {
            // Fetch the keys from the license server
            const licenseResponse = await fetch(licenseUrl);
            const licenseData = await licenseResponse.json();
            console.log('License data:', licenseData);
            
            // Parse the ClearKey response format: {"keys":[{"kty":"oct","kid":"base64","k":"base64"}]}
            if (licenseData.keys && licenseData.keys.length > 0) {
              const clearKeys = {};
              
              licenseData.keys.forEach(keyObj => {
                // Convert base64url to hex
                const kid = base64ToHex(keyObj.kid);
                const k = base64ToHex(keyObj.k);
                clearKeys[kid] = k;
                console.log('Extracted key - KID:', kid, 'Key:', k);
              });
              
              shakaConfig.drm = {
                clearKeys: clearKeys
              };
              console.log('✓ ClearKey DRM configured with fetched keys');
            } else {
              throw new Error('Invalid license response format');
            }
          } catch (error) {
            console.error('Failed to fetch license keys:', error);
            // Fallback to license server mode
            console.log('Falling back to license server mode');
            shakaConfig.drm = {
              servers: {
                'org.w3.clearkey': licenseUrl
              }
            };
          }
        } else if (config.keyId && config.key) {
          // ClearKey DRM with direct key ID and key (hex format)
          // Remove hyphens and ensure lowercase
          const keyId = config.keyId.replace(/-/g, '').toLowerCase();
          const key = config.key.replace(/-/g, '').toLowerCase();
          
          // Ensure keys are valid hex strings
          if (!/^[0-9a-f]+$/.test(keyId) || !/^[0-9a-f]+$/.test(key)) {
            console.error('Invalid ClearKey format - keys must be hex strings');
            console.error('KeyID:', config.keyId, '→', keyId);
            console.error('Key:', config.key, '→', key);
            throw new Error('Invalid ClearKey keys');
          }
          
          shakaConfig.drm = {
            clearKeys: {}
          };
          shakaConfig.drm.clearKeys[keyId] = key;
          console.log('✓ ClearKey DRM configured with direct keys');
          console.log('  KeyID:', keyId);
          console.log('  Key:', key);
        } else {
          console.warn('ClearKey DRM specified but no keys or license URL provided');
        }
      } else if (config.drmUrl) {
        // Other DRM schemes with license server
        shakaConfig.drm = {
          servers: {}
        };
        
        if (config.drmScheme === 'widevine') {
          shakaConfig.drm.servers['com.widevine.alpha'] = config.drmUrl;
        } else if (config.drmScheme === 'playready') {
          shakaConfig.drm.servers['com.microsoft.playready'] = config.drmUrl;
        } else if (config.drmScheme === 'clearkey') {
          shakaConfig.drm.servers['org.w3.clearkey'] = config.drmUrl;
        }
        console.log('✓ DRM server configured:', config.drmScheme);
      }
    }
    
    window.shakaPlayer.configure(shakaConfig);
    console.log('✓ Shaka Player configured');
    
    // Add network request filter to modify requests
    window.shakaPlayer.getNetworkingEngine().registerRequestFilter((type, request) => {
      const typeNames = {
        0: 'MANIFEST',
        1: 'SEGMENT',
        2: 'LICENSE',
        3: 'APP',
        4: 'TIMING'
      };
      
      // Add custom headers to all requests
      if (config.userAgent) {
        request.headers['User-Agent'] = config.userAgent;
      }
      if (config.referer) {
        request.headers['Referer'] = config.referer;
      }
      if (config.origin) {
        request.headers['Origin'] = config.origin;
      }
      if (config.cookies) {
        request.headers['Cookie'] = config.cookies;
        
        // For Hotstar streams, append hdntl token to URLs (without encoding)
        if (config.cookies.includes('hdntl=')) {
          const hdntlMatch = config.cookies.match(/hdntl=([^;]+)/);
          if (hdntlMatch) {
            const hdntlToken = hdntlMatch[1];
            // Append token to manifest and segment URLs if not already present
            // Don't URL-encode the token - use it as-is like ExoPlayer does
            if ((type === 0 || type === 1) && !request.uris[0].includes('hdntl=')) { // MANIFEST or SEGMENT
              const separator = request.uris[0].includes('?') ? '&' : '?';
              request.uris[0] = request.uris[0] + separator + 'hdntl=' + hdntlToken;
              console.log('Added hdntl token to', typeNames[type], 'URL');
            }
          }
        }
      }
      
      // Force GET method instead of HEAD for manifest requests
      if (type === shaka.net.NetworkingEngine.RequestType.MANIFEST) {
        request.method = 'GET';
      }
      
      console.log('Request filter:', typeNames[type] || type, request.uris[0].substring(0, 100) + '...', request.method);
      
      // Log license requests specifically
      if (type === 2) { // LICENSE
        console.log('License request headers:', request.headers);
        console.log('License request body:', request.body);
      }
    });
    
    // Add response filter to log responses and fix relative URLs
    window.shakaPlayer.getNetworkingEngine().registerResponseFilter((type, response) => {
      const typeNames = {
        0: 'MANIFEST',
        1: 'SEGMENT',
        2: 'LICENSE',
        3: 'APP',
        4: 'TIMING'
      };
      console.log('Response filter:', typeNames[type] || type, response.uri, 'Status:', response.status);
      if (response.status !== 200) {
        console.error('Non-200 response:', response.status, response.data);
      }
      
      // Log manifest content for debugging
      if (type === 0) { // MANIFEST
        try {
          const text = new TextDecoder().decode(response.data);
          console.log('Manifest content (first 500 chars):', text.substring(0, 500));
          
          // Check if manifest contains ContentProtection
          if (text.includes('ContentProtection')) {
            console.log('✓ Manifest contains ContentProtection (DRM)');
          } else {
            console.warn('⚠ Manifest does NOT contain ContentProtection');
          }
          
          // Fix relative URLs in HLS manifests
          // Many servers use relative segment paths that need to be resolved
          if (text.includes('#EXTM3U')) {
            console.log('Detected HLS manifest, checking for relative URLs...');
            
            // Extract the base URL from the manifest URL
            const manifestUrl = new URL(response.uri);
            const basePath = manifestUrl.pathname.substring(0, manifestUrl.pathname.lastIndexOf('/'));
            const baseUrl = `${manifestUrl.protocol}//${manifestUrl.host}${basePath}`;
            
            console.log('Manifest URL:', response.uri);
            console.log('Base URL for segments:', baseUrl);
            
            // Check if manifest has relative URLs
            const hasRelativeUrls = text.split('\n').some(line => {
              const trimmed = line.trim();
              return trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('http://') && !trimmed.startsWith('https://');
            });
            
            if (hasRelativeUrls) {
              console.log('Found relative URLs, fixing...');
              
              // Replace relative URLs with absolute URLs
              const lines = text.split('\n');
              const fixedLines = lines.map(line => {
                const trimmed = line.trim();
                
                // Check if line is a segment URL (not a comment or tag)
                if (trimmed && !trimmed.startsWith('#')) {
                  // If it's already absolute, leave it
                  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
                    return line;
                  }
                  // If it's a relative URL (starts with /)
                  else if (trimmed.startsWith('/')) {
                    const absoluteUrl = `${manifestUrl.protocol}//${manifestUrl.host}${trimmed}`;
                    console.log('Fixed URL:', trimmed.substring(0, 80) + '...', '→', absoluteUrl.substring(0, 80) + '...');
                    return absoluteUrl;
                  }
                  // If it's a relative path without leading slash
                  else {
                    const absoluteUrl = `${baseUrl}/${trimmed}`;
                    console.log('Fixed URL:', trimmed.substring(0, 80) + '...', '→', absoluteUrl.substring(0, 80) + '...');
                    return absoluteUrl;
                  }
                }
                return line;
              });
              
              const fixedText = fixedLines.join('\n');
              
              // Update the response data with fixed manifest
              response.data = new TextEncoder().encode(fixedText);
              console.log('✓ Fixed manifest URLs');
            } else {
              console.log('No relative URLs found, manifest is OK');
            }
          }
        } catch (e) {
          console.error('Failed to process manifest:', e);
        }
      }
      
      // Log license responses specifically
      if (type === 2) { // LICENSE
        console.log('License response data:', response.data);
        try {
          const text = new TextDecoder().decode(response.data);
          console.log('License response text:', text.substring(0, 200));
        } catch (e) {
          console.log('License response is binary, length:', response.data.byteLength);
        }
      }
    });
    
    // Load the stream
    console.log('Loading manifest...');
    try {
      await window.shakaPlayer.load(url);
      console.log('✓ Stream loaded successfully');
      
      // Check if we have AC-3 audio and try to disable it
      const tracks = window.shakaPlayer.getVariantTracks();
      const hasAC3 = tracks.some(t => t.audioCodec && (t.audioCodec.includes('ac-3') || t.audioCodec.includes('ec-3')));
      
      if (hasAC3) {
        console.warn('⚠ AC-3 audio detected - browsers cannot play this codec');
        console.warn('Attempting workaround: muting audio and playing video only');
        
        // Mute the video
        video.muted = true;
        video.volume = 0;
        
        showVideoNotification('⚠ Audio codec not supported (AC-3). Playing video only.');
      }
      
    } catch (loadError) {
      console.error('Load failed:', loadError);
      throw loadError;
    }
    
    // Populate quality selector with available variants
    updateQualityOptions();
    
    // Populate audio track selector
    updateAudioTracks();
    
    video.play();
    console.log('✓ Playback started');
    
    window.shakaPlayerLoading = false;
    
  } catch (error) {
    window.shakaPlayerLoading = false;
    
    console.error('❌ Error loading stream:', error);
    console.error('Error details:', {
      code: error.code,
      category: error.category,
      severity: error.severity,
      data: error.data,
      message: error.message
    });
    
    // Log detailed error data if available
    if (error.data && error.data.length > 0) {
      console.error('Error data array:', error.data);
      error.data.forEach((item, index) => {
        console.error(`  [${index}]:`, item);
      });
    }
    
    // Provide more specific error messages
    let errorMessage = 'Failed to load stream';
    let shouldFallback = true;
    
    if (error.code === 7000) {
      errorMessage = 'Player error: Player was destroyed during load. Please try again.';
      // Don't fallback for this error, just notify user
      showVideoNotification(errorMessage);
      return;
    } else if (error.code === 4032) {
      // Content contains streams of unsupported type
      errorMessage = 'Transmuxing error: Stream codec not supported by Shaka Player. Trying native playback...';
      console.log('Error 4032: Transmuxing failed or unsupported codec');
      console.log('This usually means mux.js is not loaded or TS segments have unsupported codecs');
      shouldFallback = true;
    } else if (error.code === 4000) {
      // Unsupported MIME type - try native playback
      errorMessage = 'Unsupported format: Trying native playback...';
      console.log('Error 4000: Unsupported MIME type, will try native video element');
      shouldFallback = true;
    } else if (error.code === 4015) {
      // Manifest parsing error - likely not an HLS stream or server returned wrong content
      errorMessage = 'Manifest parsing error: Stream may not be in HLS format. Trying direct playback...';
      console.log('Error 4015: Manifest parsing failed, will try native video element');
      shouldFallback = true;
    } else if (error.code === 6001) {
      // Check if this might be a DRM issue
      if (config.drmScheme === 'none' || !config.drmScheme) {
        errorMessage = 'Network error: Stream may require DRM license keys that are not available in the playlist.';
      } else {
        errorMessage = 'Network error: Unable to fetch stream data. The stream may be offline or geo-restricted.';
      }
      shouldFallback = true;
    } else if (error.code === 6007) {
      errorMessage = 'Network error: Request timed out. The stream server is not responding.';
      shouldFallback = false;
    } else if (error.code === 4012 || error.code === 6012) {
      errorMessage = 'License error: Failed to acquire DRM license. The stream may require a valid subscription.';
      shouldFallback = false;
    } else if (error.code === 3016) {
      errorMessage = 'Media error: Unable to play this stream format. Trying native playback...';
      shouldFallback = true;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    showVideoNotification(errorMessage);
    
    // Clear headers on error
    if (window.electronAPI && window.electronAPI.clearStreamHeaders) {
      await window.electronAPI.clearStreamHeaders();
    }
    
    // Don't fallback for certain errors
    if (!shouldFallback) {
      return;
    }
    
    // Fallback to native video element
    console.log('Attempting fallback to native video element...');
    
    // For XTream streams, MPEG-TS files, or direct video files, native playback often works better
    if (config.isXtream || url.includes('.ts') || error.code === 4015 || error.code === 4032 || error.code === 4000) {
      console.log('Using native video element for direct stream playback');
      showVideoNotification('Loading stream with native player...');
      
      // For .ts files, try converting to .m3u8 if it's an XTream URL
      let fallbackUrl = url;
      if (url.includes('.ts') && config.isXtream) {
        // Try .m3u8 instead of .ts for XTream streams
        fallbackUrl = url.replace(/\.ts$/, '.m3u8');
        console.log('Trying .m3u8 instead of .ts:', fallbackUrl);
        
        // Try loading with Shaka again using .m3u8
        try {
          if (window.shakaPlayer) {
            await window.shakaPlayer.destroy();
            window.shakaPlayer = null;
          }
          
          window.shakaPlayer = new shaka.Player();
          await window.shakaPlayer.attach(video);
          window.shakaPlayer.configure(shakaConfig);
          
          // Re-register filters
          window.shakaPlayer.getNetworkingEngine().registerRequestFilter((type, request) => {
            if (config.userAgent) request.headers['User-Agent'] = config.userAgent;
            if (config.referer) request.headers['Referer'] = config.referer;
            if (config.origin) request.headers['Origin'] = config.origin;
            if (config.cookies) request.headers['Cookie'] = config.cookies;
          });
          
          await window.shakaPlayer.load(fallbackUrl);
          video.play();
          console.log('✓ Successfully loaded .m3u8 version');
          return;
        } catch (m3u8Error) {
          console.log('Failed to load .m3u8 version, falling back to native:', m3u8Error);
        }
      }
    }
    
    video.src = url;
    video.load();
    video.play().catch(e => {
      console.error('Native playback also failed:', e);
      showVideoNotification('Unable to play this stream. The stream may be offline or incompatible.');
    });
  }
}

// Toggle play/pause
function toggleVideoPlayPause() {
  const video = document.getElementById('video');
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateVideoPlayPauseButton(isPlaying) {
  const icon = document.querySelector('#videoPlayPauseBtn i');
  if (icon) {
    icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
  }
}

// Previous/Next video
function playPreviousVideo() {
  const video = document.getElementById('video');
  const isLive = !isFinite(video.duration) || video.duration > 86400;
  
  if (isLive && window.shakaPlayer) {
    // Seek backward 10 seconds in live stream
    const seekRange = window.shakaPlayer.seekRange();
    video.currentTime = Math.max(seekRange.start, video.currentTime - 10);
    showVideoNotification('⏪ -10s');
  } else {
    // Seek backward 10 seconds in VOD
    video.currentTime = Math.max(0, video.currentTime - 10);
    showVideoNotification('⏪ -10s');
  }
}

function playNextVideo() {
  const video = document.getElementById('video');
  const isLive = !isFinite(video.duration) || video.duration > 86400;
  
  if (isLive && window.shakaPlayer) {
    // Seek forward 10 seconds in live stream
    const seekRange = window.shakaPlayer.seekRange();
    video.currentTime = Math.min(seekRange.end, video.currentTime + 10);
    showVideoNotification('⏩ +10s');
  } else {
    // Seek forward 10 seconds in VOD
    video.currentTime = Math.min(video.duration, video.currentTime + 10);
    showVideoNotification('⏩ +10s');
  }
}

// Go to live edge
function goToLive() {
  const video = document.getElementById('video');
  const isLive = !isFinite(video.duration) || video.duration > 86400;
  
  if (isLive && window.shakaPlayer) {
    const seekRange = window.shakaPlayer.seekRange();
    video.currentTime = seekRange.end - 5; // 5 seconds before live edge for stability
    showVideoNotification('📡 LIVE');
  }
}

// Mute/Unmute
function toggleVideoMute() {
  const video = document.getElementById('video');
  video.muted = !video.muted;
  updateVideoVolumeIcon();
}

function updateVideoVolumeIcon() {
  const icon = document.querySelector('#videoMuteBtn i');
  const video = document.getElementById('video');
  if (!icon) return;
  
  if (video.muted || currentVolume === 0) {
    icon.className = 'fas fa-volume-mute';
  } else if (currentVolume < 50) {
    icon.className = 'fas fa-volume-down';
  } else if (currentVolume <= 100) {
    icon.className = 'fas fa-volume-up';
  } else {
    // Volume boost indicator (>100%)
    icon.className = 'fas fa-volume-up';
    icon.style.color = '#dc2626'; // Red color for boost
    return;
  }
  icon.style.color = ''; // Reset color
}

// Update volume slider
function updateVolumeSlider() {
  const slider = document.getElementById('videoVolumeSlider');
  const label = document.getElementById('videoVolumeLabel');
  
  if (slider) {
    slider.value = currentVolume;
  }
  
  if (label) {
    label.textContent = Math.round(currentVolume) + '%';
    
    // Change color when boosted
    if (currentVolume > 100) {
      label.style.color = '#dc2626';
    } else {
      label.style.color = '';
    }
  }
}

// PIP mode
async function togglePIP() {
  const video = document.getElementById('video');
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await video.requestPictureInPicture();
    }
  } catch (error) {
    console.error('PIP error:', error);
  }
}

// Fullscreen
function toggleFullscreen() {
  const container = document.getElementById('videoContainer');
  
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(err => {
      console.error('Fullscreen error:', err);
    });
  } else {
    document.exitFullscreen();
  }
}

// Aspect ratio
let aspectRatioIndex = 0;
const aspectRatios = ['contain', 'cover', 'fill', 'none'];
const aspectRatioNames = ['Fit', 'Fill', 'Stretch', 'Original'];

function cycleAspectRatio() {
  const video = document.getElementById('video');
  aspectRatioIndex = (aspectRatioIndex + 1) % aspectRatios.length;
  video.style.objectFit = aspectRatios[aspectRatioIndex];
  
  // Show notification
  showNotification(`Aspect Ratio: ${aspectRatioNames[aspectRatioIndex]}`);
}

// Wishlist
function toggleWishlist() {
  isInWishlist = !isInWishlist;
  const btn = document.getElementById('videoWishlistBtn');
  const icon = btn?.querySelector('i');
  
  if (icon) {
    icon.className = isInWishlist ? 'fas fa-star' : 'far fa-star';
  }
  
  showNotification(isInWishlist ? 'Added to Wishlist' : 'Removed from Wishlist');
}

// CC toggle
function toggleCC() {
  const video = document.getElementById('video');
  const tracks = video.textTracks;
  
  if (tracks.length > 0) {
    const track = tracks[0];
    track.mode = track.mode === 'showing' ? 'hidden' : 'showing';
    
    const btn = document.getElementById('videoCcBtn');
    btn?.classList.toggle('active', track.mode === 'showing');
  }
}

// Progress bar
function updateVideoProgress() {
  const video = document.getElementById('video');
  
  // Check if it's a live stream
  const isLive = !isFinite(video.duration) || video.duration > 86400;
  
  const seekProgress = document.getElementById('videoSeekProgress');
  const seekHandle = document.getElementById('videoSeekHandle');
  const currentTimeEl = document.getElementById('videoCurrentTime');
  const totalTimeEl = document.getElementById('videoTotalTime');
  
  if (isLive && window.shakaPlayer) {
    // For live streams, show seekable range
    const seekRange = window.shakaPlayer.seekRange();
    const liveEdge = seekRange.end;
    const seekableStart = seekRange.start;
    const seekableDuration = liveEdge - seekableStart;
    
    // Calculate progress within seekable window
    const progress = seekableDuration > 0 ? 
      ((video.currentTime - seekableStart) / seekableDuration) * 100 : 100;
    
    if (seekProgress) seekProgress.style.width = Math.min(100, Math.max(0, progress)) + '%';
    if (seekHandle) seekHandle.style.left = Math.min(100, Math.max(0, progress)) + '%';
    
    // Show buffered content
    updateBufferedProgress();
    
    // Check if at live edge (within 10 seconds)
    const isAtLiveEdge = (liveEdge - video.currentTime) < 10;
    
    if (isAtLiveEdge) {
      currentTimeEl.textContent = 'LIVE';
      currentTimeEl.style.color = '#dc2626';
      currentTimeEl.style.fontWeight = '700';
    } else {
      const behindLive = Math.floor(liveEdge - video.currentTime);
      currentTimeEl.textContent = `-${formatTime(behindLive)}`;
      currentTimeEl.style.color = '#ffffff';
      currentTimeEl.style.fontWeight = '400';
    }
    
    totalTimeEl.textContent = '';
  } else {
    // For VOD, show normal progress
    const progress = (video.currentTime / video.duration) * 100 || 0;
    
    if (seekProgress) seekProgress.style.width = progress + '%';
    if (seekHandle) seekHandle.style.left = progress + '%';
    
    // Show buffered content
    updateBufferedProgress();
    
    currentTimeEl.textContent = formatTime(video.currentTime);
    currentTimeEl.style.color = '#ffffff';
    currentTimeEl.style.fontWeight = '400';
    totalTimeEl.textContent = formatTime(video.duration);
  }
}

// Update buffered progress (shows loaded content)
function updateBufferedProgress() {
  const video = document.getElementById('video');
  let bufferedElement = document.getElementById('videoBufferedProgress');
  
  // Create buffered progress element if it doesn't exist
  if (!bufferedElement) {
    bufferedElement = document.createElement('div');
    bufferedElement.id = 'videoBufferedProgress';
    bufferedElement.className = 'video-buffered-progress';
    document.querySelector('.video-seek-bar')?.appendChild(bufferedElement);
  }
  
  if (video.buffered.length > 0) {
    const bufferedEnd = video.buffered.end(video.buffered.length - 1);
    const duration = video.duration;
    
    let bufferedPercent = 0;
    if (isFinite(duration) && duration > 0) {
      bufferedPercent = (bufferedEnd / duration) * 100;
    } else if (window.shakaPlayer) {
      // For live streams
      const seekRange = window.shakaPlayer.seekRange();
      const seekableDuration = seekRange.end - seekRange.start;
      if (seekableDuration > 0) {
        bufferedPercent = ((bufferedEnd - seekRange.start) / seekableDuration) * 100;
      }
    }
    
    bufferedElement.style.width = Math.min(100, Math.max(0, bufferedPercent)) + '%';
  }
}

function handleVideoSeek(e) {
  const video = document.getElementById('video');
  const seekBar = e.currentTarget;
  const rect = seekBar.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  
  const isLive = !isFinite(video.duration) || video.duration > 86400;
  
  if (isLive && window.shakaPlayer) {
    // For live streams, seek within seekable range
    const seekRange = window.shakaPlayer.seekRange();
    const targetTime = seekRange.start + (percent * (seekRange.end - seekRange.start));
    video.currentTime = targetTime;
  } else {
    // For VOD
    video.currentTime = percent * video.duration;
  }
}

// Mouse wheel for brightness/volume
function handleMouseWheel(e) {
  e.preventDefault();
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const isLeftSide = x < rect.width / 2;
  
  if (isLeftSide) {
    // Left side: brightness
    const delta = e.deltaY > 0 ? -5 : 5;
    setBrightness(brightness + delta);
    showBrightnessBar();
  } else {
    // Right side: volume (now supports 0-200%)
    const delta = e.deltaY > 0 ? -10 : 10; // 10% increments
    setVolume(currentVolume + delta);
    showVolumeBar();
  }
}

function setBrightness(value) {
  brightness = Math.max(50, Math.min(150, value));
  updateVideoFilters();
  updateBrightnessBar();
}

// Show brightness bar
function showBrightnessBar() {
  let bar = document.getElementById('brightnessBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'brightnessBar';
    bar.className = 'side-bar left-bar';
    bar.innerHTML = `
      <i class="fas fa-sun side-bar-icon"></i>
      <div class="side-bar-track">
        <div class="side-bar-fill" id="brightnessBarFill"></div>
      </div>
      <div class="side-bar-label" id="brightnessBarLabel">100%</div>
    `;
    document.getElementById('videoContainer').appendChild(bar);
  }
  
  updateBrightnessBar();
  bar.classList.add('show');
  
  clearTimeout(bar.hideTimeout);
  bar.hideTimeout = setTimeout(() => {
    bar.classList.remove('show');
  }, 1500);
}

function updateBrightnessBar() {
  const fill = document.getElementById('brightnessBarFill');
  const label = document.getElementById('brightnessBarLabel');
  if (fill && label) {
    const percent = ((brightness - 50) / 100) * 100; // 50-150 mapped to 0-100
    fill.style.height = percent + '%';
    label.textContent = brightness + '%';
  }
}

// Show volume bar
function showVolumeBar() {
  let bar = document.getElementById('volumeBar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'volumeBar';
    bar.className = 'side-bar right-bar';
    bar.innerHTML = `
      <i class="fas fa-volume-up side-bar-icon" id="volumeBarIcon"></i>
      <div class="side-bar-track">
        <div class="side-bar-fill" id="volumeBarFill"></div>
      </div>
      <div class="side-bar-label" id="volumeBarLabel">100%</div>
    `;
    document.getElementById('videoContainer').appendChild(bar);
  }
  
  updateVolumeBar();
  bar.classList.add('show');
  
  clearTimeout(bar.hideTimeout);
  bar.hideTimeout = setTimeout(() => {
    bar.classList.remove('show');
  }, 1500);
}

function updateVolumeBar() {
  const fill = document.getElementById('volumeBarFill');
  const label = document.getElementById('volumeBarLabel');
  const icon = document.getElementById('volumeBarIcon');
  
  if (fill && label) {
    // Map 0-200% to 0-100% bar height
    const percent = (currentVolume / 200) * 100;
    fill.style.height = percent + '%';
    label.textContent = Math.round(currentVolume) + '%';
    
    // Change color and icon when boosted
    if (currentVolume > 100) {
      fill.style.background = 'linear-gradient(to top, #dc2626, #ef4444)';
      fill.style.boxShadow = '0 0 10px rgba(220, 38, 38, 0.5)';
      label.style.color = '#ef4444';
      if (icon) {
        icon.className = 'fas fa-volume-up side-bar-icon';
        icon.style.color = '#ef4444';
      }
    } else if (currentVolume === 0) {
      fill.style.background = '';
      fill.style.boxShadow = '';
      label.style.color = '';
      if (icon) {
        icon.className = 'fas fa-volume-mute side-bar-icon';
        icon.style.color = '';
      }
    } else if (currentVolume < 50) {
      fill.style.background = '';
      fill.style.boxShadow = '';
      label.style.color = '';
      if (icon) {
        icon.className = 'fas fa-volume-down side-bar-icon';
        icon.style.color = '';
      }
    } else {
      fill.style.background = '';
      fill.style.boxShadow = '';
      label.style.color = '';
      if (icon) {
        icon.className = 'fas fa-volume-up side-bar-icon';
        icon.style.color = '';
      }
    }
  }
}

// Notification
function showNotification(message) {
  let notification = document.getElementById('videoNotification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'videoNotification';
    notification.className = 'video-notification';
    document.getElementById('videoContainer').appendChild(notification);
  }
  
  notification.textContent = message;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

function formatTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVideoPlayer);
} else {
  initVideoPlayer();
}

// Show video notification
function showVideoNotification(message) {
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
  }, 3000);
}

// Update quality options from stream
function updateQualityOptions() {
  if (!window.shakaPlayer) return;
  
  const tracks = window.shakaPlayer.getVariantTracks();
  const qualityDropdown = document.getElementById('qualityDropdown');
  
  if (!qualityDropdown || tracks.length === 0) return;
  
  // Group tracks by height and get the highest bandwidth for each
  const qualityMap = new Map();
  tracks.forEach(track => {
    if (!qualityMap.has(track.height) || track.bandwidth > qualityMap.get(track.height).bandwidth) {
      qualityMap.set(track.height, track);
    }
  });
  
  // Sort by height (quality) descending
  const qualities = Array.from(qualityMap.values()).sort((a, b) => b.height - a.height);
  
  qualityDropdown.innerHTML = '<div class="dropdown-item active" data-quality="auto">Auto</div>';
  
  qualities.forEach(track => {
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    
    // Calculate Mbps from bandwidth (bits per second to Mbps)
    const mbps = (track.bandwidth / 1000000).toFixed(1);
    
    // Display format: "1080p (5.2 Mbps)"
    item.innerHTML = `${track.height}p <span style="color: #999; font-size: 11px;">(${mbps} Mbps)</span>`;
    item.dataset.quality = track.height;
    
    item.addEventListener('click', () => {
      // Set specific quality
      const tracksToEnable = tracks.filter(t => t.height === track.height);
      if (tracksToEnable.length > 0) {
        window.shakaPlayer.configure({abr: {enabled: false}});
        window.shakaPlayer.selectVariantTrack(tracksToEnable[0], true);
        
        // Update active state
        qualityDropdown.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        showVideoNotification(`Quality: ${track.height}p (${mbps} Mbps)`);
      }
    });
    
    qualityDropdown.appendChild(item);
  });
  
  // Auto quality click handler
  qualityDropdown.querySelector('[data-quality="auto"]').addEventListener('click', () => {
    window.shakaPlayer.configure({abr: {enabled: true}});
    qualityDropdown.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
    qualityDropdown.querySelector('[data-quality="auto"]').classList.add('active');
    showVideoNotification('Quality: Auto');
  });
}

// Update audio tracks from stream
function updateAudioTracks() {
  if (!window.shakaPlayer) return;
  
  const tracks = window.shakaPlayer.getAudioLanguagesAndRoles();
  const audioDropdown = document.getElementById('audioDropdown');
  
  if (!audioDropdown || tracks.length === 0) return;
  
  audioDropdown.innerHTML = '';
  
  tracks.forEach((track, index) => {
    const item = document.createElement('div');
    item.className = 'dropdown-item' + (index === 0 ? ' active' : '');
    item.textContent = track.language || `Audio ${index + 1}`;
    item.dataset.language = track.language;
    
    item.addEventListener('click', () => {
      window.shakaPlayer.selectAudioLanguage(track.language);
      
      // Update active state
      audioDropdown.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      showVideoNotification(`Audio: ${track.language || 'Track ' + (index + 1)}`);
    });
    
    audioDropdown.appendChild(item);
  });
}

// Assign functions to the pre-initialized window.videoPlayer object
window.videoPlayer.playVideo = playVideo;
window.videoPlayer.playVideoWithConfig = playVideoWithConfig;

console.log('✓ Video Player API functions assigned:', Object.keys(window.videoPlayer));

// Audio Player Controller
let audioVisualizer = null;
let currentPlaylist = [];
let currentTrackIndex = -1;
let playbackMode = 'once'; // once, repeat-track, repeat-list, shuffle, reverse

// Initialize audio player
function initAudioPlayer() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('audioVisualizer');
  
  if (canvas && video) {
    audioVisualizer = new AudioVisualizer(video, canvas);
  }

  // Play/Pause button
  const playPauseBtn = document.getElementById('playPauseBtn');
  playPauseBtn?.addEventListener('click', togglePlayPause);

  // Previous/Next buttons
  document.getElementById('prevBtn')?.addEventListener('click', playPrevious);
  document.getElementById('nextBtn')?.addEventListener('click', playNext);

  // Playback mode buttons
  document.getElementById('repeatTrackBtn')?.addEventListener('click', () => setPlaybackMode('repeat-track'));
  document.getElementById('repeatListBtn')?.addEventListener('click', () => setPlaybackMode('repeat-list'));
  document.getElementById('shuffleBtn')?.addEventListener('click', () => setPlaybackMode('shuffle'));
  document.getElementById('reverseBtn')?.addEventListener('click', () => setPlaybackMode('reverse'));
  document.getElementById('onceBtn')?.addEventListener('click', () => setPlaybackMode('once'));

  // Seek bar
  const seekBar = document.querySelector('.seek-bar');
  seekBar?.addEventListener('click', handleSeek);

  // Volume control
  const volumeBar = document.querySelector('.volume-bar');
  const volumeBtn = document.getElementById('volumeBtn');
  volumeBar?.addEventListener('click', handleVolumeChange);
  volumeBtn?.addEventListener('click', toggleMute);

  // Video events
  video.addEventListener('timeupdate', updateProgress);
  video.addEventListener('ended', handleTrackEnd);
  video.addEventListener('play', () => {
    if (audioVisualizer && isAudioFile()) {
      audioVisualizer.start();
    }
    updatePlayPauseButton(true);
  });
  video.addEventListener('pause', () => {
    if (audioVisualizer) {
      audioVisualizer.stop();
    }
    updatePlayPauseButton(false);
  });

  // Window resize
  window.addEventListener('resize', () => {
    if (audioVisualizer) {
      audioVisualizer.resize();
    }
  });
}

// Check if current file is audio
function isAudioFile() {
  const video = document.getElementById('video');
  const src = video.src || '';
  const audioExts = ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.m4a', '.wma'];
  return audioExts.some(ext => src.toLowerCase().includes(ext));
}

// Show audio player UI
function showAudioPlayer(show = true) {
  const audioPlayer = document.getElementById('audioPlayer');
  const videoPlayerContainer = document.getElementById('videoPlayerContainer');
  
  if (show) {
    audioPlayer?.classList.remove('hidden');
    videoPlayerContainer?.classList.add('hidden');
  } else {
    audioPlayer?.classList.add('hidden');
    videoPlayerContainer?.classList.add('hidden');
  }
}

// Play audio file
async function playAudioFile(filePath, fileName) {
  const video = document.getElementById('video');
  const placeholder = document.getElementById('playerPlaceholder');
  
  // Destroy Shaka Player if it exists (for clean audio playback)
  if (window.shakaPlayer) {
    try {
      await window.shakaPlayer.destroy();
      window.shakaPlayer = null;
      console.log('✓ Shaka Player destroyed for audio playback');
    } catch (error) {
      console.error('Error destroying Shaka Player:', error);
      window.shakaPlayer = null;
    }
  }
  
  // Clear any stream headers
  if (window.electronAPI && window.electronAPI.clearStreamHeaders) {
    await window.electronAPI.clearStreamHeaders();
  }
  
  // Hide placeholder
  if (placeholder) {
    placeholder.style.display = 'none';
  }
  
  // Show audio player
  showAudioPlayer(true);
  
  // Load and play
  video.src = `file:///${filePath.replace(/\\/g, '/')}`;
  video.play();
  
  // Update UI
  document.getElementById('audioTitle').textContent = fileName;
  document.getElementById('audioArtist').textContent = filePath.split('\\').slice(-2, -1)[0] || 'Unknown';
}

// Toggle play/pause
function togglePlayPause() {
  const video = document.getElementById('video');
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play/pause button
function updatePlayPauseButton(isPlaying) {
  const icon = document.querySelector('#playPauseBtn i');
  if (icon) {
    icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
  }
}

// Play previous track
function playPrevious() {
  if (currentPlaylist.length === 0) return;
  
  if (playbackMode === 'reverse') {
    currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
  } else {
    currentTrackIndex = (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  }
  
  const track = currentPlaylist[currentTrackIndex];
  playAudioFile(track.path, track.name);
}

// Play next track
function playNext() {
  if (currentPlaylist.length === 0) return;
  
  if (playbackMode === 'shuffle') {
    currentTrackIndex = Math.floor(Math.random() * currentPlaylist.length);
  } else if (playbackMode === 'reverse') {
    currentTrackIndex = (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
  }
  
  const track = currentPlaylist[currentTrackIndex];
  playAudioFile(track.path, track.name);
}

// Handle track end
function handleTrackEnd() {
  switch (playbackMode) {
    case 'repeat-track':
      document.getElementById('video').play();
      break;
    case 'repeat-list':
      playNext();
      break;
    case 'shuffle':
      playNext();
      break;
    case 'reverse':
      playNext();
      break;
    case 'once':
      // Do nothing, stop playing
      break;
  }
}

// Set playback mode
function setPlaybackMode(mode) {
  playbackMode = mode;
  
  // Update button states
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  
  const modeButtons = {
    'repeat-track': 'repeatTrackBtn',
    'repeat-list': 'repeatListBtn',
    'shuffle': 'shuffleBtn',
    'reverse': 'reverseBtn',
    'once': 'onceBtn'
  };
  
  const activeBtn = document.getElementById(modeButtons[mode]);
  activeBtn?.classList.add('active');
}

// Update progress bar
function updateProgress() {
  const video = document.getElementById('video');
  const progress = (video.currentTime / video.duration) * 100 || 0;
  
  const seekProgress = document.getElementById('seekProgress');
  const seekHandle = document.getElementById('seekHandle');
  
  if (seekProgress) {
    seekProgress.style.width = progress + '%';
  }
  if (seekHandle) {
    seekHandle.style.left = progress + '%';
  }
  
  // Update time labels
  document.getElementById('currentTime').textContent = formatTime(video.currentTime);
  document.getElementById('totalTime').textContent = formatTime(video.duration);
}

// Handle seek
function handleSeek(e) {
  const seekBar = e.currentTarget;
  const rect = seekBar.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  
  const video = document.getElementById('video');
  video.currentTime = percent * video.duration;
}

// Handle volume change
function handleVolumeChange(e) {
  const volumeBar = e.currentTarget;
  const rect = volumeBar.getBoundingClientRect();
  const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  
  const video = document.getElementById('video');
  video.volume = percent;
  updateVolumeUI(percent);
}

// Toggle mute
function toggleMute() {
  const video = document.getElementById('video');
  video.muted = !video.muted;
  
  const icon = document.querySelector('#volumeBtn i');
  if (video.muted) {
    icon.className = 'fas fa-volume-mute';
  } else {
    updateVolumeIcon(video.volume);
  }
}

// Update volume UI
function updateVolumeUI(volume) {
  const volumeProgress = document.getElementById('volumeProgress');
  const volumeHandle = document.getElementById('volumeHandle');
  const volumeLabel = document.getElementById('volumeLabel');
  
  const percent = volume * 100;
  
  if (volumeProgress) {
    volumeProgress.style.width = percent + '%';
  }
  if (volumeHandle) {
    volumeHandle.style.left = percent + '%';
  }
  if (volumeLabel) {
    volumeLabel.textContent = Math.round(percent) + '%';
  }
  
  updateVolumeIcon(volume);
}

// Update volume icon
function updateVolumeIcon(volume) {
  const icon = document.querySelector('#volumeBtn i');
  if (!icon) return;
  
  if (volume === 0) {
    icon.className = 'fas fa-volume-mute';
  } else if (volume < 0.5) {
    icon.className = 'fas fa-volume-down';
  } else {
    icon.className = 'fas fa-volume-up';
  }
}

// Format time
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Set playlist
function setPlaylist(tracks, startIndex = 0) {
  currentPlaylist = tracks;
  currentTrackIndex = startIndex;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAudioPlayer);
} else {
  initAudioPlayer();
}

// Initialize volume on load
setTimeout(() => {
  const video = document.getElementById('video');
  if (video) {
    updateVolumeUI(video.volume);
  }
}, 100);

// Export functions
window.audioPlayer = {
  playAudioFile,
  showAudioPlayer,
  setPlaylist,
  isAudioFile
};

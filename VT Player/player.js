// Initialize Shaka Player
const video = document.getElementById('video');
const manifestUriInput = document.getElementById('manifestUri');
const loadBtn = document.getElementById('loadBtn');
const drmTypeSelect = document.getElementById('drmType');
const licenseServerInput = document.getElementById('licenseServer');
const statusEl = document.getElementById('status');

let player = null;

// Initialize player
function initPlayer() {
  // Install polyfills
  shaka.polyfill.installAll();

  // Check browser support
  if (!shaka.Player.isBrowserSupported()) {
    console.error('Browser not supported!');
    if (statusEl) updateStatus('Browser not supported', 'error');
    return;
  }

  player = new shaka.Player(video);

  // Configure for zero buffering
  player.configure({
    streaming: {
      bufferingGoal: 30,
      rebufferingGoal: 2,
      bufferBehind: 30,
      retryParameters: {
        timeout: 30000,
        maxAttempts: 4,
        baseDelay: 1000,
        backoffFactor: 2,
        fuzzFactor: 0.5
      },
      failureCallback: (error) => {
        console.error('Stream failure:', error);
      }
    },
    abr: {
      enabled: true,
      defaultBandwidthEstimate: 5000000,
      switchInterval: 8,
      bandwidthUpgradeTarget: 0.85,
      bandwidthDowngradeTarget: 0.95
    }
  });

  // Error handling
  player.addEventListener('error', onErrorEvent);
  
  updateStatus('Player initialized');
}

function onErrorEvent(event) {
  onError(event.detail);
}

function onError(error) {
  console.error('Error code', error.code, 'object', error);
  updateStatus(`Error: ${error.message || error.code}`, 'error');
}

function updateStatus(message, type = 'info') {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.style.color = type === 'error' ? '#ff6b6b' : '#b0b0b0';
}

// Load stream
async function loadStream() {
  if (!player) {
    initPlayer();
  }

  if (!manifestUriInput) return;

  const manifestUri = manifestUriInput.value.trim();
  if (!manifestUri) {
    updateStatus('Please enter a stream URL', 'error');
    return;
  }

  // Hide placeholder, show video player
  const placeholder = document.getElementById('playerPlaceholder');
  if (placeholder) {
    placeholder.style.display = 'none';
  }
  video.classList.remove('hidden');

  updateStatus('Loading stream...');

  try {
    // Configure DRM if selected
    const drmType = drmTypeSelect?.value;
    const licenseServer = licenseServerInput?.value.trim();

    if (drmType && licenseServer) {
      const drmConfig = configureDRM(drmType, licenseServer);
      player.configure({ drm: drmConfig });
      updateStatus(`Loading with ${drmType.toUpperCase()} DRM...`);
    }

    // Load the manifest
    await player.load(manifestUri);
    updateStatus('Playing');
    
  } catch (error) {
    onError(error);
  }
}

// DRM Configuration
function configureDRM(drmType, licenseServer) {
  const drmSystems = {
    widevine: 'com.widevine.alpha',
    playready: 'com.microsoft.playready',
    clearkey: 'org.w3.clearkey'
  };

  const drmSystem = drmSystems[drmType];
  
  if (!drmSystem) {
    return {};
  }

  const config = {
    servers: {
      [drmSystem]: licenseServer
    }
  };

  // ClearKey specific configuration
  if (drmType === 'clearkey') {
    // Example: You can add clearKeys here
    // config.clearKeys = {
    //   'key-id-in-hex': 'key-in-hex'
    // };
  }

  return config;
}

// Event listeners
if (loadBtn) {
  loadBtn.addEventListener('click', loadStream);
}

if (manifestUriInput) {
  manifestUriInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      loadStream();
    }
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initPlayer();
});

// Cleanup
window.addEventListener('beforeunload', () => {
  if (player) {
    player.destroy();
  }
});

// Audio Visualizer with Web Audio API
class AudioVisualizer {
  constructor(audioElement, canvasElement) {
    this.audio = audioElement;
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;
    this.source = null;
    this.animationId = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;

    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);

      this.source = this.audioContext.createMediaElementSource(this.audio);
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);

      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing audio visualizer:', error);
    }
  }

  start() {
    if (!this.isInitialized) {
      this.init();
    }
    this.draw();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.clear();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.animationId = requestAnimationFrame(() => this.draw());

    if (!this.analyser) return;

    this.analyser.getByteFrequencyData(this.dataArray);

    // Set canvas size to match container
    const rect = this.canvas.getBoundingClientRect();
    if (this.canvas.width !== rect.width || this.canvas.height !== rect.height) {
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    }

    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerY = height / 2;

    // Clear canvas
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, width, height);

    // Draw waveform
    const barCount = Math.min(128, Math.floor(width / 8));
    const barWidth = width / barCount;
    const maxBarHeight = height * 0.45;

    for (let i = 0; i < barCount; i++) {
      const dataIndex = Math.floor(i * this.dataArray.length / barCount);
      const value = this.dataArray[dataIndex];
      const barHeight = (value / 255) * maxBarHeight;

      const x = i * barWidth;
      
      // Create gradient for bars
      const gradient = this.ctx.createLinearGradient(0, centerY - barHeight, 0, centerY + barHeight);
      gradient.addColorStop(0, '#dc2626');
      gradient.addColorStop(0.5, '#ef4444');
      gradient.addColorStop(1, '#dc2626');

      this.ctx.fillStyle = gradient;

      // Draw mirrored bars (top and bottom)
      this.ctx.fillRect(x + 1, centerY - barHeight, barWidth - 2, barHeight);
      this.ctx.fillRect(x + 1, centerY, barWidth - 2, barHeight);
    }
  }

  resize() {
    if (this.canvas) {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    }
  }
}

// Export
window.AudioVisualizer = AudioVisualizer;

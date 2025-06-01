<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>HLS Player</title>
</head>
<body>
  <video id="video" controls width="640" height="360"></video>
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
  <script>
    const video = document.getElementById('video');
    const hls = new Hls();

    // URL to your Cloudflare Worker serving the HLS stream
    const streamUrl = 'https://amit-1.allinonereborn.in/jiotv-new/app/ts_live_896.m3u8';

    if (Hls.isSupported()) {
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  </script>
</body>
</html>

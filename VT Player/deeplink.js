// Ruby Player Deeplink Encryption/Decryption
// AES-256-CBC with SHA-256 key derivation and MD5 IV

const SECRET_KEY = 'RubyPlayerSuperSecretKey2025';

// SHA-256 hash
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return new Uint8Array(hashBuffer);
}

// MD5 hash using SubtleCrypto (more reliable than custom implementation)
// Since Web Crypto doesn't support MD5, we'll use a simple but correct implementation
async function md5Bytes(string) {
  // For compatibility with Android's MD5, we need to match exactly
  // Android: MessageDigest.getInstance("MD5").digest(SECRET_KEY.toByteArray(StandardCharsets.UTF_8))
  
  // Use a library-quality MD5 implementation
  // This is the blueimp-md5 algorithm adapted for our needs
  function md5(str) {
    function md5cycle(x, k) {
      let a = x[0], b = x[1], c = x[2], d = x[3];
      
      a = ff(a, b, c, d, k[0], 7, -680876936);
      d = ff(d, a, b, c, k[1], 12, -389564586);
      c = ff(c, d, a, b, k[2], 17, 606105819);
      b = ff(b, c, d, a, k[3], 22, -1044525330);
      a = ff(a, b, c, d, k[4], 7, -176418897);
      d = ff(d, a, b, c, k[5], 12, 1200080426);
      c = ff(c, d, a, b, k[6], 17, -1473231341);
      b = ff(b, c, d, a, k[7], 22, -45705983);
      a = ff(a, b, c, d, k[8], 7, 1770035416);
      d = ff(d, a, b, c, k[9], 12, -1958414417);
      c = ff(c, d, a, b, k[10], 17, -42063);
      b = ff(b, c, d, a, k[11], 22, -1990404162);
      a = ff(a, b, c, d, k[12], 7, 1804603682);
      d = ff(d, a, b, c, k[13], 12, -40341101);
      c = ff(c, d, a, b, k[14], 17, -1502002290);
      b = ff(b, c, d, a, k[15], 22, 1236535329);
      
      a = gg(a, b, c, d, k[1], 5, -165796510);
      d = gg(d, a, b, c, k[6], 9, -1069501632);
      c = gg(c, d, a, b, k[11], 14, 643717713);
      b = gg(b, c, d, a, k[0], 20, -373897302);
      a = gg(a, b, c, d, k[5], 5, -701558691);
      d = gg(d, a, b, c, k[10], 9, 38016083);
      c = gg(c, d, a, b, k[15], 14, -660478335);
      b = gg(b, c, d, a, k[4], 20, -405537848);
      a = gg(a, b, c, d, k[9], 5, 568446438);
      d = gg(d, a, b, c, k[14], 9, -1019803690);
      c = gg(c, d, a, b, k[3], 14, -187363961);
      b = gg(b, c, d, a, k[8], 20, 1163531501);
      a = gg(a, b, c, d, k[13], 5, -1444681467);
      d = gg(d, a, b, c, k[2], 9, -51403784);
      c = gg(c, d, a, b, k[7], 14, 1735328473);
      b = gg(b, c, d, a, k[12], 20, -1926607734);
      
      a = hh(a, b, c, d, k[5], 4, -378558);
      d = hh(d, a, b, c, k[8], 11, -2022574463);
      c = hh(c, d, a, b, k[11], 16, 1839030562);
      b = hh(b, c, d, a, k[14], 23, -35309556);
      a = hh(a, b, c, d, k[1], 4, -1530992060);
      d = hh(d, a, b, c, k[4], 11, 1272893353);
      c = hh(c, d, a, b, k[7], 16, -155497632);
      b = hh(b, c, d, a, k[10], 23, -1094730640);
      a = hh(a, b, c, d, k[13], 4, 681279174);
      d = hh(d, a, b, c, k[0], 11, -358537222);
      c = hh(c, d, a, b, k[3], 16, -722521979);
      b = hh(b, c, d, a, k[6], 23, 76029189);
      a = hh(a, b, c, d, k[9], 4, -640364487);
      d = hh(d, a, b, c, k[12], 11, -421815835);
      c = hh(c, d, a, b, k[15], 16, 530742520);
      b = hh(b, c, d, a, k[2], 23, -995338651);
      
      a = ii(a, b, c, d, k[0], 6, -198630844);
      d = ii(d, a, b, c, k[7], 10, 1126891415);
      c = ii(c, d, a, b, k[14], 15, -1416354905);
      b = ii(b, c, d, a, k[5], 21, -57434055);
      a = ii(a, b, c, d, k[12], 6, 1700485571);
      d = ii(d, a, b, c, k[3], 10, -1894986606);
      c = ii(c, d, a, b, k[10], 15, -1051523);
      b = ii(b, c, d, a, k[1], 21, -2054922799);
      a = ii(a, b, c, d, k[8], 6, 1873313359);
      d = ii(d, a, b, c, k[15], 10, -30611744);
      c = ii(c, d, a, b, k[6], 15, -1560198380);
      b = ii(b, c, d, a, k[13], 21, 1309151649);
      a = ii(a, b, c, d, k[4], 6, -145523070);
      d = ii(d, a, b, c, k[11], 10, -1120210379);
      c = ii(c, d, a, b, k[2], 15, 718787259);
      b = ii(b, c, d, a, k[9], 21, -343485551);
      
      x[0] = add(a, x[0]);
      x[1] = add(b, x[1]);
      x[2] = add(c, x[2]);
      x[3] = add(d, x[3]);
    }
    
    function cmn(q, a, b, x, s, t) {
      a = add(add(a, q), add(x, t));
      return add((a << s) | (a >>> (32 - s)), b);
    }
    
    function ff(a, b, c, d, x, s, t) {
      return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    
    function gg(a, b, c, d, x, s, t) {
      return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    
    function hh(a, b, c, d, x, s, t) {
      return cmn(b ^ c ^ d, a, b, x, s, t);
    }
    
    function ii(a, b, c, d, x, s, t) {
      return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }
    
    function add(x, y) {
      const lsw = (x & 0xFFFF) + (y & 0xFFFF);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }
    
    function md5blk(s) {
      const md5blks = [];
      for (let i = 0; i < 64; i += 4) {
        md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) +
          (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
      }
      return md5blks;
    }
    
    function md51(s) {
      const n = s.length;
      const state = [1732584193, -271733879, -1732584194, 271733878];
      let i;
      for (i = 64; i <= s.length; i += 64) {
        md5cycle(state, md5blk(s.substring(i - 64, i)));
      }
      s = s.substring(i - 64);
      const tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (i = 0; i < s.length; i++) {
        tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
      }
      tail[i >> 2] |= 0x80 << ((i % 4) << 3);
      if (i > 55) {
        md5cycle(state, tail);
        for (i = 0; i < 16; i++) tail[i] = 0;
      }
      tail[14] = n * 8;
      md5cycle(state, tail);
      return state;
    }
    
    // Convert string to binary string (UTF-8)
    const binaryStr = unescape(encodeURIComponent(str));
    const state = md51(binaryStr);
    
    // Convert state to bytes (little-endian)
    const bytes = new Uint8Array(16);
    for (let i = 0; i < 4; i++) {
      bytes[i * 4] = (state[i] >> 0) & 0xFF;
      bytes[i * 4 + 1] = (state[i] >> 8) & 0xFF;
      bytes[i * 4 + 2] = (state[i] >> 16) & 0xFF;
      bytes[i * 4 + 3] = (state[i] >> 24) & 0xFF;
    }
    
    return bytes;
  }
  
  return md5(string);
}

// Generate encryption key and IV
async function generateKeyAndIV(secret) {
  // Key: Full SHA-256 hash (32 bytes) - matches Android SecretKeySpec
  const key = await sha256(secret);
  
  // IV: MD5 hash (16 bytes) - matches Android MD5
  const iv = await md5Bytes(secret);
  
  console.log('Key (first 8 bytes):', Array.from(key.slice(0, 8)).map(b => b.toString(16).padStart(2, '0')).join(''));
  console.log('IV (all 16 bytes):', Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join(''));
  
  return { key, iv };
}

// Encrypt stream data
async function encryptStreamData(streamData) {
  try {
    const { key, iv } = await generateKeyAndIV(SECRET_KEY);
    
    // Convert JSON to string
    const plaintext = JSON.stringify(streamData);
    const plaintextBuffer = new TextEncoder().encode(plaintext);
    
    // Import key for Web Crypto API
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      key,
      { name: 'AES-CBC' },
      false,
      ['encrypt']
    );
    
    // Encrypt
    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-CBC', iv: iv },
      cryptoKey,
      plaintextBuffer
    );
    
    // Convert to Base64 URL-safe
    const base64 = btoa(String.fromCharCode(...new Uint8Array(ciphertext)));
    const urlSafe = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    
    // URL encode
    return encodeURIComponent(urlSafe);
  } catch (error) {
    console.error('Encryption error:', error);
    throw error;
  }
}

// Decrypt stream data
async function decryptStreamData(encryptedData) {
  try {
    console.log('=== Decryption Debug ===');
    console.log('Input (first 50 chars):', encryptedData.substring(0, 50));
    
    const { key, iv } = await generateKeyAndIV(SECRET_KEY);
    
    // URL decode - handle both encoded and non-encoded input
    let decoded = encryptedData;
    try {
      // Try to decode, but if it's already decoded, this won't change it
      decoded = decodeURIComponent(encryptedData);
      console.log('After URL decode (first 50 chars):', decoded.substring(0, 50));
    } catch (e) {
      console.log('URL decode failed, using original:', e.message);
    }
    
    // Convert URL-safe Base64 to standard Base64
    let base64 = decoded.replace(/-/g, '+').replace(/_/g, '/');
    console.log('After URL-safe conversion (first 50 chars):', base64.substring(0, 50));
    
    // Remove any existing padding first (in case it was double-encoded)
    base64 = base64.replace(/=+$/, '');
    
    // Add correct padding
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    console.log('After padding (first 50 chars):', base64.substring(0, 50));
    console.log('Base64 length:', base64.length, 'mod 4:', base64.length % 4);
    
    // Decode Base64 to bytes
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    console.log('Decoded bytes length:', bytes.length);
    
    // Import key for Web Crypto API
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      key,
      { name: 'AES-CBC' },
      false,
      ['decrypt']
    );
    
    // Decrypt
    const plaintext = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: iv },
      cryptoKey,
      bytes
    );
    console.log('Decryption successful, plaintext length:', plaintext.byteLength);
    
    // Convert to string and parse JSON
    const decryptedString = new TextDecoder().decode(plaintext);
    console.log('Decrypted JSON (first 100 chars):', decryptedString.substring(0, 100));
    
    const parsed = JSON.parse(decryptedString);
    console.log('Parsed successfully:', Object.keys(parsed));
    
    return parsed;
  } catch (error) {
    console.error('Decryption error:', error);
    console.error('Error stack:', error.stack);
    throw error;
  }
}

// Generate deeplink from channel data
async function generateDeeplink(channel, useCustomScheme = false) {
  const streamData = {
    url: channel.url,
    name: channel.name,
    title: channel.name,
    streamId: channel.id || channel.name,
    logoUrl: channel.logo || '',
    group: channel.category || 'Uncategorized',
    userAgent: channel.headers?.userAgent || '',
    referer: channel.headers?.referer || '',
    origin: channel.headers?.origin || '',
    cookies: channel.headers?.cookies || ''
  };
  
  // Add DRM if present
  if (channel.drm && channel.drm.scheme) {
    streamData.drmScheme = channel.drm.scheme;
    if (channel.drm.keyId && channel.drm.key) {
      streamData.clearKeyKid = channel.drm.keyId;
      streamData.clearKeyKey = channel.drm.key;
    }
    if (channel.drm.licenseUrl) {
      streamData.drmLicenseUrl = channel.drm.licenseUrl;
    }
  }
  
  const encryptedData = await encryptStreamData(streamData);
  
  // Return custom scheme for PC-to-PC sharing, HTTPS for cross-platform
  if (useCustomScheme) {
    return `rubyplayer://play?data=${encryptedData}`;
  } else {
    return `https://rubyplayer.pages.dev/play?data=${encryptedData}`;
  }
}

// Parse Android Intent URL
function parseIntentURL(intentUrl) {
  try {
    console.log('=== Parsing Intent URL ===');
    console.log('Intent URL:', intentUrl);
    
    // Intent URL format:
    // intent:<URL>|<headers>#Intent;package=<package>;S.title=<title>;end
    
    // Extract the URL part (between "intent:" and "#Intent")
    const urlMatch = intentUrl.match(/^intent:(.+?)#Intent/);
    if (!urlMatch) {
      throw new Error('Invalid Intent URL format');
    }
    
    let urlWithHeaders = urlMatch[1];
    console.log('URL with headers (raw):', urlWithHeaders);
    
    // Decode URL-encoded characters (like %7C for pipe)
    try {
      urlWithHeaders = decodeURIComponent(urlWithHeaders);
      console.log('URL with headers (decoded):', urlWithHeaders);
    } catch (e) {
      console.log('URL decode failed, using original');
    }
    
    // Extract title from Intent extras
    const titleMatch = intentUrl.match(/S\.title=([^;]+)/);
    const title = titleMatch ? decodeURIComponent(titleMatch[1]) : 'Intent Stream';
    
    // Parse URL and headers (same format as M3U pipe-separated)
    const config = {
      url: '',
      name: title,
      cookies: '',
      referer: '',
      origin: '',
      userAgent: '',
      drmScheme: 'none',
      keyId: '',
      key: '',
      drmUrl: ''
    };
    
    // Split by pipe to separate URL from headers
    if (urlWithHeaders.includes('|')) {
      const parts = urlWithHeaders.split('|');
      config.url = parts[0];
      
      console.log('Clean URL:', config.url);
      console.log('Headers part:', parts[1]);
      
      // Parse headers from the second part
      if (parts[1]) {
        const headerPairs = parts[1].split('&');
        headerPairs.forEach(pair => {
          const firstEqualIndex = pair.indexOf('=');
          if (firstEqualIndex === -1) return;
          
          const key = pair.substring(0, firstEqualIndex).trim();
          const value = pair.substring(firstEqualIndex + 1).trim();
          const lowerKey = key.toLowerCase();
          
          console.log(`Parsing header: ${key} = ${value.substring(0, 50)}...`);
          
          if (lowerKey === 'user-agent') {
            config.userAgent = value;
          } else if (lowerKey === 'referer') {
            config.referer = value;
          } else if (lowerKey === 'origin') {
            config.origin = value;
          } else if (lowerKey === 'cookie' || lowerKey === 'cookies') {
            config.cookies = value;
          } else if (lowerKey === 'drmscheme') {
            config.drmScheme = value.toLowerCase();
            console.log('Found DRM Scheme:', config.drmScheme);
          } else if (lowerKey === 'drmlicense') {
            // Handle ClearKey format: keyId:key
            if (value.includes(':')) {
              const [keyId, key] = value.split(':');
              config.keyId = keyId.trim();
              config.key = key.trim();
              console.log('Found ClearKey - KeyID:', config.keyId, 'Key:', config.key);
            } else {
              config.drmUrl = value;
              console.log('Found DRM License URL:', config.drmUrl);
            }
          }
        });
      }
    } else {
      // No pipe separator - check if URL has query parameters with DRM info
      // This handles URLs like: url?token=abc&drmScheme=clearkey&drmLicense=key:id
      const urlObj = new URL(urlWithHeaders);
      config.url = urlObj.origin + urlObj.pathname;
      
      // Check for DRM parameters in query string
      const drmScheme = urlObj.searchParams.get('drmScheme');
      const drmLicense = urlObj.searchParams.get('drmLicense');
      const userAgent = urlObj.searchParams.get('User-Agent');
      const referer = urlObj.searchParams.get('Referer');
      const origin = urlObj.searchParams.get('Origin');
      
      if (drmScheme) {
        config.drmScheme = drmScheme.toLowerCase();
        // Remove DRM params from URL
        urlObj.searchParams.delete('drmScheme');
      }
      
      if (drmLicense) {
        if (drmLicense.includes(':')) {
          const [keyId, key] = drmLicense.split(':');
          config.keyId = keyId.trim();
          config.key = key.trim();
        } else {
          config.drmUrl = drmLicense;
        }
        // Remove DRM params from URL
        urlObj.searchParams.delete('drmLicense');
      }
      
      if (userAgent) {
        config.userAgent = userAgent;
        urlObj.searchParams.delete('User-Agent');
      }
      
      if (referer) {
        config.referer = referer;
        urlObj.searchParams.delete('Referer');
      }
      
      if (origin) {
        config.origin = origin;
        urlObj.searchParams.delete('Origin');
      }
      
      // Rebuild URL without DRM/header params
      config.url = urlObj.toString();
    }
    
    console.log('Parsed Intent config:', config);
    console.log('Final URL:', config.url);
    console.log('Final DRM Scheme:', config.drmScheme);
    console.log('Final KeyID:', config.keyId);
    console.log('Final Key:', config.key);
    return config;
  } catch (error) {
    console.error('Intent URL parsing error:', error);
    throw error;
  }
}

// Parse and play from deeplink
async function handleDeeplink(url) {
  try {
    console.log('=== Handling Deeplink ===');
    console.log('Raw URL:', url);
    
    // Normalize URL for checking
    let normalizedUrl = url;
    if (url.startsWith('rubyplayer://')) {
      normalizedUrl = url.replace('rubyplayer://', 'https://rubyplayer.pages.dev/');
    }
    
    console.log('Normalized URL:', normalizedUrl);
    
    // Check if it's a playlist deeplink (must check before general play deeplink)
    // Check for /playlist path (not /play)
    const urlPath = normalizedUrl.split('?')[0];
    console.log('URL Path:', urlPath);
    
    if (urlPath.endsWith('/playlist') || urlPath.endsWith('/playlist/')) {
      console.log('✓ Detected Playlist Deeplink');
      return await handlePlaylistDeeplink(normalizedUrl);
    }
    
    // Also check if URL contains 'playlist' in the path (not query string)
    if (normalizedUrl.includes('rubyplayer.pages.dev/playlist?') || 
        normalizedUrl.includes('rubyplayer.pages.dev/playlist/?')) {
      console.log('✓ Detected Playlist Deeplink (alternate format)');
      return await handlePlaylistDeeplink(normalizedUrl);
    }
    
    // Check if it's an Android Intent URL
    if (url.startsWith('intent:')) {
      console.log('Detected Android Intent URL');
      const config = parseIntentURL(url);
      
      // Convert to channel format
      const channel = {
        url: config.url,
        name: config.name,
        logo: '',
        category: 'Intent',
        id: 'intent-' + Date.now(),
        headers: {
          userAgent: config.userAgent,
          referer: config.referer,
          origin: config.origin,
          cookies: config.cookies
        },
        drm: {}
      };
      
      // Add DRM if present
      if (config.drmScheme && config.drmScheme !== 'none') {
        channel.drm.scheme = config.drmScheme;
        if (config.keyId && config.key) {
          channel.drm.keyId = config.keyId;
          channel.drm.key = config.key;
        }
        if (config.drmUrl) {
          channel.drm.licenseUrl = config.drmUrl;
        }
      }
      
      console.log('Playing channel from Intent:', channel);
      
      // Switch to IPTV tab
      const iptvTab = document.querySelector('[data-tab="iptv"]');
      if (iptvTab) {
        iptvTab.click();
      }
      
      // Play the channel
      if (window.iptvManager && typeof window.iptvManager.playChannel === 'function') {
        window.iptvManager.playChannel(channel);
      } else {
        console.error('iptvManager.playChannel not available');
        alert('Failed to play Intent: Player not ready');
      }
      
      return channel;
    }

    console.log('Raw URL:', url);
    console.log('URL length:', url.length);
    
    // Handle both formats:
    // 1. https://rubyplayer.pages.dev/play?data=...
    // 2. rubyplayer://play?data=...
    let urlObj;
    
    if (url.startsWith('rubyplayer://')) {
      // Clean up URL - remove extra slashes and handle both play/ and play
      let cleanUrl = url.replace('rubyplayer://play//', 'rubyplayer://play/');
      cleanUrl = cleanUrl.replace('rubyplayer://play/?', 'rubyplayer://play?');
      cleanUrl = cleanUrl.replace('rubyplayer://play/', 'rubyplayer://play');
      
      // Convert custom scheme to https for URL parsing
      const httpsUrl = cleanUrl.replace('rubyplayer://', 'https://rubyplayer.pages.dev/');
      console.log('Cleaned URL:', cleanUrl);
      console.log('Converted to HTTPS URL:', httpsUrl);
      urlObj = new URL(httpsUrl);
    } else {
      urlObj = new URL(url);
    }
    
    const encryptedData = urlObj.searchParams.get('data');
    
    if (!encryptedData) {
      throw new Error('No data parameter in deeplink');
    }
    
    console.log('Encrypted data length:', encryptedData.length);
    console.log('Encrypted data (first 100 chars):', encryptedData.substring(0, 100));
    console.log('Encrypted data (last 20 chars):', encryptedData.substring(encryptedData.length - 20));
    
    const streamData = await decryptStreamData(encryptedData);
    
    console.log('=== Decrypted Stream Data ===');
    console.log('Raw data:', streamData);
    
    // Check if this is playlist data (has only name and url, no other channel fields)
    const dataKeys = Object.keys(streamData);
    console.log('Data keys:', dataKeys);
    console.log('Has userAgent?', streamData.userAgent);
    console.log('Has referer?', streamData.referer);
    console.log('Has drmScheme?', streamData.drmScheme);
    
    const isPlaylist = dataKeys.length <= 4 && 
                       streamData.name && 
                       streamData.url && 
                       !streamData.userAgent && 
                       !streamData.referer &&
                       !streamData.drmScheme;
    
    console.log('Is Playlist?', isPlaylist);
    
    if (isPlaylist) {
      console.log('✓✓✓ DETECTED AS PLAYLIST DATA (not channel) ✓✓✓');
      
      // Switch to IPTV tab
      const iptvNavBtn = document.querySelector('[data-view="iptv"]');
      if (iptvNavBtn) {
        console.log('Switching to IPTV tab');
        iptvNavBtn.click();
      } else {
        console.warn('IPTV nav button not found');
      }
      
      // Wait for tab to switch
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Show import confirmation dialog
      console.log('Showing import confirmation dialog...');
      const confirmed = confirm(
        `Import Playlist?\n\n` +
        `Name: ${streamData.name}\n` +
        `Channels: ${streamData.channelCount || 'Unknown'}\n` +
        `URL: ${streamData.url}\n\n` +
        `Click OK to import this playlist.`
      );
      
      console.log('User confirmed?', confirmed);
      
      if (confirmed && streamData.url) {
        // Import the playlist
        if (window.iptvManager && typeof window.iptvManager.addPlaylist === 'function') {
          console.log('Importing playlist...');
          await window.iptvManager.addPlaylist(streamData.name, streamData.url);
          alert('Playlist imported successfully!');
        } else {
          console.error('iptvManager.addPlaylist not available');
          console.log('window.iptvManager:', window.iptvManager);
          alert('Failed to import playlist: Manager not ready');
        }
      } else {
        console.log('Playlist import cancelled or no URL');
      }
      
      return { success: true, type: 'playlist', imported: confirmed };
    }
    
    console.log('Not a playlist, treating as channel...');
    console.log('URL:', streamData.url);
    console.log('Name:', streamData.name);
    console.log('User-Agent:', streamData.userAgent);
    console.log('Referer:', streamData.referer);
    console.log('Cookies:', streamData.cookies ? streamData.cookies.substring(0, 50) + '...' : 'none');
    console.log('DRM Scheme:', streamData.drmScheme);
    
    // Convert to channel format and play
    const channel = {
      url: streamData.url,
      name: streamData.name || streamData.title || 'Deeplink Stream',
      logo: streamData.logoUrl || '',
      category: streamData.group || 'Deeplink',
      id: streamData.streamId || '',
      headers: {
        userAgent: streamData.userAgent || '',
        referer: streamData.referer || '',
        origin: streamData.origin || '',
        cookies: streamData.cookies || ''
      },
      drm: {}
    };
    
    // Add DRM if present
    if (streamData.drmScheme) {
      channel.drm.scheme = streamData.drmScheme;
      if (streamData.clearKeyKid && streamData.clearKeyKey) {
        channel.drm.keyId = streamData.clearKeyKid;
        channel.drm.key = streamData.clearKeyKey;
      }
      if (streamData.drmLicenseUrl) {
        channel.drm.licenseUrl = streamData.drmLicenseUrl;
      }
    }
    
    console.log('=== Playing Channel ===');
    console.log('Channel object:', channel);
    
    // Switch to IPTV tab
    const iptvTab = document.querySelector('[data-tab="iptv"]');
    if (iptvTab) {
      console.log('Switching to IPTV tab');
      iptvTab.click();
    } else {
      console.warn('IPTV tab not found');
    }
    
    // Wait a moment for tab to switch
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Play the channel
    if (window.iptvManager && typeof window.iptvManager.playChannel === 'function') {
      console.log('Calling iptvManager.playChannel');
      window.iptvManager.playChannel(channel);
    } else {
      console.error('iptvManager.playChannel not available');
      console.log('window.iptvManager:', window.iptvManager);
      alert('Failed to play deeplink: Player not ready. Please try again.');
    }
    
    return channel;
  } catch (error) {
    console.error('=== Deeplink Handling Error ===');
    console.error('Error:', error);
    console.error('Stack:', error.stack);
    alert('Failed to open deeplink: ' + error.message);
    throw error;
  }
}

// Listen for deeplinks from Electron
if (window.electronAPI && window.electronAPI.onDeeplink) {
  window.electronAPI.onDeeplink((url) => {
    console.log('Received deeplink from Electron:', url);
    handleDeeplink(url);
  });
}

// Encrypt playlist data
async function encryptPlaylistData(playlistData) {
  try {
    const jsonString = JSON.stringify(playlistData);
    return await encryptStreamData(jsonString);
  } catch (error) {
    console.error('Playlist encryption error:', error);
    throw error;
  }
}

// Decrypt playlist data
async function decryptPlaylistData(encryptedData) {
  try {
    const decrypted = await decryptStreamData(encryptedData);
    // decryptStreamData already returns a parsed object, not a string
    // So we don't need to JSON.parse it again
    return decrypted;
  } catch (error) {
    console.error('Playlist decryption error:', error);
    throw error;
  }
}

// Generate playlist deeplink
async function generatePlaylistDeeplink(playlist) {
  try {
    // Prepare playlist data for sharing
    const playlistData = {
      name: playlist.name,
      url: playlist.url,
      logo: playlist.logo || '',
      channelCount: playlist.channelCount || 0
    };
    
    const encryptedData = await encryptPlaylistData(playlistData);
    return `https://rubyplayer.pages.dev/playlist?data=${encryptedData}`;
  } catch (error) {
    console.error('Error generating playlist deeplink:', error);
    throw error;
  }
}

// Handle playlist deeplink
async function handlePlaylistDeeplink(url) {
  try {
    console.log('=== Handling Playlist Deeplink ===');
    console.log('URL:', url);
    
    // Extract data parameter
    const urlObj = new URL(url);
    const encryptedData = urlObj.searchParams.get('data');
    
    if (!encryptedData) {
      throw new Error('No data parameter in playlist deeplink');
    }
    
    console.log('Encrypted playlist data (first 50 chars):', encryptedData.substring(0, 50));
    
    // Decrypt playlist data
    const playlistData = await decryptPlaylistData(encryptedData);
    console.log('Decrypted playlist:', playlistData);
    
    // Switch to IPTV tab first
    const iptvNavBtn = document.querySelector('[data-view="iptv"]');
    if (iptvNavBtn) {
      console.log('Switching to IPTV tab');
      iptvNavBtn.click();
    }
    
    // Wait for tab to switch
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Show import confirmation dialog
    console.log('Showing import dialog...');
    const confirmed = confirm(
      `Import Playlist?\n\n` +
      `Name: ${playlistData.name}\n` +
      `Channels: ${playlistData.channelCount || 'Unknown'}\n` +
      `URL: ${playlistData.url}\n\n` +
      `Click OK to import this playlist.`
    );
    
    console.log('User confirmed:', confirmed);
    
    if (confirmed && playlistData.url) {
      // Import the playlist
      if (window.iptvManager && typeof window.iptvManager.addPlaylist === 'function') {
        console.log('Importing playlist...');
        await window.iptvManager.addPlaylist(playlistData.name, playlistData.url);
        
        // Stay in playlist list view (don't open the playlist)
        console.log('Playlist imported, staying in list view');
        alert('Playlist imported successfully!');
      } else {
        console.error('iptvManager.addPlaylist not available');
        alert('Failed to import playlist: Manager not ready');
      }
    } else {
      console.log('Playlist import cancelled or no URL provided');
    }
    
    return { success: true, imported: confirmed };
  } catch (error) {
    console.error('Error handling playlist deeplink:', error);
    alert('Failed to import playlist: ' + error.message);
    throw error;
  }
}

// Export functions
window.deeplinkManager = {
  generateDeeplink,
  handleDeeplink,
  encryptStreamData,
  decryptStreamData,
  generatePlaylistDeeplink,
  handlePlaylistDeeplink
};

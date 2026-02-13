# VT Home - Streaming Platform

A comprehensive web-based streaming platform that provides access to live TV channels, movies, sports, and various entertainment content through multiple streaming services.

## 🌟 Features

### 📺 Live TV Streaming
- **JioTV Integration**: Access to numerous JioTV channels including news, entertainment, sports, and business
- **Multiple Platform Support**: Voot, Sony Liv, Tata Play, Sun NXT, Zee5
- **Channel Categories**: Entertainment, Sports, News, Business, Infotainment, Kids, Music
- **Search Functionality**: Real-time search across channels by name and description

### 🎬 Entertainment Content
- **Movies**: Extensive movie library with various genres
- **TV Shows**: Popular television series and shows
- **Music**: Music streaming and radio channels
- **Playlists**: Curated content playlists

### 📱 IPTV Player Apps
- **Mobile Players**: Network Stream, OTT Navigator (TV & Mobile versions), TV WoW
- **Desktop Players**: AuthoIPTV, Media Stream Player
- **Custom App**: TV WoW - proprietary streaming application

### 🎮 Gaming Integration
- **Steam Games Integration**: Direct download of Steam games
- **Game Tools**: Steam tools setup and configuration
- **Online Gaming Support**: Night Light Launcher for online games

### 🔧 DRM Video Player
- **Advanced Playback**: Support for DRM-protected content
- **Multiple Formats**: MPD (DASH) and HLS streaming
- **DRM Support**: ClearKey and Widevine DRM
- **Custom Configuration**: License URL and key management

## 🏗️ Project Structure

```
hotstar/
├── index.html              # Main landing page
├── play2.html              # DRM video player
├── s.html                  # Steam games download interface
├── data.json               # Channel and streaming data
├── .htaccess               # URL rewriting rules
├── assets/                 # Static assets
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── jio.js          # Search functionality
│   └── imgs/               # Images and icons
├── app/                    # IPTV player applications
│   ├── index.html          # App store interface
│   ├── app.html            # App details page
│   ├── apps.json           # App metadata
│   └── *.apk               # Android applications
├── live/                   # Live TV streaming pages
│   ├── jio/                # JioTV channels
│   ├── voot/               # Voot streaming
│   ├── sony-liv/           # Sony Liv content
│   ├── play/               # Tata Play
│   ├── sunnxt/             # Sun NXT
│   └── zee/                # Zee5
├── ott/                    # OTT platform content
│   ├── movie/              # Movie library
│   ├── music.html          # Music streaming
│   ├── playlist.html       # Content playlists
│   ├── radio/              # Radio channels
│   └── tvshow.html         # TV shows
├── sports/                 # Sports content
│   ├── ipl/                # IPL cricket
│   ├── fc/                 # Football clubs
│   ├── live/               # Live sports
│   ├── sony/               # Sony sports
│   └── t20/                # T20 cricket
├── chat/                   # Chat functionality
└── imdb/                   # IMDB integration
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Stable internet connection
- For mobile apps: Android device with "Unknown Sources" enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PiyushDixit96/hotstar.git
   cd hotstar
   ```

2. **Serve the application**
   - Using Python:
     ```bash
     python -m http.server 8000
     ```
   - Using Node.js:
     ```bash
     npx serve .
     ```
   - Using PHP:
     ```bash
     php -S localhost:8000
     ```

3. **Access the application**
   Open your browser and navigate to `http://localhost:8000`

## 📱 Mobile Applications

### Available Apps
1. **Network Stream [Premium]** - Advanced mobile streaming player
2. **OTT Navigator TV [Premium]** - TV-optimized IPTV player
3. **OTT Navigator Mobile [Premium]** - Mobile-optimized IPTV player
4. **TV WoW (Our App)** - Custom streaming application
5. **AuthoIPTV PC/Mac OS** - Desktop IPTV player
6. **Media Stream Player (PC)** - PC streaming player

### Installation Steps
1. Navigate to the `/app` directory
2. Browse available applications
3. Click on any app to view details
4. Download the APK file
5. Install on your Android device
6. Configure with your streaming credentials

## 🎮 Gaming Integration

### Steam Games Download
1. Install Steam tools from `st-setup-1.8.16(tool).exe`
2. Enable "Unlock Mode" and "Launch on Steam"
3. Get Game ID from steamdb.info
4. Enter Game ID on the download page
5. Download and extract ZIP file
6. Drag files to Steam Tools icon
7. Restart Steam and enjoy the game

### Online Gaming
For online games like RDR2:
1. Download Night Light Launcher
2. Configure with the game files
3. Launch through the custom launcher

## 🔧 DRM Video Player Usage

### Supported Formats
- **DASH (.mpd)**: Dynamic Adaptive Streaming over HTTP
- **HLS (.m3u8)**: HTTP Live Streaming

### DRM Configuration
1. **ClearKey**: Enter key ID and key in format `keyId:key`
2. **Widevine**: Provide license server URL
3. **ClearKey URL**: Fetch keys from remote endpoint

### Steps
1. Open `play2.html`
2. Enter your streaming URL (MPD or HLS)
3. Provide DRM keys if required
4. Click "Play Video" to start streaming

## 🎯 Key Features

### Search Functionality
- Real-time search across all channels
- Filters by channel name and description
- Instant results as you type

### Responsive Design
- Mobile-friendly interface
- Adaptive layouts for all screen sizes
- Touch-optimized controls

### Multi-Platform Support
- Web-based streaming
- Android applications
- Desktop players
- Smart TV compatibility

## 🌐 Streaming Services Integration

### Supported Platforms
- **JioTV**: 500+ channels across categories
- **Voot**: Entertainment and reality shows
- **Sony Liv**: Movies, sports, and original content
- **Tata Play**: DTH streaming services
- **Sun NXT**: South Indian content
- **Zee5**: Movies and original series

### Channel Categories
- Entertainment (Colors HD, Sony SAB, etc.)
- Sports (Sony Ten, Star Sports, etc.)
- News (CNBC, Aaj Tak, etc.)
- Business (CNBC TV18, etc.)
- Infotainment (History TV18, etc.)
- Kids (Cartoon Network, etc.)
- Music (MTV, etc.)

## 🔒 Security & Privacy

### Content Protection
- DRM-protected content support
- Secure streaming protocols
- Encrypted key management

### User Privacy
- No personal data collection
- Anonymous streaming
- No registration required

## 🛠️ Technical Details

### Frontend Technologies
- **HTML5**: Modern semantic markup
- **CSS3**: Responsive design with animations
- **JavaScript**: Interactive functionality
- **Font Awesome**: Icon library
- **Ionicons**: Additional icon set

### Streaming Protocols
- **HLS**: HTTP Live Streaming
- **DASH**: Dynamic Adaptive Streaming
- **MP4**: Direct video playback

### DRM Systems
- **Widevine**: Google's DRM solution
- **ClearKey**: Simple key-based DRM
- **Custom License Servers**: Flexible integration

## 📊 Performance Optimization

### Image Optimization
- Lazy loading for images
- WebP format support
- Responsive image sizing

### Streaming Optimization
- Adaptive bitrate streaming
- CDN integration
- Buffer management

## 🔄 Updates & Maintenance

### Content Updates
- Regular channel list updates
- New streaming service integrations
- Application updates

### Bug Reports & Features
- Report issues via GitHub Issues
- Feature requests welcome
- Community contributions encouraged

## 📞 Support

### Telegram Community
- Join the Telegram channel for updates: https://t.me/vaathala1
- Get support and tutorials
- Connect with other users

### Documentation
- Installation guides
- Video tutorials available
- Step-by-step setup instructions

## ⚠️ Disclaimer

This project is for educational purposes only. Users should ensure they have proper rights and permissions to access the streaming content. The developers are not responsible for any misuse of this platform.

## 📄 License

This project is open-source and available under the MIT License. Feel free to contribute, fork, or use it for your own projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Enjoy your streaming experience! 🎬📺🎮**

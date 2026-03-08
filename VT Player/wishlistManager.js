// Wishlist Manager
class WishlistManager {
  constructor() {
    this.wishlist = [];
    this.loadWishlist();
    this.initializeUI();
  }

  // Load wishlist from localStorage
  loadWishlist() {
    try {
      const saved = localStorage.getItem('wishlist');
      this.wishlist = saved ? JSON.parse(saved) : [];
      console.log('Loaded wishlist:', this.wishlist.length, 'items');
    } catch (error) {
      console.error('Error loading wishlist:', error);
      this.wishlist = [];
    }
  }

  // Save wishlist to localStorage
  saveWishlist() {
    try {
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
      console.log('Saved wishlist:', this.wishlist.length, 'items');
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  }

  // Add item to wishlist
  addToWishlist(item) {
    // Check if already in wishlist
    const exists = this.wishlist.some(w => w.url === item.url);
    if (exists) {
      this.showNotification('Already in wishlist', 'warning');
      return false;
    }

    // Add timestamp
    const wishlistItem = {
      ...item,
      addedAt: Date.now(),
      id: Date.now() + Math.random()
    };

    this.wishlist.unshift(wishlistItem);
    this.saveWishlist();
    this.showNotification('Added to wishlist', 'success');
    this.updateWishlistCount();
    
    // Refresh UI if on wishlist tab
    if (document.getElementById('wishlist-sidebar').classList.contains('active')) {
      this.renderWishlist();
    }
    
    return true;
  }

  // Remove item from wishlist
  removeFromWishlist(id) {
    const index = this.wishlist.findIndex(w => w.id === id);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
      this.saveWishlist();
      this.showNotification('Removed from wishlist', 'success');
      this.updateWishlistCount();
      this.renderWishlist();
      return true;
    }
    return false;
  }

  // Check if item is in wishlist
  isInWishlist(url) {
    return this.wishlist.some(w => w.url === url);
  }

  // Clear all wishlist
  clearWishlist() {
    if (confirm('Are you sure you want to clear all wishlist items?')) {
      this.wishlist = [];
      this.saveWishlist();
      this.showNotification('Wishlist cleared', 'success');
      this.updateWishlistCount();
      this.renderWishlist();
    }
  }

  // Update wishlist count badge
  updateWishlistCount() {
    const badge = document.getElementById('wishlistCountBadge');
    if (badge) {
      badge.textContent = this.wishlist.length;
      badge.style.display = this.wishlist.length > 0 ? 'flex' : 'none';
    }
  }

  // Play wishlist item
  playWishlistItem(item) {
    console.log('Playing wishlist item:', item.name);
    
    const config = {
      cookies: item.headers?.cookies || '',
      referer: item.headers?.referer || '',
      origin: item.headers?.origin || '',
      userAgent: item.headers?.userAgent || '',
      drmUrl: item.drm?.licenseUrl || '',
      drmScheme: item.drm?.scheme || 'none'
    };

    window.videoPlayer.playVideoWithConfig(item.url, item.name, config);
  }

  // Share wishlist item
  shareWishlistItem(item) {
    const shareData = {
      name: item.name,
      url: item.url,
      logo: item.logo,
      category: item.category,
      headers: item.headers,
      drm: item.drm
    };

    const shareText = JSON.stringify(shareData, null, 2);
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareText).then(() => {
      this.showNotification('Channel data copied to clipboard', 'success');
    }).catch(err => {
      console.error('Failed to copy:', err);
      this.showNotification('Failed to copy', 'error');
    });
  }

  // Export wishlist as M3U
  exportWishlist() {
    if (this.wishlist.length === 0) {
      this.showNotification('Wishlist is empty', 'warning');
      return;
    }

    let m3u = '#EXTM3U\n\n';
    
    this.wishlist.forEach(item => {
      m3u += `#EXTINF:-1 tvg-logo="${item.logo || ''}" group-title="${item.category || 'Wishlist'}",${item.name}\n`;
      
      // Add headers if present
      if (item.headers?.userAgent) {
        m3u += `#EXTVLCOPT:http-user-agent=${item.headers.userAgent}\n`;
      }
      if (item.headers?.referer) {
        m3u += `#EXTVLCOPT:http-referrer=${item.headers.referer}\n`;
      }
      if (item.headers?.origin) {
        m3u += `#EXTVLCOPT:http-origin=${item.headers.origin}\n`;
      }
      
      m3u += `${item.url}\n\n`;
    });

    // Download as file
    const blob = new Blob([m3u], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wishlist_${Date.now()}.m3u`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showNotification('Wishlist exported', 'success');
  }

  // Render wishlist UI
  renderWishlist() {
    const container = document.getElementById('wishlistContainer');
    if (!container) return;

    if (this.wishlist.length === 0) {
      container.innerHTML = `
        <div class="empty-wishlist">
          <i class="fas fa-star empty-icon"></i>
          <h3>No items in wishlist</h3>
          <p>Right-click on any channel to add it to your wishlist</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.wishlist.map(item => `
      <div class="wishlist-item" data-id="${item.id}" data-item='${this.escapeJson(item)}'>
        <div class="wishlist-item-logo">
          ${item.logo ? `<img src="${item.logo}" alt="${item.name}" onerror="this.src='logo.png'">` : '<i class="fas fa-tv"></i>'}
        </div>
        <div class="wishlist-item-info">
          <div class="wishlist-item-name">${this.escapeHtml(item.name)}</div>
          <div class="wishlist-item-meta">
            <span class="wishlist-item-category">${this.escapeHtml(item.category || 'Uncategorized')}</span>
            <span class="wishlist-item-date">${this.formatDate(item.addedAt)}</span>
          </div>
        </div>
      </div>
    `).join('');
    
    // Add event listeners to wishlist items
    container.querySelectorAll('.wishlist-item').forEach(itemEl => {
      const itemData = JSON.parse(itemEl.getAttribute('data-item'));
      
      // Left click to play
      itemEl.addEventListener('click', () => {
        this.playWishlistItem(itemData);
      });
      
      // Right click for context menu
      itemEl.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.showContextMenu) {
          window.showContextMenu(e, itemData);
        }
      });
    });
  }

  // Initialize UI elements
  initializeUI() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupUI());
    } else {
      this.setupUI();
    }
  }

  setupUI() {
    // Update count badge
    this.updateWishlistCount();

    // Clear all button
    const clearBtn = document.getElementById('wishlistClearBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearWishlist());
    }

    // Export button
    const exportBtn = document.getElementById('wishlistExportBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportWishlist());
    }

    // Search functionality
    const searchInput = document.getElementById('wishlistSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.searchWishlist(e.target.value));
    }

    // Sort button
    const sortBtn = document.getElementById('wishlistSortBtn');
    if (sortBtn) {
      sortBtn.addEventListener('click', () => this.toggleSort());
    }

    // Render initial wishlist
    this.renderWishlist();
  }

  // Search wishlist
  searchWishlist(query) {
    const items = document.querySelectorAll('.wishlist-item');
    const lowerQuery = query.toLowerCase();

    items.forEach(item => {
      const name = item.querySelector('.wishlist-item-name').textContent.toLowerCase();
      const category = item.querySelector('.wishlist-item-category').textContent.toLowerCase();
      
      if (name.includes(lowerQuery) || category.includes(lowerQuery)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Toggle sort order
  toggleSort() {
    const sortBtn = document.getElementById('wishlistSortBtn');
    const icon = sortBtn.querySelector('i');
    
    if (icon.classList.contains('fa-sort-alpha-down')) {
      // Sort A-Z
      this.wishlist.sort((a, b) => a.name.localeCompare(b.name));
      icon.classList.remove('fa-sort-alpha-down');
      icon.classList.add('fa-sort-alpha-up');
    } else {
      // Sort by date (newest first)
      this.wishlist.sort((a, b) => b.addedAt - a.addedAt);
      icon.classList.remove('fa-sort-alpha-up');
      icon.classList.add('fa-sort-alpha-down');
    }
    
    this.saveWishlist();
    this.renderWishlist();
  }

  // Utility: Escape HTML
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Utility: Escape JSON for HTML attribute
  escapeJson(obj) {
    return JSON.stringify(obj).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Utility: Format date
  formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString();
  }

  // Show notification
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize wishlist manager
window.wishlistManager = new WishlistManager();

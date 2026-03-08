// Context Menu Handler
class ContextMenuHandler {
  constructor() {
    this.currentItem = null;
    this.contextMenu = null;
    this.initializeContextMenu();
  }

  initializeContextMenu() {
    this.contextMenu = document.getElementById('contextMenu');
    
    // Context menu items
    const playBtn = document.getElementById('contextPlayChannel');
    const addWishlistBtn = document.getElementById('contextAddWishlist');
    const removeWishlistBtn = document.getElementById('contextRemoveWishlist');
    const copyUrlBtn = document.getElementById('contextCopyUrl');
    const shareBtn = document.getElementById('contextShareChannel');

    // Play channel
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (this.currentItem) {
          this.playItem(this.currentItem);
        }
        this.hideContextMenu();
      });
    }

    // Add to wishlist
    if (addWishlistBtn) {
      addWishlistBtn.addEventListener('click', () => {
        if (this.currentItem && window.wishlistManager) {
          window.wishlistManager.addToWishlist(this.currentItem);
        }
        this.hideContextMenu();
      });
    }

    // Remove from wishlist
    if (removeWishlistBtn) {
      removeWishlistBtn.addEventListener('click', () => {
        if (this.currentItem && window.wishlistManager) {
          window.wishlistManager.removeFromWishlist(this.currentItem.id);
        }
        this.hideContextMenu();
      });
    }

    // Copy deeplink
    if (copyUrlBtn) {
      copyUrlBtn.addEventListener('click', async () => {
        if (this.currentItem && window.deeplinkManager) {
          try {
            const deeplink = await window.deeplinkManager.generateDeeplink(this.currentItem);
            await navigator.clipboard.writeText(deeplink);
            if (window.wishlistManager) {
              window.wishlistManager.showNotification('Deeplink copied to clipboard', 'success');
            }
          } catch (error) {
            console.error('Failed to copy deeplink:', error);
            if (window.wishlistManager) {
              window.wishlistManager.showNotification('Failed to copy deeplink', 'error');
            }
          }
        }
        this.hideContextMenu();
      });
    }

    // Share channel (copy JSON data)
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        if (this.currentItem && window.wishlistManager) {
          window.wishlistManager.shareWishlistItem(this.currentItem);
        }
        this.hideContextMenu();
      });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.contextMenu && !this.contextMenu.contains(e.target)) {
        this.hideContextMenu();
      }
    });

    // Close menu on scroll
    document.addEventListener('scroll', () => {
      this.hideContextMenu();
    }, true);
  }

  showContextMenu(event, item) {
    event.preventDefault();
    event.stopPropagation();

    this.currentItem = item;

    // Update menu items visibility based on context
    const addWishlistBtn = document.getElementById('contextAddWishlist');
    const removeWishlistBtn = document.getElementById('contextRemoveWishlist');

    if (window.wishlistManager) {
      const isInWishlist = window.wishlistManager.isInWishlist(item.url);
      
      if (addWishlistBtn) {
        addWishlistBtn.style.display = isInWishlist ? 'none' : 'flex';
      }
      if (removeWishlistBtn) {
        removeWishlistBtn.style.display = isInWishlist ? 'flex' : 'none';
      }
    }

    // Position menu at cursor
    const x = event.pageX;
    const y = event.pageY;
    
    // Show menu first to get dimensions
    this.contextMenu.classList.remove('hidden');
    this.contextMenu.classList.add('show');
    
    const menuRect = this.contextMenu.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Adjust position if menu would go off screen
    let finalX = x;
    let finalY = y;
    
    if (x + menuRect.width > windowWidth) {
      finalX = windowWidth - menuRect.width - 10;
    }
    
    if (y + menuRect.height > windowHeight) {
      finalY = windowHeight - menuRect.height - 10;
    }
    
    this.contextMenu.style.left = finalX + 'px';
    this.contextMenu.style.top = finalY + 'px';
  }

  hideContextMenu() {
    if (this.contextMenu) {
      this.contextMenu.classList.remove('show');
      setTimeout(() => {
        this.contextMenu.classList.add('hidden');
      }, 150);
    }
    this.currentItem = null;
  }

  playItem(item) {
    console.log('Playing item:', item.name);
    
    const config = {
      cookies: item.headers?.cookies || '',
      referer: item.headers?.referer || '',
      origin: item.headers?.origin || '',
      userAgent: item.headers?.userAgent || '',
      drmUrl: item.drm?.licenseUrl || '',
      drmScheme: item.drm?.scheme || 'none'
    };

    if (window.videoPlayer) {
      window.videoPlayer.playVideoWithConfig(item.url, item.name, config);
    }
  }
}

// Initialize context menu handler
window.contextMenuHandler = new ContextMenuHandler();

// Helper function to show context menu (for use in other files)
window.showContextMenu = function(event, item) {
  if (window.contextMenuHandler) {
    window.contextMenuHandler.showContextMenu(event, item);
  }
};

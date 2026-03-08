// Theme Manager - Ruby Player

// Load saved theme on startup
function loadTheme() {
  const savedTheme = localStorage.getItem('rubyPlayerTheme') || 'light';
  applyTheme(savedTheme);
}

// Apply theme
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
  
  // Save to localStorage
  localStorage.setItem('rubyPlayerTheme', theme);
  
  console.log('Theme applied:', theme);
}

// Toggle theme
function toggleTheme() {
  const isDark = document.body.classList.contains('dark-theme');
  const newTheme = isDark ? 'light' : 'dark';
  applyTheme(newTheme);
}

// Get current theme
function getCurrentTheme() {
  return document.body.classList.contains('dark-theme') ? 'dark' : 'light';
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
  // Load saved theme
  loadTheme();
  
  // Setup theme toggle button
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  
  console.log('Theme Manager initialized. Current theme:', getCurrentTheme());
});

// Export functions for use in other scripts
window.themeManager = {
  loadTheme,
  applyTheme,
  toggleTheme,
  getCurrentTheme
};

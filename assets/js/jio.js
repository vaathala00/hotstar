		 // Get search input elements
const searchInput = document.getElementById('searchInput');
const mainSearchInput = document.getElementById('mainSearch');

// Add input event listener with debouncing for better performance
let searchTimeout;
function addSearchListener(input) {
  if (input) {
    input.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(filterData, 300);
    });
  }
}

// Add listeners to both search inputs
addSearchListener(searchInput);
addSearchListener(mainSearchInput);

// Search functionality
function filterData() {
  // Get the active search input value
  const activeSearchInput = document.activeElement.id === 'mainSearch' ? mainSearchInput : searchInput;
  const updatedSearchValue = activeSearchInput ? activeSearchInput.value.toLowerCase().trim() : '';

  // Sync both search inputs
  if (searchInput && mainSearchInput) {
    if (document.activeElement.id === 'mainSearch' && searchInput) {
      searchInput.value = updatedSearchValue;
    } else if (document.activeElement.id === 'searchInput' && mainSearchInput) {
      mainSearchInput.value = updatedSearchValue;
    }
  }

  // Get all box elements
  const boxes = document.querySelectorAll('.box1');

  boxes.forEach((box) => {
    const h2Element = box.querySelector('h2');
    const pElement = box.querySelector('p');
    
    // Handle cases where elements might not exist
    if (!h2Element || !pElement) {
      box.style.display = 'none';
      return;
    }
    
    const h2Text = h2Element.textContent.toLowerCase();
    const pText = pElement.textContent.toLowerCase();

    if (h2Text.includes(updatedSearchValue) || pText.includes(updatedSearchValue)) {
      box.style.display = 'block';
      // Add animation for better UX
      box.style.animation = 'fadeIn 0.3s ease-in';
    } else {
      box.style.display = 'none';
    }
  });

  // Show "no results" message if needed
  const visibleBoxes = Array.from(boxes).filter(box => box.style.display !== 'none');
  const container = document.getElementById('listContainer');
  
  if (container) {
    // Remove existing no-results message
    const existingMessage = container.querySelector('.no-results');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Add no-results message if no boxes are visible
    if (visibleBoxes.length === 0 && updatedSearchValue !== '') {
      const noResultsMsg = document.createElement('div');
      noResultsMsg.className = 'no-results';
      noResultsMsg.textContent = 'No channels found';
      noResultsMsg.style.cssText = `
        grid-column: 1 / -1;
        text-align: center;
        padding: 20px;
        color: #666;
        font-size: 16px;
        grid-column: 1 / -1;
      `;
      container.appendChild(noResultsMsg);
    }
  }
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
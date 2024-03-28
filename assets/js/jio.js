		 // Get search input element
  const searchInput = document.getElementById('searchInput');

  // Add input event listener
  searchInput.addEventListener('input', filterData);

  // Search functionality
  function filterData() {
    const updatedSearchValue = searchInput.value.toLowerCase();

    // Get all box elements
    const boxes = document.querySelectorAll('.box1');

    boxes.forEach((box) => {
      const h2Text = box.querySelector('h2').textContent.toLowerCase();
      const pText = box.querySelector('p').textContent.toLowerCase();

      if (h2Text.includes(updatedSearchValue) || pText.includes(updatedSearchValue)) {
        box.style.display = 'block'; // Show matching box
      } else {
        box.style.display = 'none'; // Hide non-matching box
      }
    });
  }
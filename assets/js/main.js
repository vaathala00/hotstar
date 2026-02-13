// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

// Use both mouseover and touchstart for mobile compatibility
list.forEach((item) => {
  item.addEventListener("mouseover", activeLink);
  item.addEventListener("touchstart", activeLink);
});

// Menu Toggle with enhanced mobile support
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
  
  // Prevent body scroll when menu is open on mobile
  if (navigation.classList.contains("active")) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// Close menu when clicking outside on mobile
document.addEventListener('click', function(event) {
  const isClickInsideNavigation = navigation.contains(event.target);
  const isClickOnToggle = toggle.contains(event.target);
  
  if (!isClickInsideNavigation && !isClickOnToggle && navigation.classList.contains("active")) {
    navigation.classList.remove("active");
    main.classList.remove("active");
    document.body.style.overflow = '';
  }
});

// Handle window resize for better responsive behavior
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    navigation.classList.remove("active");
    main.classList.remove("active");
    document.body.style.overflow = '';
  }
});

// Add touch-friendly swipe gesture for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
  touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;
  
  // Swipe right to open menu
  if (swipeDistance > swipeThreshold && touchStartX < 50) {
    navigation.classList.add("active");
    main.classList.add("active");
    document.body.style.overflow = 'hidden';
  }
  
  // Swipe left to close menu
  if (swipeDistance < -swipeThreshold && navigation.classList.contains("active")) {
    navigation.classList.remove("active");
    main.classList.remove("active");
    document.body.style.overflow = '';
  }
}

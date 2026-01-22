// Grab elements
const hamburger = document.querySelector('.hamburger');
const navBlock = document.querySelector('.nav-block');

// Toggle navigation on hamburger click
hamburger.addEventListener('click', () => {
  // If nav is hidden, show it; if shown, hide it
  if (navBlock.style.display === 'block') {
    navBlock.style.display = 'none';
  } else {
    navBlock.style.display = 'block';
  }
});

// Optional: close nav when a link is clicked (mobile UX)
const navLinks = document.querySelectorAll('.nav-block a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navBlock.style.display = 'none';
  });
});
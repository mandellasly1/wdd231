// ====== NAVIGATION (Hamburger toggle) ======
const hamburger = document.querySelector('.hamburger');
const navMore = document.querySelector('.nav-more');

if (hamburger && navMore) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent event bubbling
    navMore.classList.toggle('open');
    hamburger.setAttribute(
      'aria-expanded',
      navMore.classList.contains('open') ? 'true' : 'false'
    );
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMore.contains(e.target) && !hamburger.contains(e.target)) {
      navMore.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ====== FOOTER YEAR ======
const yearSpan = document.getElementById('year');
if (yearSpan) {
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
}

// ====== WEATHER PLACEHOLDER ======
// If you want to fetch live weather later, you can plug in an API here.
// For now, this just demonstrates how you could update the DOM dynamically.
function updateWeather() {
  const tempNow = document.getElementById('tempNow');
  const condNow = document.getElementById('condNow');

  if (tempNow && condNow) {
    // Example static update
    tempNow.textContent = '29°F';
    condNow.textContent = 'Partly Cloudy';
  }
}
updateWeather();

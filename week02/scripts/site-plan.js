// ===============================
// Navigation Script for Site Plan
// ===============================

// Create mobile navigation dynamically
function createMobileNav() {
  const mobileNavList = document.querySelector('.nav-list.mobile-full');
  
  if (mobileNavList) {
    // Define all 7 links
    const allLinks = [
      { text: 'Home', href: '#', active: true },
      { text: 'Discover', href: '#', active: false },
      { text: 'Business Directory', href: '#', active: false },
      { text: 'Join', href: '#', active: false },
      { text: 'About', href: '#', active: false },
      { text: 'Podcast', href: '#', active: false },
      { text: 'Events', href: '#', active: false }
    ];
    
    // Clear existing content
    mobileNavList.innerHTML = '';
    
    // Create list items dynamically
    allLinks.forEach(link => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      if (link.active) {
        a.classList.add('active');
      }
      li.appendChild(a);
      mobileNavList.appendChild(li);
    });
    
    console.log('Mobile navigation created with', allLinks.length, 'links');
  } else {
    console.error('Mobile nav list not found!');
  }
}

// Call the function when page loads
createMobileNav();

// Mobile hamburger toggles mobile-full nav list (all 7 links on mobile)
const mobileHamburger = document.querySelector('.hamburger.mobile');
const mobileNavList = document.querySelector('.nav-list.mobile-full');

if (mobileHamburger && mobileNavList) {
  mobileHamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileNavList.classList.toggle('open');
    mobileHamburger.setAttribute('aria-expanded', isOpen);
    console.log('Mobile menu toggled:', isOpen);
  });
} else {
  console.error('Mobile hamburger or nav list not found!');
}

// Desktop "More" hamburger toggles dropdown (3 extra links

// Desktop "More" hamburger toggles dropdown (3 extra links)
const desktopHamburger = document.querySelector('.hamburger.desktop');
const navMore = document.querySelector('.nav-more');

if (desktopHamburger && navMore) {
  desktopHamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMore.classList.toggle('open');
    desktopHamburger.setAttribute('aria-expanded', isOpen);
    console.log('Desktop dropdown toggled:', isOpen);
  });
} else {
  console.error('Desktop hamburger or nav dropdown not found!');
}
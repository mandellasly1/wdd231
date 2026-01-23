// ===============================
// Navigation Script
// ===============================

// Create mobile navigation dynamically
function createMobileNav() {
  const mobileNavList = document.querySelector('.nav-list.mobile-full');
  
  if (mobileNavList) {
    const allLinks = [
      { text: 'Home', href: 'index.html', active: false },
      { text: 'Discover', href: 'discover.html', active: false },
      { text: 'Business Directory', href: 'directory.html', active: true },
      { text: 'Join', href: 'join.html', active: false },
      { text: 'About', href: 'about.html', active: false },
      { text: 'Podcast', href: 'podcast.html', active: false },
      { text: 'Events', href: 'events.html', active: false }
    ];
    
    mobileNavList.innerHTML = '';
    
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
  }
}

createMobileNav();

// Mobile hamburger toggle
const mobileHamburger = document.querySelector('.hamburger.mobile');
const mobileNavList = document.querySelector('.nav-list.mobile-full');

if (mobileHamburger && mobileNavList) {
  mobileHamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileNavList.classList.toggle('open');
    mobileHamburger.setAttribute('aria-expanded', isOpen);
  });
}

// Desktop "More" hamburger toggle
const desktopHamburger = document.querySelector('.hamburger.desktop');
const navMore = document.querySelector('.nav-more');

if (desktopHamburger && navMore) {
  desktopHamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMore.classList.toggle('open');
    desktopHamburger.setAttribute('aria-expanded', isOpen);
  });
}

// Close menus when clicking outside
document.addEventListener('click', (event) => {
  if (mobileNavList && mobileHamburger) {
    const clickedInside = mobileNavList.contains(event.target) || mobileHamburger.contains(event.target);
    if (!clickedInside && mobileNavList.classList.contains('open')) {
      mobileNavList.classList.remove('open');
      mobileHamburger.setAttribute('aria-expanded', false);
    }
  }
  
  if (navMore && desktopHamburger) {
    const clickedInside = navMore.contains(event.target) || desktopHamburger.contains(event.target);
    if (!clickedInside && navMore.classList.contains('open')) {
      navMore.classList.remove('open');
      desktopHamburger.setAttribute('aria-expanded', false);
    }
  }
});

// Close on Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (mobileNavList && mobileNavList.classList.contains('open')) {
      mobileNavList.classList.remove('open');
      mobileHamburger.setAttribute('aria-expanded', false);
    }
    if (navMore && navMore.classList.contains('open')) {
      navMore.classList.remove('open');
      desktopHamburger.setAttribute('aria-expanded', false);
    }
  }
});

// ===============================
// Members Script
// ===============================

// Fetch and display members
async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

// Display members in container
function displayMembers(members) {
  const container = document.getElementById("membersContainer");
  container.innerHTML = ""; // clear before rendering

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" class="member-img" />
      <div class="member-info">
        <h2 class="member-name">${member.name}</h2>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
        <p>${member.info}</p>
      </div>
    `;

    container.appendChild(card);
  });
}


// Convert membership level number to text
function getMembershipLevel(level) {
  switch (level) {
    case 1: return "Member";
    case 2: return "Silver";
    case 3: return "Gold";
    default: return "Unknown";
  }
}

// Toggle between grid and list view
function setupViewToggle() {
  const gridBtn = document.getElementById("gridView");
  const listBtn = document.getElementById("listView");
  const container = document.getElementById("membersContainer");

  // Set initial view to grid
  container.classList.add("grid-view");
  container.classList.remove("list-view");
  gridBtn.classList.add("primary");
  listBtn.classList.remove("primary");

  gridBtn.addEventListener("click", () => {
    container.classList.remove("list-view");
    container.classList.add("grid-view");

    gridBtn.classList.add("primary");
    listBtn.classList.remove("primary");
  });

  listBtn.addEventListener("click", () => {
    container.classList.remove("grid-view");
    container.classList.add("list-view");

    listBtn.classList.add("primary");
    gridBtn.classList.remove("primary");
  });
}

// ===============================
// Footer Script
// ===============================

function updateFooter() {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
}

// ===============================
// Initialize
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  loadMembers();
  setupViewToggle();
  updateFooter();
});


// Display members in container
function displayMembers(members) {
  const container = document.getElementById("membersContainer");
  container.innerHTML = ""; // clear before rendering

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" class="member-img" />
      <div class="member-info">
        <h2 class="member-name">${member.name}</h2>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
        <p>${member.info}</p>
      </div>
    `;

    // Set image dimensions dynamically
    const img = card.querySelector('.member-img');
    img.style.width = '100px';
    img.style.height = '100px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '50%';
    img.style.marginBottom = '0.5rem';

    container.appendChild(card);
  });
}
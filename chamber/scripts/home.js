// ===============================
// Navigation Script
// ===============================
function createMobileNav() {
  const mobileNavList = document.querySelector('.nav-list.mobile-full');
  if (mobileNavList) {
    const allLinks = [
      { text: 'Home', href: 'index.html', active: true },
      { text: 'Discover', href: 'discover.html', active: false },
      { text: 'Business Directory', href: 'directory.html', active: false },
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
      if (link.active) a.classList.add('active');
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
  mobileHamburger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = mobileNavList.classList.toggle('open');
    mobileHamburger.setAttribute('aria-expanded', isOpen);
  });
}

// Desktop "More" hamburger toggle
const desktopHamburger = document.querySelector('.hamburger.desktop');
const navMore = document.querySelector('.nav-more');
if (desktopHamburger && navMore) {
  desktopHamburger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = navMore.classList.toggle('open');
    desktopHamburger.setAttribute('aria-expanded', isOpen);
  });
}

// Close menus when clicking outside
document.addEventListener('click', event => {
  if (mobileNavList && mobileHamburger) {
    if (!mobileNavList.contains(event.target) && !mobileHamburger.contains(event.target)) {
      mobileNavList.classList.remove('open');
      mobileHamburger.setAttribute('aria-expanded', false);
    }
  }
  if (navMore && desktopHamburger) {
    if (!navMore.contains(event.target) && !desktopHamburger.contains(event.target)) {
      navMore.classList.remove('open');
      desktopHamburger.setAttribute('aria-expanded', false);
    }
  }
});

// Close on Escape key
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (mobileNavList?.classList.contains('open')) {
      mobileNavList.classList.remove('open');
      mobileHamburger.setAttribute('aria-expanded', false);
    }
    if (navMore?.classList.contains('open')) {
      navMore.classList.remove('open');
      desktopHamburger.setAttribute('aria-expanded', false);
    }
  }
});

// ===============================
// Members Script
// ===============================
async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displayMembers(members) {
  // Filter for gold (3) and silver (2) members
  const goldSilverMembers = members.filter(member => 
    member.membershipLevel === 2 || member.membershipLevel === 3
  );
  
  // Randomly select 2-3 members
  const selectedMembers = [];
  const count = Math.floor(Math.random() * 2) + 2; // 2 or 3 members
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * goldSilverMembers.length);
    selectedMembers.push(goldSilverMembers[randomIndex]);
    goldSilverMembers.splice(randomIndex, 1);
  }
  
  // Display the selected members
  const container = document.getElementById("spotlightsContainer");
  if (!container) return;
  container.innerHTML = "";
  selectedMembers.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" class="member-img" />
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
      <p>${member.info}</p>
    `;
    const img = card.querySelector('.member-img');
    img.style.width = '100px';
    img.style.height = '100px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '50%';
    img.style.marginBottom = '12px';
    container.appendChild(card);
  });
}

function getMembershipLevel(level) {
  switch (level) {
    case 1: return "Member";
    case 2: return "Silver";
    case 3: return "Gold";
    default: return "Unknown";
  }
}

// ===============================
// Weather Script
// ===============================
// Weather API key (you'll need to get your own from OpenWeatherMap)
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function loadWeather() {
  try {
    const response = await fetch(`${BASE_URL}/weather?lat=4.7486&lon=7.0157&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    
    if (data.main) {
      const temp = Math.round(data.main.temp);
      const condition = data.weather.description;
      const icon = `https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`;
      
      // Update weather display
      document.querySelector('.weather-icon').src = icon;
      document.querySelector('.temp').textContent = `${temp}°C`;
      document.querySelector('.cond').textContent = condition.charAt(0).toUpperCase() + condition.slice(1);
      
      // Update forecast
      const forecastResponse = await fetch(`${BASE_URL}/forecast?lat=4.7486&lon=7.0157&appid=${API_KEY}&units=metric`);
      const forecastData = await forecastResponse.json();
      
      const today = new Date().getDate();
      const forecast = forecastData.list.filter(item => {
        const date = new Date(item.dt * 1000).getDate();
        return date === today;
      });
      
      if (forecast.length > 0) {
        const high = Math.round(Math.max(...forecast.map(f => f.main.temp_max)));
        const low = Math.round(Math.min(...forecast.map(f => f.main.temp_min)));
        
        document.querySelector('.hi').textContent = `High: ${high}°C`;
        document.querySelector('.lo').textContent = `Low: ${low}°C`;
      }
      
      // Update humidity and sun times
      document.querySelector('.humidity').textContent = `Humidity: ${data.main.humidity}%`;
      document.querySelector('.sunrise').textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
      document.querySelector('.sunset').textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
    }
  } catch (error) {
    console.error("Error loading weather data:", error);
  }
}

// ===============================
// Footer Script (from your first JS)
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
  updateFooter();
  loadWeather();
});
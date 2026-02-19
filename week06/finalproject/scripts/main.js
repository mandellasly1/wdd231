function createMobileNav() {
  const mobileNavList = document.querySelector('.nav-list.mobile-full');
  if (mobileNavList) {
    const allLinks = [
      { text: 'Home', href: 'index.html' },
      { text: 'Discover', href: 'discover.html' },
      { text: 'Journeys', href: 'journeys.html' },
      { text: 'Contact', href: 'contact.html' },
      { text: 'About', href: 'about.html' },
      { text: 'Blog', href: 'blog.html' },
      { text: 'Events', href: 'events.html' }
    ];
    mobileNavList.innerHTML = allLinks.map(link =>
      `<li><a href="${link.href}">${link.text}</a></li>`
    ).join('');
  }
}
createMobileNav();

// Mobile toggle
const mobileHamburger = document.querySelector('.hamburger.mobile');
const mobileNavList = document.querySelector('.nav-list.mobile-full');
if (mobileHamburger && mobileNavList) {
  mobileHamburger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = mobileNavList.classList.toggle('open');
    mobileHamburger.setAttribute('aria-expanded', isOpen);
  });
}

// Desktop "More" toggle
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

// Close on Escape
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (mobileNavList) mobileNavList.classList.remove('open');
    if (navMore) navMore.classList.remove('open');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const latitude = 4.8156;   // Port Harcourt
  const longitude = 7.0498;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Africa%2FLagos`;

  // Map weather codes to icons + text
  function getWeatherDescription(code) {
    const map = {
      0: "☀️ Clear sky",
      1: "🌤 Mainly clear",
      2: "⛅ Partly cloudy",
      3: "☁️ Overcast",
      45: "🌫 Fog",
      48: "🌫 Rime fog",
      51: "🌦 Light drizzle",
      53: "🌦 Moderate drizzle",
      55: "🌧 Heavy drizzle",
      61: "🌦 Light rain",
      63: "🌧 Moderate rain",
      65: "🌧 Heavy rain",
      80: "🌦 Rain showers",
      81: "🌧 Moderate showers",
      82: "🌧 Violent showers",
      95: "⛈ Thunderstorm",
      96: "⛈ Thunderstorm + hail",
      99: "⛈ Severe thunderstorm"
    };
    return map[code] || "🌍 Unknown";
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      // Current weather
      const current = data.current_weather;
      document.querySelector("#current-weather .temperature").textContent = `${current.temperature}°C`;
      document.querySelector("#current-weather .condition").textContent = getWeatherDescription(current.weathercode);
      document.querySelector("#current-weather .details").textContent =
        `Wind: ${current.windspeed} km/h | Time: ${current.time}`;

      // Forecast
      const forecastContainer = document.getElementById("forecast-weather");
      forecastContainer.innerHTML = "";

      data.daily.time.forEach((day, i) => {
        const min = data.daily.temperature_2m_min[i];
        const max = data.daily.temperature_2m_max[i];
        const code = data.daily.weathercode[i];

        const forecastEl = document.createElement("p");
        forecastEl.textContent = `${day}: ${min}°C – ${max}°C, ${getWeatherDescription(code)}`;
        forecastContainer.appendChild(forecastEl);
      });
    })
    .catch(err => console.error("Error fetching weather:", err));
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/events.json")
    .then(res => res.json())
    .then(events => {
      const list = document.getElementById("event-list");
      list.innerHTML = "";
      events.forEach(ev => {
        const li = document.createElement("li");
        li.innerHTML = `
          <h3>${ev.title}</h3>
          <p>Date: ${ev.date} | Location: ${ev.location}</p>
          <a href="${ev.link}" class="btn">Join Us</a>
        `;
        list.appendChild(li);
      });
    })
    .catch(err => console.error("Error loading events:", err));
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("event-form-modal");
  const openBtn = document.querySelector(".share-event");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("event-form");
  const list = document.getElementById("event-list");

  // Open modal
  openBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close if clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = form.title.value;
    const date = form.date.value;
    const location = form.location.value;
    const link = form.link.value || "#";

    const li = document.createElement("li");
    li.innerHTML = `
      <h3>${title}</h3>
      <p>Date: ${date} | Location: ${location}</p>
      <a href="${link}" class="btn">Join Us</a>
    `;
    list.appendChild(li);

    // Reset + close
    form.reset();
    modal.style.display = "none";
  });
});
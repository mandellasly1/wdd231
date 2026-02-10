// Check for localStorage visit data
function checkVisitStatus() {
  const lastVisit = localStorage.getItem('lastVisit');
  const now = new Date().getTime();
  
  if (!lastVisit) {
    // First visit
    document.getElementById('visitMessage').textContent = "Welcome! Let us know if you have any questions.";
    localStorage.setItem('lastVisit', now);
    return;
  }
  
  const lastVisitDate = parseInt(lastVisit);
  const daysSinceVisit = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));
  
  if (daysSinceVisit < 1) {
    document.getElementById('visitMessage').textContent = "Back so soon! Awesome!";
  } else {
    const dayWord = daysSinceVisit === 1 ? "day" : "days";
    document.getElementById('visitMessage').textContent = `You last visited ${daysSinceVisit} ${dayWord} ago.`;
  }
  
  // Update last visit
  localStorage.setItem('lastVisit', now);
}

// Display items
async function displayItems() {
  try {
    const response = await import('../data/discover.mjs');
    const items = response.items;
    
    const container = document.getElementById("discoverContainer");
    
    items.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('discover-card');
      
      card.innerHTML = `
        <figure>
          <img src="images/${item.image}" alt="${item.title}" />
        </figure>
        <div>
          <h2>${item.title}</h2>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button onclick="window.open('${item.link}', '_blank')">Learn More</button>
        </div>
      `;
      
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading items:", error);
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  checkVisitStatus();
  displayItems();
  
  // Update footer
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
});
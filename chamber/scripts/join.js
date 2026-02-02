// Set timestamp on form load
document.addEventListener("DOMContentLoaded", function() {
  const timestamp = new Date().toISOString();
  document.getElementById("timestamp").value = timestamp;
});

// Modal functionality
const modalButtons = document.querySelectorAll('[data-modal]');
const modals = {
  np: document.getElementById("npModal"),
  bronze: document.getElementById("bronzeModal"),
  silver: document.getElementById("silverModal"),
  gold: document.getElementById("goldModal")
};

modalButtons.forEach(button => {
  button.addEventListener("click", function() {
    const modalId = this.getAttribute("data-modal");
    const modal = modals[modalId];
    if (modal) {
      modal.style.display = "block";
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('timestamp').value = new Date().toLocaleString();
});

// Close modal functionality
const closeButtons = document.querySelectorAll(".close");
closeButtons.forEach(button => {
  button.addEventListener("click", function() {
    const modal = this.closest(".modal");
    if (modal) {
      modal.style.display = "none";
    }
  });
});

// Close modal when clicking outside
window.addEventListener("click", function(event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
});

// Close modal when pressing Escape key
window.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
      if (modal.style.display === "block") {
        modal.style.display = "none";
      }
    });
  }
});
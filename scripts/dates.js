// Find element with id="current-date"
const dateElement = document.getElementById('current-date');

document.getElementById("lastModified").innerHTML = document.lastModified;

if (dateElement) {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.textContent = today.toLocaleDateString(undefined, options);
}
// Mobile navigation toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('active');
});

// Simple form handling
document.querySelector('.newsletter button').addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.querySelector('.newsletter input').value;
    if (email && email.includes('@')) {
        alert('Thank you for subscribing! You will receive updates from Sport Nutrition Hub.');
    } else {
        alert('Please enter a valid email address.');
    }
});

// Example of data fetching functionality
async function fetchData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        // Process the data and display it on the page
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch data
fetchData();
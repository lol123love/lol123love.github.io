// Create a <style> element and add CSS styles
var style = document.createElement('style');
style.innerHTML = `
    /* Popup container */
    .popup {
        display: none;
        position: fixed;
        left: 0;
        bottom: 0; /* Position at the bottom of the viewport */
        width: 100%;
        height: auto; /* Adjust height as needed */
    }

    /* Popup overlay */
    .popup-overlay {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        z-index: 9999; /* Ensure it's above other elements */
    }

    /* Popup content */
    .popup-content {
        background-color: #f0f0f0; /* Light grey background */
        position: absolute;
        left: 50%;
        transform: translateX(-50%); /* Center horizontally */
        bottom: 10px; /* Add some space from the bottom */
        padding: 20px; /* Adjust padding as needed */
        border-radius: 10px; /* Rounded corners */
        border: 1px solid #ccc;
        width: 80%; /* 80% of the viewport width */
        max-width: 400px; /* Maximum width */
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 10000; /* Ensure it's above the overlay */
    }

    .popup-content h2,
    .popup-content p,
    .popup-content .popup-button {
        margin: 10px 0;
    }

    /* Button styles */
    .popup-button {
        background-color: #555; /* Dark grey background for buttons */
        color: #fff; /* White text color */
        padding: 10px 20px; /* Adjust padding as needed */
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px; /* Adjust margin as needed */
    }

    .popup-button:hover {
        background-color: #333; /* Darken the button color on hover */
    }

    /* Title styles */
    .popup-title {
        color: #333; /* Dark grey title color */
    }
`;

// Append the <style> element to the <head>
document.head.appendChild(style);

// Create the popup HTML content
var popupHTML = `
    <div class="popup" id="popup">
        <div class="popup-overlay"></div>
        <div class="popup-content">
            <h2 class="popup-title">Welcome to Our Website!</h2>
            <p>I would appreciate you donating to me by buying me a coffee☕. It helps me to keep posting and making more addons.</p>
            <a href="https://ba9chich.com/lol123love" target="_blank" class="popup-button">Buy me a coffee☕</a>
            <button onclick="closePopup()" class="popup-button">Close</button>
        </div>
    </div>
`;

// Append the popup HTML content to the <body>
document.body.insertAdjacentHTML('beforeend', popupHTML);

// Function to display the popup
function displayPopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'block';
}

// Function to close the popup
function closePopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
}

// Display the popup when the page loads
window.onload = function() {
    displayPopup();
};

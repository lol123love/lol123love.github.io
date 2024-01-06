document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.getElementById('menuBtn');
  const menuPopup = document.getElementById('menuPopup');
  const closeBtn = document.getElementById('closeBtn');

  menuBtn.addEventListener('click', function () {
      menuPopup.classList.toggle('show');
  });

  closeBtn.addEventListener('click', function () {
      menuPopup.classList.remove('show');
  });
});


document.addEventListener('DOMContentLoaded', function() {
  // Get references to the button and download popup
  const openButton = document.getElementById('openPopupButton');
  const downloadPopup = document.getElementById('downloadPopup'); // Update this line
  const closeButton = document.getElementById('closePopupButton');
  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  // Function to open the download popup
  function openDownloadPopup() {
    downloadPopup.style.display = 'block';
    overlay.style.display = 'block';
    document.body.appendChild(overlay);
  }

  // Function to close the download popup
  function closeDownloadPopup() {
    downloadPopup.style.display = 'none';
    overlay.style.display = 'none';
    document.body.removeChild(overlay);
  }

  // Add click event listeners
  openButton.addEventListener('click', openDownloadPopup);
  closeButton.addEventListener('click', closeDownloadPopup);
});


const allImages = document.querySelectorAll('img');

        // Loop through each image and add the loading="lazy" attribute
        allImages.forEach(image => {
            image.setAttribute('loading', 'lazy');
        });
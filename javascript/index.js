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

const allImages = document.querySelectorAll('img');

        // Loop through each image and add the loading="lazy" attribute
        allImages.forEach(image => {
            image.setAttribute('loading', 'lazy');
        });



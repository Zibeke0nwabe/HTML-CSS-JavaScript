// Function to handle user login
function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check if the username and password match the stored values in local storage
    var storedUsername = localStorage.getItem('username');
    var storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        // If match, redirect to dashboard page
        window.location.href = 'dashboard.html';
    } else {
        // Otherwise, show error message
        document.getElementById("passwordError").innerHTML = "Incorrect Username or Password.";
    }
}

// Function to handle user registration
function register() {
    var username = document.getElementById('reg-username').value;
    var password = document.getElementById('reg-password').value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    if (password != confirmPassword) {
        document.getElementById("passwordError").innerHTML = "Passwords do not match.";
        return false;
    } else
    // Store username and password in local storage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Redirect to login page
    window.location.href = 'dashboard.html';
}

// Function to handle user logout
function logout() {
    // Clear user data from local storage
    localStorage.removeItem('username');
    localStorage.removeItem('password');

    // Redirect to landing page
    window.location.href = 'index.html';
}

// Function to handle image upload
function uploadImage() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (file) {
        // Convert the file to base64 format
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var imageData = reader.result;

            // Save the image to local storage
            localStorage.setItem('image', imageData);

            // Display the image on the dashboard
            displayImage();
        };
    }
}

// Function to handle image display
function displayImage() {
    var imageContainer = document.getElementById('imageContainer');
    var imageData = localStorage.getItem('image');

    if (imageData) {
        // Display the image
        imageContainer.innerHTML = '<img src="' + imageData + '" alt="Uploaded Image">';
    }
}

// Function to handle image download
function downloadImage() {
    var imageData = localStorage.getItem('image');

    if (imageData) {
        // Convert the base64 image data to Blob
        var blob = dataURItoBlob(imageData);

        // Create a download link for the image
        var downloadLink = document.getElementById('downloadLink');
        downloadLink.href = URL.createObjectURL(blob);
    }
}

// Helper function to convert data URI to Blob
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

// Function to handle image upload
function uploadImage() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (file) {
        // Convert the file to base64 format
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var imageData = reader.result;

            // Save the image to local storage
            saveImageToLocalStorage(imageData);

            // Display the images on the dashboard
            displayImages();
        };
    }
}

// Function to save image data to local storage
function saveImageToLocalStorage(imageData) {
    // Check if images already exist in local storage
    var images = JSON.parse(localStorage.getItem('images')) || [];
    // Add the new image data to the array
    images.push(imageData);

    // Save the updated array back to local storage
    localStorage.setItem('images', JSON.stringify(images));
}

// Function to handle image display
function displayImages() {
    var imageContainer = document.getElementById('imageContainer');
    var images = JSON.parse(localStorage.getItem('images')) || [];

    // Clear the container before adding images
    imageContainer.innerHTML = '';

    if (images.length > 0) {
        // Loop through each image data and create a card for it
        images.forEach(function(imageData, index) {
            var card = document.createElement('div');
            card.classList.add('card');

            var img = document.createElement('img');
            img.src = imageData;
            img.alt = 'Uploaded Image';
            card.appendChild(img);

            var downloadBtn = document.createElement('button');
            downloadBtn.textContent = 'Download';
            downloadBtn.addEventListener('click', function() {
                downloadImage(imageData, index);
            });
            card.appendChild(downloadBtn);

            imageContainer.appendChild(card);
        });
    } else {
        imageContainer.innerHTML = '<p>No images uploaded Yet.</p>';
    }
}

// Function to handle image download
function downloadImage(imageData, index) {
    var blob = dataURItoBlob(imageData);

    // Create a download link for the image
    var downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'image_' + index + '.jpg';
    downloadLink.click();
}
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}
window.onload = displayImages;


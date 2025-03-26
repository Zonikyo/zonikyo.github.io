// Import games data
import { gamesData } from './scripts/games-data.js';

document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('image-gallery');

    if (!gallery) {
        console.error('Image gallery element not found.');
        return;
    }

    // Clear the gallery
    gallery.innerHTML = '';

    // Populate the gallery with games
    gamesData.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        gameCard.innerHTML = `
            <a href="${game.url}">
                <img src="${game.image}" alt="${game.title}">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
            </a>
        `;

        gallery.appendChild(gameCard);
    });

    // Gallery creation and search logic
    function createGalleryItem(game) {
        const item = document.createElement('div');
        item.className = 'image-item';
        item.innerHTML = `
          <img src="${game.image}" alt="${game.name}">
          <div class="overlay">
            <div class="text">
              <h3>${game.name}</h3>
              <p>${game.description}</p>
            </div>
          </div>
        `;
        item.addEventListener('click', () => {
          window.location.href = `/game-player.html#${game.url}`;
        });
        return item;
    }

    // Function to populate gallery
    function populateGallery(games) {
        gallery.innerHTML = ''; // Clear gallery
        games.forEach((game, index) => {
            const item = createGalleryItem(game);
            gallery.appendChild(item);
            // Staggered animation on load
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 50);
        });
    }

    // Load all games initially using global gamesData
    populateGallery(gamesData);

    // Search functionality
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value;
        const filteredGames = gamesData.filter(game => 
            game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            game.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        populateGallery(filteredGames);
    });
});

window.addEventListener('load', function() {
    var splashScreen = document.getElementById('splash-screen');
    setTimeout(function() {
        splashScreen.classList.add('fade-out');
        splashScreen.addEventListener('transitionend', function() {
            splashScreen.remove();
        });
    }, 1000);
});

const updateTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('current-time').innerText = timeString;

    const welcomeMessage = hours < 12 ? 'Good Morning!' : (hours < 18 ? 'Good Afternoon!' : 'Good Evening!');
    const welcomeElement = document.getElementById('welcome-message');
    welcomeElement.innerText = welcomeMessage;
};

setInterval(updateTime, 1000);
updateTime();

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBinlRoWNVyqsTgc75HiARRdPBtrcnlaY4",
    authDomain: "neonwave-arcade.firebaseapp.com",
    projectId: "neonwave-arcade",
    storageBucket: "neonwave-arcade.firebasestorage.app",
    messagingSenderId: "430507600648",
    appId: "1:430507600648:web:9c9e1bfd57ad5344e79abd",
    measurementId: "G-RY4QR9LLKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

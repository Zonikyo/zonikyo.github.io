// Import games data
import { gamesData } from './games-data.js';

document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('image-gallery');

    if (!gallery) {
        console.error('Error: The "image-gallery" element was not found in the DOM.');
        return;
    }

    // Clear the gallery before populating
    gallery.innerHTML = '';

    // Check if gamesData exists and has content
    if (!gamesData || gamesData.length === 0) {
        console.error('Error: No game data found.');
        gallery.innerHTML = '<p style="color: white;">No games available at the moment.</p>';
        return;
    }

    // Populate the gallery with game cards
    gamesData.forEach((game) => {
        // Validate game data
        if (!game.name || !game.image || !game.url) {
            console.warn('Warning: Missing game data for one of the entries.', game);
            return;
        }

        // Create a game card
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        gameCard.innerHTML = `
            <a href="${game.url}" target="_blank" rel="noopener noreferrer">
                <img src="${game.image}" alt="${game.name}">
                <h3>${game.name}</h3>
                <p>${game.description || 'No description available.'}</p>
            </a>
        `;

        // Append the game card to the gallery
        gallery.appendChild(gameCard);
    });

    console.log('Games loaded successfully.');
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

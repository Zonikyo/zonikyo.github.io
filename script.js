
// Simulating content loading
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
        document.querySelectorAll('main > *, header').forEach(el => {
            el.classList.add('slide-up');
        });
    }, 2000);
});

// Search functionality
const searchBtn = document.getElementById('search-btn');
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');
const header = document.querySelector('header');

searchBtn.addEventListener('click', () => {
    header.classList.toggle('hidden');
    searchContainer.classList.toggle('hidden');
    if (!searchContainer.classList.contains('hidden')) {
        searchInput.focus();
    }
});

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        performSearch(searchInput.value);
    }
});

function performSearch(query) {
    query = query.toLowerCase();
    const filteredGames = games.filter(game => 
        game.title.toLowerCase().includes(query) || 
        game.description.toLowerCase().includes(query) ||
        game.category.toLowerCase().includes(query)
    );
    displayGames(filteredGames);
    document.querySelector('.game-grid').classList.add('slide-up');
}

// Navigation
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        showSection(targetId);
    });
});

function showSection(sectionId) {
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });
    const targetSection = document.getElementById(sectionId);
    targetSection.classList.remove('hidden');
    targetSection.classList.add('slide-up');
}

// Game modal
function openGameModal(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    const gameModal = document.getElementById('game-modal');
    const gameContent = gameModal.querySelector('.game-content');
    const recommendedGames = gameModal.querySelector('.recommended-games');

    gameContent.innerHTML = `
        <h2>${game.title}</h2>
        <p>${game.description}</p>
        <iframe src="${game.embedUrl}" frameborder="0" allowfullscreen></iframe>
        <div class="game-controls">
            <button id="fullscreen-btn">Fullscreen</button>
            <button id="report-btn">Report Problem</button>
            <button id="help-btn">Help</button>
        </div>
        <h3>Instructions:</h3>
        <p>${game.instructions}</p>
    `;

    const recommendations = getRecommendations(game);
    recommendedGames.innerHTML = '<h3>Recommended Games:</h3>';
    recommendations.forEach(rec => {
        const recTile = document.createElement('div');
        recTile.classList.add('game-tile');
        recTile.innerHTML = `
            <img src="${rec.thumbnail}" alt="${rec.title}">
            <div class="game-title">${rec.title}</div>
        `;
        recTile.addEventListener('click', () => openGameModal(rec.id));
        recommendedGames.appendChild(recTile);
    });

    gameModal.classList.remove('hidden');
    gameModal.classList.add('slide-up');

    // Update URL
    history.pushState({gameId}, '', `#game-${gameId}`);
}

document.getElementById('back-btn').addEventListener('click', () => {
    const gameModal = document.getElementById('game-modal');
    gameModal.classList.add('hidden');
    gameModal.classList.remove('slide-up');
    history.pushState({}, '', '/');
});

// Simple recommendation system
function getRecommendations(currentGame) {
    return games
        .filter(game => game.category === currentGame.category && game.id !== currentGame.id)
        .slice(0, 3);
}

// Fetch and display games
let games = [];

async function fetchGames() {
    try {
        const response = await fetch('games.json');
        const data = await response.json();
        games = data.games;
        displayGames(games);
    } catch (error) {
        console.error('Error fetching games:', error);
    }
}

function displayGames(gamesToDisplay) {
    const gameGrid = document.querySelector('.game-grid');
    gameGrid.innerHTML = '';
    gamesToDisplay.forEach(game => {
        const gameTile = document.createElement('div');
        gameTile.classList.add('game-tile');
        gameTile.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}">
            <div class="game-title">${game.title}</div>
        `;
        gameTile.addEventListener('click', () => openGameModal(game.id));
        gameGrid.appendChild(gameTile);
    });
}

fetchGames();

// Handle browser navigation
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.gameId) {
        openGameModal(event.state.gameId);
    } else {
        document.getElementById('game-modal').classList.add('hidden');
    }
});

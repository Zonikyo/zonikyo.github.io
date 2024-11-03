
let gamesData = [];
let currentUser = null;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('games.json');
        const data = await response.json();
        gamesData = data.games;
    } catch (error) {
        console.error('Error loading games data:', error);
    }

    const loadingScreen = document.getElementById('loading-screen');
    const gameGrid = document.getElementById('game-grid');
    const searchButton = document.getElementById('search-button');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    const gamePage = document.getElementById('game-page');
    const gameContent = document.getElementById('game-content');
    const backButton = document.getElementById('back-button');
    const navLinks = document.querySelectorAll('.nav-links a');
    const userProfile = document.getElementById('user-profile');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    const gameRating = document.getElementById('game-rating');
    const starRating = document.querySelector('.star-rating');
    const averageRating = document.getElementById('average-rating');
    const recommendationsContainer = document.getElementById('recommendations');
    const recommendationGrid = document.getElementById('recommendation-grid');

    // Simulated loading delay
    setTimeout(() => {
        loadingScreen.classList.add('slide-up');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
            animatePageElements();
        }, 500);
    }, 2000);

    function animatePageElements() {
        const elements = document.querySelectorAll('header, main > *');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add(el.tagName === 'HEADER' ? 'slide-down' : 'slide-up');
            }, index * 100);
        });
    }

    function createGameTiles() {
        gameGrid.innerHTML = ''; // Clear existing tiles
        gamesData.forEach(game => {
            const tile = document.createElement('div');
            tile.classList.add('game-tile');
            tile.innerHTML = `
                <img src="${game.thumbnail}" alt="${game.title}">
                <h3>${game.title}</h3>
            `;
            tile.addEventListener('click', () => openGamePage(game));
            gameGrid.appendChild(tile);
        });
    }

    function showPage(pageId) {
        const pages = document.querySelectorAll('.content-container > section');
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });

        if (pageId === 'home') {
            createGameTiles();
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.target.getAttribute('href').substring(1);
            showPage(pageId);
        });
    });

    // Show home page by default
    showPage('home');

    searchButton.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const navButtons = document.querySelector('.nav-buttons');
        const searchContainer = document.getElementById('search-container');

        if (searchContainer.classList.contains('hidden')) {
            navLinks.classList.add('slide-up');
            navButtons.classList.add('slide-up');
            setTimeout(() => {
                navLinks.style.display = 'none';
                navButtons.style.display = 'none';
                searchContainer.classList.remove('hidden');
                searchContainer.classList.add('slide-down');
            }, 300);
        } else {
            searchContainer.classList.remove('slide-down');
            searchContainer.classList.add('slide-up');
            setTimeout(() => {
                searchContainer.classList.add('hidden');
                navLinks.style.display = 'flex';
                navButtons.style.display = 'flex';
                navLinks.classList.remove('slide-up');
                navButtons.classList.remove('slide-up');
                navLinks.classList.add('slide-down');
                navButtons.classList.add('slide-down');
            }, 300);
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredGames = gamesData.filter(game => game.title.toLowerCase().includes(searchTerm));
        createGameTiles(filteredGames);
    });

    function openGamePage(game) {
        gameContent.innerHTML = `
            <h2>${game.title}</h2>
            <img src="${game.thumbnail}" alt="${game.title}">
            <p>${game.description}</p>
            <div class="embed-container">
                <iframe src="${game.embedUrl}" frameborder="0"></iframe>
            </div>
            <button id="fullscreen-button">Fullscreen</button>
            <button id="report-button">Report Problem</button>
            <button id="help-button">Help</button>
        `;
        gamePage.classList.remove('hidden');
        gamePage.classList.add('fade-in');
        
        document.getElementById('fullscreen-button').addEventListener('click', () => {
            const iframe = document.querySelector('.embed-container iframe');
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if (iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen();
            } else if (iframe.mozRequestFullScreen) {
                iframe.mozRequestFullScreen();
            } else if (iframe.msRequestFullscreen) {
                iframe.msRequestFullscreen();
            }
        });

        document.getElementById('report-button').addEventListener('click', () => {
            alert('Report problem functionality will be implemented here.');
        });

        document.getElementById('help-button').addEventListener('click', () => {
            alert('Help functionality will be implemented here.');
        });

        // Show game rating
        gameRating.classList.remove('hidden');
        updateGameRating(game);

        // Show recommendations
        showRecommendations(game);
    }

    function updateGameRating(game) {
        const stars = starRating.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < game.rating);
            star.addEventListener('click', () => rateGame(game, index + 1));
        });
        averageRating.querySelector('span').textContent = game.rating.toFixed(1);
    }

    function rateGame(game, rating) {
        if (currentUser) {
            game.rating = (game.rating * game.ratingCount + rating) / (game.ratingCount + 1);
            game.ratingCount++;
            updateGameRating(game);
        } else {
            alert('Please log in to rate games.');
        }
    }

    function showRecommendations(currentGame) {
        const recommendations = gamesData
            .filter(game => game.id !== currentGame.id)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);

        recommendationGrid.innerHTML = '';
        recommendations.forEach(game => {
            const tile = document.createElement('div');
            tile.classList.add('game-tile');
            tile.innerHTML = `
                <img src="${game.thumbnail}" alt="${game.title}">
                <h3>${game.title}</h3>
            `;
            tile.addEventListener('click', () => openGamePage(game));
            recommendationGrid.appendChild(tile);
        });

        recommendationsContainer.classList.remove('hidden');
    }

    // Simulated login function (replace with actual AuthPro integration)
    function login() {
        currentUser = {
            name: 'John Doe',
            avatar: 'https://via.placeholder.com/40'
        };
        userProfile.classList.remove('hidden');
        userAvatar.src = currentUser.avatar;
        userName.textContent = currentUser.name;
    }

    // Call login function when the login button is clicked (replace with actual AuthPro integration)
    document.querySelector('.login-button').addEventListener('click', (e) => {
        e.preventDefault();
        login();
    });

    searchButton.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const navButtons = document.querySelector('.nav-buttons');

        if (searchContainer.classList.contains('hidden')) {
            navLinks.classList.add('slide-up');
            navButtons.classList.add('slide-up');
            setTimeout(() => {
                navLinks.style.display = 'none';
                navButtons.style.display = 'none';
                searchContainer.classList.remove('hidden');
                searchContainer.classList.add('slide-down');
            }, 300);
        } else {
            searchContainer.classList.remove('slide-down');
            searchContainer.classList.add('slide-up');
            setTimeout(() => {
                searchContainer.classList.add('hidden');
                navLinks.style.display = 'block';
                navButtons.style.display = 'block';
                navLinks.classList.remove('slide-up');
                navButtons.classList.remove('slide-up');
                navLinks.classList.add('slide-down');
                navButtons.classList.add('slide-down');
            }, 300);
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredGames = gamesData.filter(game => game.title.toLowerCase().includes(searchTerm));
        gameGrid.innerHTML = '';
        filteredGames.forEach(game => {
            const tile = document.createElement('div');
            tile.classList.add('game-tile');
            tile.innerHTML = `
                <img src="${game.thumbnail}" alt="${game.title}">
                <h3>${game.title}</h3>
            `;
            tile.addEventListener('click', () => openGamePage(game));
            gameGrid.appendChild(tile);
        });
    });

    backButton.addEventListener('click', () => {
        gamePage.classList.remove('fade-in');
        gamePage.classList.add('fade-out');
        setTimeout(() => {
            gamePage.classList.add('hidden');
            gamePage.classList.remove('fade-out');
        }, 300);
    });

    createGameTiles();
});

// Game data (same as in your original file)
const gamesData = [/* ... your game data here ... */];

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

document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('image-gallery');
    const searchBar = document.getElementById('search-bar');

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

    // Load all games initially
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
    }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    const gameIframe = document.getElementById('game-iframe');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const debugUrl = document.getElementById('debug-url');

    // Check if elements exist
    if (!gameIframe || !fullscreenBtn || !debugUrl) {
        console.error('Required elements not found in DOM');
        if (debugUrl) debugUrl.textContent = 'Error: Required elements missing';
        return;
    }

    // Get the game URL from the hash
    let gameUrl = window.location.hash.substring(1);

    // Debug: Log and display the URL
    console.log('Raw hash:', window.location.hash);
    console.log('Extracted game URL:', gameUrl);
    debugUrl.textContent = gameUrl || 'No URL provided in hash';

    // Set iframe src with a fallback
    if (gameUrl) {
        // Ensure the URL is valid (basic check)
        try {
            new URL(gameUrl); // Throws if invalid
            gameIframe.src = gameUrl;
        } catch (e) {
            console.error('Invalid URL:', gameUrl, e);
            gameIframe.src = 'data:text/html,<h1>Invalid Game URL</h1>';
            debugUrl.textContent = 'Invalid URL: ' + gameUrl;
        }
    } else {
        gameIframe.src = 'data:text/html,<h1>No Game Selected</h1>';
    }

    // Handle fullscreen button
    fullscreenBtn.addEventListener('click', () => {
        if (gameIframe.requestFullscreen) {
            gameIframe.requestFullscreen().catch(err => {
                console.error('Fullscreen failed:', err);
                alert('Fullscreen mode is not supported for this content.');
            });
        } else if (gameIframe.mozRequestFullScreen) { // Firefox
            gameIframe.mozRequestFullScreen();
        } else if (gameIframe.webkitRequestFullscreen) { // Chrome, Safari
            gameIframe.webkitRequestFullscreen();
        } else if (gameIframe.msRequestFullscreen) { // IE/Edge
            gameIframe.msRequestFullscreen();
        }
    });

    // Listen for hash changes (e.g., if user navigates back/forward)
    window.addEventListener('hashchange', () => {
        gameUrl = window.location.hash.substring(1);
        console.log('Hash changed, new URL:', gameUrl);
        debugUrl.textContent = gameUrl || 'No URL provided in hash';
        gameIframe.src = gameUrl || 'data:text/html,<h1>No Game Selected</h1>';
    });
});

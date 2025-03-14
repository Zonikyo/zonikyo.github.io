document.addEventListener('DOMContentLoaded', () => {
    const gameIframe = document.getElementById('game-iframe');
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    if (!gameIframe || !fullscreenBtn) {
        console.error('Required elements not found in DOM');
        return;
    }

    let gameUrl = window.location.hash.substring(1);

    if (gameUrl) {
        try {
            new URL(gameUrl);
            gameIframe.src = gameUrl;
        } catch (e) {
            console.error('Invalid URL:', gameUrl, e);
            gameIframe.src = 'data:text/html,<h1>Invalid Game URL</h1>';
        }
    } else {
        gameIframe.src = 'data:text/html,<h1>No Game Selected</h1>';
    }

    fullscreenBtn.addEventListener('click', () => {
        if (gameIframe.requestFullscreen) {
            gameIframe.requestFullscreen().catch(err => {
                console.error('Fullscreen failed:', err);
                alert('Fullscreen mode is not supported for this content.');
            });
        } else if (gameIframe.mozRequestFullScreen) {
            gameIframe.mozRequestFullScreen();
        } else if (gameIframe.webkitRequestFullscreen) {
            gameIframe.webkitRequestFullscreen();
        } else if (gameIframe.msRequestFullscreen) {
            gameIframe.msRequestFullscreen();
        }
    });

    window.addEventListener('hashchange', () => {
        gameUrl = window.location.hash.substring(1);
        gameIframe.src = gameUrl || 'data:text/html,<h1>No Game Selected</h1>';
    });
});

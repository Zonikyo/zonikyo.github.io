document.addEventListener('DOMContentLoaded', () => {
    const gameIframe = document.getElementById('game-iframe');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    
    if (!gameIframe || !fullscreenBtn) {
        console.error('Iframe or fullscreen button not found in DOM');
        return;
    }

    const gameUrl = window.location.hash.substring(1);
    console.log('Game URL:', gameUrl);
    if (gameUrl) {
        gameIframe.src = gameUrl;
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
});

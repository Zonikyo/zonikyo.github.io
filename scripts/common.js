// Function to fetch and insert content
async function loadTemplate(url, elementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        const content = await response.text();
        document.getElementById(elementId).innerHTML = content;
    } catch (error) {
        console.error(error);
    }
}

// Load head and navbar on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    loadTemplate('/templates/head.html', 'head-placeholder');
    loadTemplate('/templates/navbar.html', 'navbar-placeholder');
});

// Mobile device check and redirect
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
if (isMobileDevice()) {
    window.location.href = "/mobile-not-available.html";
}

// Domain redirect
if (window.location.hostname === 'zonikyo.github.io') {
    window.location.replace('https://neonwave.netlify.app');
}

// AuthPro integration
var ap = new AuthPro('CoolD1234');

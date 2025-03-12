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

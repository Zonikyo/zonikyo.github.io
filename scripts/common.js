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

    document.addEventListener('DOMContentLoaded', function() {
        const footerPlaceholder = document.createElement('div');
        footerPlaceholder.id = 'footer-placeholder';
        document.body.appendChild(footerPlaceholder);
        
        fetch('/templates/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            });
    });

function duplicateAds(containerId, adCount) {
    const container = document.getElementById(containerId);
    const adContent = `
        <ins class="adsbygoogle" style="display:inline-block;width:130px;height:500px" data-ad-client="ca-pub-2197905823374701" data-ad-slot="2138675228"></ins>
    `;
    
    for (let i = 0; i < adCount; i++) {
        const adElement = document.createElement('div');
        adElement.innerHTML = adContent;
        container.appendChild(adElement);
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
}

document.addEventListener('DOMContentLoaded', () => {
    duplicateAds('left-ad-container', 3); // Adjust the number of ads as needed
    duplicateAds('right-ad-container', 3); // Adjust the number of ads as needed
});

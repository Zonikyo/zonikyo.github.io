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
//function isMobileDevice() {
//    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//}
//if (isMobileDevice()) {
//    window.location.href = "/mobile-not-available.html";
//}

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

// Initialize Firebase with your config
const firebaseConfig = {
    apiKey: "AIzaSyBinlRoWNVyqsTgc75HiARRdPBtrcnlaY4",
    authDomain: "neonwave-arcade.firebaseapp.com",
    projectId: "neonwave-arcade",
    storageBucket: "neonwave-arcade.firebaseapp.com",
    messagingSenderId: "430507600648",
    appId: "1:430507600648:web:9c9e1bfd57ad5344e79abd",
    measurementId: "G-RY4QR9LLKW"
};
firebase.initializeApp(firebaseConfig);

// Function to handle sign-in with Google
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log('User signed in:', result.user);
        })
        .catch((error) => {
            console.error('Error during sign-in:', error.message);
        });
}

// Function to handle passwordless sign-in
function sendSignInLinkToEmail(email) {
    const actionCodeSettings = {
        url: 'https://zonikyo.github.io',
        handleCodeInApp: true
    };
    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
            window.localStorage.setItem('emailForSignIn', email);
            alert('Sign-in link sent to your email.');
        })
        .catch((error) => {
            console.error('Error during sending sign-in link:', error.message);
        });
}

// Function to check sign-in status
function checkSignInStatus() {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
            email = window.prompt('Please provide your email for confirmation');
        }
        firebase.auth().signInWithEmailLink(email, window.location.href)
            .then((result) => {
                window.localStorage.removeItem('emailForSignIn');
                console.log('User signed in:', result.user);
            })
            .catch((error) => {
                console.error('Error during sign-in:', error.message);
            });
    }
}

// Add event listeners to buttons
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sign-in-btn').addEventListener('click', () => {
        const email = window.prompt('Enter your email for passwordless sign-in');
        sendSignInLinkToEmail(email);
    });

    document.getElementById('sign-up-btn').addEventListener('click', signInWithGoogle);
    checkSignInStatus();
});

// Register a new user
registerBtn.addEventListener('click', () => {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            console.log('User registered:', userCredential.user);
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });
});

// Log in an existing user
loginBtn.addEventListener('click', () => {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            console.log('User logged in:', userCredential.user);
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });
});

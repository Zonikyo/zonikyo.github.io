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

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  // ... other config values from Firebase Console
};
firebase.initializeApp(firebaseConfig);

// Get DOM elements
const email = document.getElementById('email');
const password = document.getElementById('password');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

const googleSignInBtn = document.getElementById('google-signin');

googleSignInBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log('Google user:', result.user);
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
});

// Monitor auth state
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('User is signed in:', user.displayName);
    // Update UI (e.g., show user’s name or profile pic)
  } else {
    console.log('No user signed in.');
  }
});

const emailInput = document.getElementById('email');
const sendLinkBtn = document.getElementById('send-link');

sendLinkBtn.addEventListener('click', () => {
  const actionCodeSettings = {
    url: 'https://username.github.io', // Your GitHub Pages URL
    handleCodeInApp: true,
  };
  firebase.auth().sendSignInLinkToEmail(emailInput.value, actionCodeSettings)
    .then(() => {
      // Save email to localStorage for verification later
      localStorage.setItem('emailForSignIn', emailInput.value);
      alert('Sign-in link sent! Check your email.');
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
});

// Check if user clicked the link
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  const email = localStorage.getItem('emailForSignIn');
  if (email) {
    firebase.auth().signInWithEmailLink(email, window.location.href)
      .then((result) => {
        console.log('Signed in:', result.user);
        localStorage.removeItem('emailForSignIn'); // Clean up
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }
}

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

// Settings modal logic
document.addEventListener('DOMContentLoaded', () => {
    const settingsBtn = document.getElementById('settings-btn');
    const modal = document.getElementById('settings-modal');
    const closeBtn = modal.querySelector('.close');
    const cursorOptions = document.querySelectorAll('input[name="cursor"]');

    settingsBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    cursorOptions.forEach(option => {
        option.addEventListener('change', (event) => {
            const cursorValue = event.target.value;
            document.body.style.cursor = cursorValue === 'default' ? 'default' : `url('path/to/${cursorValue}.png'), auto`;
        });
    });
});

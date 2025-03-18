document.addEventListener('DOMContentLoaded', () => {
    const cookieNotice = document.querySelector('.card');
    const acceptButton = document.querySelector('.acceptButton');
    const declineButton = document.querySelector('.declineButton');

    // Function to set a cookie
    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${value};${expires};path=/`;
    };

    // Function to get a cookie
    const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    };

    // Check if the cookie notice has already been accepted
    if (!getCookie('cookiesAccepted')) {
        cookieNotice.style.display = 'block'; // Show the cookie notice
    }

    // Handle the "Accept" button click
    acceptButton.addEventListener('click', () => {
        setCookie('cookiesAccepted', 'true', 365); // Set a cookie valid for 1 year
        cookieNotice.style.display = 'none'; // Hide the cookie notice
    });

    // Handle the "Decline" button click
    declineButton.addEventListener('click', () => {
        location.reload(); // Reload the page
    });
});
document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('urlInput');
  const addUrlButton = document.getElementById('addUrlButton');
  const urlList = document.getElementById('urlList');
  const previewPopup = document.getElementById('previewPopup');
  const previewFrame = document.getElementById('previewFrame');
  const closePreviewButton = document.getElementById('closePreviewButton');

  // Load URLs from query parameters if available
  const params = new URLSearchParams(window.location.search);
  const urls = params.get('urls') ? params.get('urls').split(',') : [];
  urls.forEach(addUrlToList);

  // Add "https://" if missing, and add URL to list
  addUrlButton.addEventListener('click', () => {
    let url = urlInput.value.trim();
    if (!url) return;

    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    
    addUrlToList(url);
    saveUrls();
    urlInput.value = '';
  });

  function addUrlToList(url) {
    const listItem = document.createElement('div');
    listItem.className = 'url-item';
    listItem.innerHTML = `
      <span>${url}</span>
      <span class="url-status">Checking...</span>
      <button class="open-button">Open Website</button>
      <button class="preview-button">Preview Website</button>
      <button class="delete-button">Delete</button>
    `;
    urlList.appendChild(listItem);

    // Check URL availability and update status
    checkUrlStatus(url, listItem.querySelector('.url-status'));

    // Button to open the link in a new tab
    listItem.querySelector('.open-button').addEventListener('click', () => {
      window.open(url, '_blank');
    });

    // Button to preview the website in an iframe
    listItem.querySelector('.preview-button').addEventListener('click', () => {
      previewFrame.src = url;
      previewPopup.classList.remove('hidden');
    });

    // Button to delete the URL from the list
    listItem.querySelector('.delete-button').addEventListener('click', () => {
      listItem.remove();
      saveUrls(); // Update the saved URLs in the query string
    });
  }

  closePreviewButton.addEventListener('click', () => {
    previewPopup.classList.add('hidden');
    previewFrame.src = ''; // Stop loading the iframe when closed
  });

  async function checkUrlStatus(url, statusElement) {
    try {
      // First attempt: Fetch request to check headers
      const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
      if (response.ok || response.type === 'opaque') {
        statusElement.textContent = 'Accessible';
        statusElement.classList.add('status-accessible');
      } else {
        statusElement.textContent = 'Blocked/Down';
        statusElement.classList.add('status-blocked');
      }
    } catch (error) {
      console.log("Fetch failed; trying iframe fallback");

      // Second attempt: Use iframe to check if URL can be embedded
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none'; // Hide iframe
      document.body.appendChild(iframe);

      // Set up a 5-second timeout to check for iframe load success
      const iframeCheckTimeout = setTimeout(() => {
        statusElement.textContent = 'Blocked/Down';
        statusElement.classList.add('status-blocked');
        document.body.removeChild(iframe);
      }, 5000);

      iframe.onload = () => {
        clearTimeout(iframeCheckTimeout); // Clear timeout if iframe loads successfully
        statusElement.textContent = 'Accessible';
        statusElement.classList.add('status-accessible');
        document.body.removeChild(iframe);
      };

      iframe.onerror = () => {
        clearTimeout(iframeCheckTimeout);
        statusElement.textContent = 'Blocked/Down';
        statusElement.classList.add('status-blocked');
        document.body.removeChild(iframe);
      };

      iframe.src = url; // Attempt to load the URL in the iframe
    }
  }

  function saveUrls() {
    const urls = Array.from(document.querySelectorAll('.url-item span:first-child')).map(span => span.textContent);
    const queryString = new URLSearchParams({ urls: urls.join(',') }).toString();
    window.history.replaceState(null, '', `?${queryString}`);
  }
});

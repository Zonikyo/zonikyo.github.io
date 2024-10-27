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

  // Smart input function to add "https://" if missing
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
    `;

    urlList.appendChild(listItem);

    checkUrlStatus(url, listItem.querySelector('.url-status'));

    listItem.querySelector('.open-button').addEventListener('click', () => {
      window.open(url, '_blank');
    });

    listItem.querySelector('.preview-button').addEventListener('click', () => {
      previewFrame.src = url;
      previewPopup.classList.remove('hidden');
    });
  }

  closePreviewButton.addEventListener('click', () => {
    previewPopup.classList.add('hidden');
    previewFrame.src = ''; // Stop loading the iframe when closed
  });

  function checkUrlStatus(url, statusElement) {
    try {
      // Attempt to fetch resource head for quick availability check
      fetch(url, { method: 'HEAD', mode: 'no-cors' }) 
        .then(response => {
          if (response.ok || response.type === 'opaque') {
            // If the fetch response is 'opaque', it could be a CORS issue but the site may still be accessible.
            statusElement.textContent = 'Accessible';
            statusElement.classList.add('status-accessible');
          } else {
            statusElement.textContent = 'Blocked/Down';
            statusElement.classList.add('status-blocked');
          }
        })
        .catch(error => {
          console.error(`Error checking URL: ${url}`, error);
          statusElement.textContent = 'Blocked/Down';
          statusElement.classList.add('status-blocked');
        });
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      statusElement.textContent = 'Blocked/Down';
      statusElement.classList.add('status-blocked');
    }
  }

  function saveUrls() {
    const urls = Array.from(document.querySelectorAll('.url-item span:first-child')).map(span => span.textContent);
    const queryString = new URLSearchParams({ urls: urls.join(',') }).toString();
    window.history.replaceState(null, '', `?${queryString}`);
  }
});

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
  urls.forEach(url => fetchAndAddUrlInfo(url));

  addUrlButton.addEventListener('click', () => {
    let url = urlInput.value.trim();
    if (!url) return;

    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    
    fetchAndAddUrlInfo(url);
    saveUrls();
    urlInput.value = '';
  });

  function fetchAndAddUrlInfo(url) {
    fetch(url)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const title = doc.querySelector('title') ? doc.querySelector('title').innerText : url;
        const favicon = doc.querySelector('link[rel="icon"]') ? new URL(doc.querySelector('link[rel="icon"]').href, url).href : '';
        addUrlToList(url, title, favicon);
      })
      .catch(() => addUrlToList(url, url, ''));
  }

  function addUrlToList(url, title, favicon) {
    const listItem = document.createElement('div');
    listItem.className = 'url-item';
    listItem.innerHTML = `
      <img src="${favicon}" alt="" class="favicon" onerror="this.style.display='none';">
      <span class="url-title">${title}</span>
      <span class="url-status">Checking...</span>
      <button class="open-button">Open Website</button>
      <button class="preview-button">Preview Website</button>
      <button class="delete-button">Delete</button>
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

    listItem.querySelector('.delete-button').addEventListener('click', () => {
      listItem.remove();
      saveUrls();
    });
  }

  closePreviewButton.addEventListener('click', () => {
    previewPopup.classList.add('hidden');
    previewFrame.src = '';
  });

  async function checkUrlStatus(url, statusElement) {
    try {
      const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
      if (response.ok || response.type === 'opaque') {
        statusElement.textContent = 'Accessible';
        statusElement.style.color = '#28a745';
      } else {
        statusElement.textContent = 'Blocked/Down';
        statusElement.style.color = '#dc3545';
      }
    } catch {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const iframeCheckTimeout = setTimeout(() => {
        statusElement.textContent = 'Blocked/Down';
        statusElement.style.color = '#dc3545';
        document.body.removeChild(iframe);
      }, 5000);

      iframe.onload = () => {
        clearTimeout(iframeCheckTimeout);
        statusElement.textContent = 'Accessible';
        statusElement.style.color = '#28a745';
        document.body.removeChild(iframe);
      };

      iframe.onerror = () => {
        clearTimeout(iframeCheckTimeout);
        statusElement.textContent = 'Blocked/Down';
        statusElement.style.color = '#dc3545';
        document.body.removeChild(iframe);
      };

      iframe.src = url;
    }
  }

  function saveUrls() {
    const urls = Array.from(document.querySelectorAll('.url-item .url-title')).map(span => span.textContent);
    const queryString = new URLSearchParams({ urls: urls.join(',') }).toString();
    window.history.replaceState(null, '', `?${queryString}`);
  }
});

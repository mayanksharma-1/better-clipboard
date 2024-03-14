document.addEventListener('DOMContentLoaded', () => {
  // button event here
  const copyButton = document.getElementById("copy-button");

  copyButton.addEventListener("click", () => {
    console.log("just pressed the copy button!");
    chrome.runtime.sendMessage({ type: "get-selection" }); // Trigger background script
  });

  chrome.storage.local.get('copiedItems', (data) => {
    const copiedItems = data.copiedItems || [];

    const container = document.getElementById('copied-items-container');

    // Clear existing content
    container.innerHTML = '';

    copiedItems.forEach((item) => {
      const widget = document.createElement('div');
      widget.classList.add('copied-item');

      widget.textContent = item;

      container.appendChild(widget);
    });
  });
});

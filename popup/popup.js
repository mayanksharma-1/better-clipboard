const copyButton = document.getElementById("copy-button");
copyButton.addEventListener("click", () => {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    const tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { type: "get-selection" });
  });
});

console.log("testing background hello");


chrome.runtime.onInstalled.addListener(() => {
  chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { type: "get-selection" });
    });
  });
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const activeTab = tabs[0];
    // Use chrome.scripting.executeScript to inject content script
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id, allFrames: true }, // Inject into all frames (optional)
      files: ['scripts/content.js'],
    });
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("background.js got this message: ",message);
  if (message.type === "selection-data") {
    console.log("background.js just got selection data from content.js");
    updateStorage(message.text);
    // chrome.runtime.sendMessage({ type: "update-popup", text: message.text }); // not needed because I am using the update storage as a way 

  } else if (message.type === "get-selection") { // Optional for handling cases where content script might not be injected
    // Handle cases where content script might not be injected
    console.log("popup.js just called background.js")
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id, allFrames: true },
        files: ['scripts/content.js'],
      }); // Inject content script if not already present
      chrome.tabs.sendMessage(activeTab.id, { type: "check-selection" });
    });
  }
});


function updateStorage(text) {
  chrome.storage.local.get('copiedItems', (data) => {
    const copiedItems = data.copiedItems || [];
    copiedItems.unshift(text); // Add new item to the beginning

    // Limit to last three items
    copiedItems.length = Math.min(copiedItems.length, 3);

    chrome.storage.local.set({ copiedItems });
  });
}
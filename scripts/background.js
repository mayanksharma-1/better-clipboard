chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, { type: "get-selection" });
    });
  });
  
  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === "selection") {
      navigator.clipboard.writeText(message.text);
    }
  });
  
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "get-selection") {
      const selection = window.getSelection().toString();
      sendResponse({ type: "selection", text: selection });
    }
  });
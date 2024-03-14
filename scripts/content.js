console.log("testing hello content.js default load");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "check-selection") {
        const selection = window.getSelection().toString();
        console.log("Sending message:", { type: "selection-data", text: selection });
        // sending the selected data to background.js
        chrome.runtime.sendMessage({ type: "selection-data", text: selection }); 
    //   sendResponse({ type: "selection-data", text: selection }); 

    }
  });



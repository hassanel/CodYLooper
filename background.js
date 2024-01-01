// background.js is now a service worker in Manifest V3
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

  // This is a placeholder since we will inject the content script from the popup

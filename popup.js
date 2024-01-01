// popup.js
document.addEventListener('DOMContentLoaded', function () {
    const loopButton = document.getElementById('loop');
    loopButton.addEventListener('click', function () {
        console.log('Loop button clicked'); // Debugging log

        const start = parseFloat(document.getElementById('start').value);
        const end = parseFloat(document.getElementById('end').value);

        if (isNaN(start) || isNaN(end) || start >= end) {
            alert('Please enter valid start and end times.');
            return;
        }

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const currentTab = tabs[0];
            if (!currentTab) {
                console.error('No active tab found');
                return;
            }

            chrome.scripting.executeScript({
                target: { tabId: currentTab.id },
                files: ['content.js']
            }, (injectionResults) => {
                if (chrome.runtime.lastError) {
                    console.error(`Error injecting script: ${chrome.runtime.lastError.message}`);
                } else {
                    console.log('Content script injected', injectionResults);
                    // Send a message to the content script
                    chrome.tabs.sendMessage(currentTab.id, { action: 'loop', start: start, end: end }, (response) => {
                        if (chrome.runtime.lastError) {
                            console.error(`Error sending message: ${chrome.runtime.lastError.message}`);
                        } else {
                            console.log('Message sent', response);
                        }
                    });
                }
            });
        });
    });
});

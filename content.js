// content.js
console.log('Content script loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received', request);
    if (request.action === 'loop') {
        loopVideo(request.start, request.end);
        sendResponse({ status: 'looping started' });
    }
    return true;
});

function loopVideo(start, end) {
    const video = document.querySelector('video');
    if (video) {
        // Clear any previous ontimeupdate event handlers
        video.ontimeupdate = null;

        // Set up the new ontimeupdate event handler
        video.ontimeupdate = function () {
            if (video.currentTime >= end) {
                video.currentTime = start;
                video.play();
            }
        };

        // If the video is currently beyond the start time, reset it to start
        if (video.currentTime < start || video.currentTime > end) {
            video.currentTime = start;
            video.play();
        }
    } else {
        console.error('No video element found.');
    }
}


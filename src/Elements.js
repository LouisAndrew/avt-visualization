/**
 * Object containing elements that're going to be used throughout the app.
 */
const Elements = {
    audioSource: document.querySelector('audio'),
    controlButton: document.getElementById('control'),
    /**
   * @type {HTMLInputElement}
   */
    volumeControl: document.getElementById('volume'),
    filters: {
        lowband: document.getElementById('lowband'),
        midband: document.getElementById('midband'),
        highband: document.getElementById('highband'),
    },
    canvas: document.querySelector('canvas'),
};

export default Elements;

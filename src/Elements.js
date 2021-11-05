const Elements = {
    audioSource: document.querySelector('audio'),
    controlButton: document.getElementById('control'),
    /**
   * @type {HTMLInputElement}
   */
    volumeControl: document.getElementById('volume'),
    filters: {
        lowpass: document.getElementById('lowpass'),
        bandpass: document.getElementById('bandpass'),
        highpass: document.getElementById('highpass'),
    },
    canvas: document.querySelector('canvas'),
};

export default Elements;

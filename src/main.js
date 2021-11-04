// Thresholds of the 3-band-equalizer
//
// Please use these variables for ani
// easier review on my part
// const lowerBandThreshold = 0;
// const higherBandThreshold = 0;

const Elements = {
  audioSource: document.querySelector('audio'),
  controlButton: document.getElementById('control'),
  /**
   * @type {HTMLInputElement}
   */
  volumeControl: document.getElementById('volume'),
};

const audioContext = new AudioContext();
const mediaElementSource = audioContext.createMediaElementSource(Elements.audioSource);
const gainNode = audioContext.createGain();

mediaElementSource.connect(gainNode).connect(audioContext.destination);

// TODO: Create Web Audio API [x]
// TODO: play / resume audio [x]
// TODO: Set volume [x]

/**
 * @typedef {Object} State
 * @property {boolean} isPlaying
 */

const State = {
  data: {
    isPlaying: false,
  },
  getState() {
    return this.data;
  },
  /**
   * @param {Partial<State>} newData
   */
  setState(newData) {
    this.data = {
      ...this.getState(),
      ...newData,
    };
  },
};

/**
 * Function to play/resume audio
 * @param {HTMLAudioElement} source
 * @param {AudioContext} context
 */
const startAudio = (source, context) => {
  if (context.state === 'suspended') {
    context.resume();
    return;
  }

  source.play();
  State.setState({ isPlaying: true });
  Elements.controlButton.textContent = 'Stop';
};

/**
 * Function to stop audo
 * @param {HTMLAudioElement} source
 */
const stopAudio = (source) => {
  source.pause();
  State.setState({ isPlaying: false });
  Elements.controlButton.textContent = 'Start';
};

Elements.audioSource.addEventListener(
  'ended',
  () => {
    State.setState({ isPlaying: false });
  },
  false,
);

Elements.controlButton.addEventListener(
  'click',
  () => {
    if (State.getState().isPlaying) {
      stopAudio(Elements.audioSource);
    } else {
      startAudio(Elements.audioSource, audioContext);
    }
  },
  false,
);

Elements.volumeControl.addEventListener('input', (event) => {
  const { value } = event.target;
  gainNode.gain.value = value;
});

/*
    INSERT YOUR CODE HERE
 */

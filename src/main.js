// Thresholds of the 3-band-equalizer
//
// Please use these variables for ani
// easier review on my part
// const lowerBandThreshold = 0;
// const higherBandThreshold = 0;

const audioSource = document.querySelector('audio');
const audioContext = new AudioContext();
const mediaElementSource = audioContext.createMediaElementSource(audioSource);
const controlButton = document.getElementById('control');

// TODO: Create Web Audio API [x]
// TODO: play / resume audio [x]
// TODO: Set volume

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
   *
   * @param {Partial<State>} newData
   */
  setState(newData) {
    this.data = {
      ...this.getState(),
      ...newData,
    };
  },
};

mediaElementSource.connect(audioContext.destination);

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
};

/**
 * Function to stop audo
 * @param {HTMLAudioElement} source
 */
const stopAudio = (source) => {
  source.pause();
  State.setState({ isPlaying: false });
};

audioSource.addEventListener(
  'ended',
  () => {
    State.setState({ isPlaying: false });
  },
  false,
);

controlButton.addEventListener(
  'click',
  () => {
    if (State.getState().isPlaying) {
      stopAudio(audioSource);
      controlButton.textContent = 'Play';
    } else {
      startAudio(audioSource, audioContext);
      controlButton.textContent = 'Stop';
      console.log(State.getState());
    }
  },
  false,
);

/*
    INSERT YOUR CODE HERE
 */

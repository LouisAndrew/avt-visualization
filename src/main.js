import Elements from './Elements.js';
import initAudioContext from './initAudioContext.js';
import { onAudioStart, onAudioStop } from './audioVisualization.js';

const lowerBandThreshold = 150;
const higherBandThreshold = 5000;

const {
    audioContext, gainNode, lowbandGain, highbandGain, midbandGain, analyser,
} = initAudioContext(lowerBandThreshold, higherBandThreshold);

const FilterGains = {
    lowpass: lowbandGain,
    bandpass: midbandGain,
    highpass: highbandGain,
};

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
    onAudioStart(analyser);
};

/**
 * Function to stop audo
 * @param {HTMLAudioElement} source
 */
const stopAudio = (source) => {
    source.pause();
    State.setState({ isPlaying: false });
    Elements.controlButton.textContent = 'Start';
    onAudioStop();
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

Object.entries(Elements.filters).forEach(([id, element]) => {
    element.addEventListener('input', (event) => {
        const { value } = event.target;
        FilterGains[id].gain.value = value;
    });
});

/*
    INSERT YOUR CODE HERE
 */

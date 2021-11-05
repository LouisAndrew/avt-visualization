import Elements from './Elements.js';

/**
 * @param {AudioContext} context Web audio context.
 * @param {string} type Filter band type.
 * @param {string} frequency Frequency threshold to be filtered.
 * @returns {[BiquadFilterNode, GainNode]} Filter node and filter gain node.
 */
const initFilter = (context, type, frequency) => {
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    filter.type = type;
    filter.frequency.value = frequency;

    gain.gain.value = 1;

    return [filter, gain];
};

/**
 * Function to init audio context and its filters.
 * @param {Number} lowerBandThreshold Lower frequency band threshold.
 * @param {Number} higherBandThreshold Higher frequency band threshold.
 */
const initAudioContext = (lowerBandThreshold, higherBandThreshold) => {
    const audioContext = new AudioContext();
    const mediaElementSource = audioContext.createMediaElementSource(Elements.audioSource);

    const output = audioContext.createGain();
    output.gain.value = 0.8;

    const gainNode = audioContext.createGain();

    const [lowbandFilter, lowbandGain] = initFilter(audioContext, 'lowpass', lowerBandThreshold);
    const [highbandFilter, highbandGain] = initFilter(audioContext, 'highpass', higherBandThreshold);
    const [midbandFilter, midbandGain] = initFilter(audioContext, 'bandpass', (higherBandThreshold - lowerBandThreshold) / 2);

    midbandFilter.Q.value = 10;

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;

    mediaElementSource.connect(highbandFilter);
    mediaElementSource.connect(lowbandFilter);
    mediaElementSource.connect(midbandFilter);

    midbandFilter.connect(midbandGain);
    highbandFilter.connect(highbandGain);
    lowbandFilter.connect(lowbandGain);

    highbandGain.connect(output);
    lowbandGain.connect(output);
    midbandGain.connect(output);

    output
        .connect(analyser)
        .connect(gainNode)
        .connect(audioContext.destination);

    return {
        audioContext,
        mediaElementSource,
        gainNode,
        lowbandGain,
        highbandGain,
        midbandGain,
        analyser,
    };
};

export default initAudioContext;

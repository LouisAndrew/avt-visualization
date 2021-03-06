/* eslint-disable no-param-reassign */

import Elements from './Elements.js';

const CANVAS_WIDTH = '800';
const CANVAS_HEIGHT = '300';

/**
 * Placeholder for an array of frequencies.
 * @type {Uint8Array}
 */
let frequencyDataArray;
let animationFrameId = -1;

/**
 * Function to draw diagram blocks of the current output frequency on the canvas.
 * @param {AnalyserNode} audioAnalyser
 * @param {CanvasRenderingContext2D} canvasContext
 */
const draw = (audioAnalyser, canvasContext) => {
    animationFrameId = requestAnimationFrame(() => draw(audioAnalyser, canvasContext));
    audioAnalyser.getByteFrequencyData(frequencyDataArray);

    canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    canvasContext.fillStyle = '#F5F5F5';
    canvasContext.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const barWidth = (CANVAS_WIDTH / audioAnalyser.frequencyBinCount) * 2.5;
    frequencyDataArray.forEach((value, index) => {
        const offsetLeft = (barWidth + 1) * index;
        const barHeight = value * 2;

        canvasContext.fillStyle = `rgb(100, 100, ${value + 50})`;
        canvasContext.fillRect(offsetLeft, CANVAS_HEIGHT - barHeight / 2, barWidth, barHeight);
    });
};

/**
 * Function to be called when audio is started.
 * @param {AnalyserNode} analyser
 */
const onAudioStart = (analyser) => {
    frequencyDataArray = new Uint8Array(analyser.frequencyBinCount);
    const canvasContext = Elements.canvas.getContext('2d');

    draw(analyser, canvasContext);
};

/**
 * Function to be called when audio is stopped.
 */
const onAudioStop = () => {
    cancelAnimationFrame(animationFrameId);
};

export { onAudioStart, onAudioStop };

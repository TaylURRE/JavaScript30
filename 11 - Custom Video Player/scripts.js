const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip');
const ranges = player.querySelectorAll('.player__slider');

/**
 * Learnings
 * - query selectors in elements container e.g.
 * const player = document.querySelector('.player');
 * const video = player.querySelector('.viewer');
 *
 * - dataset usage https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset e.g.
 * this.dataset.skip references attribute on the element data-skip="-10"
 *
 * - Good to have documentation: list of events to listen for : https://developer.mozilla.org/en-US/docs/Web/Events
 */


function togglePlay() {
    const method = video.paused ? play : pause;
    video[method]();
}

function updateButton() {
    toggle.textContent = this.paused ?  '►' : '❚ ❚';
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime/ video.duration) * 100;

    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;

    video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () =>  mousedown = true);
progress.addEventListener('mouseup', () =>  mousedown = false);



/**
 * Advanced code: delays for use with await
 *
 * stepDelayKey() returns a promise that's resolved on the next key press.
 *
 * stepDelayTimeout(ms) resolves after the given number
 * of milliseconds (default 100).
 *
 * stepDelayAnimationFrame() resolves on the next animation frame.
 */

export function stepDelayTimeout(ms = 100) {
  if (status) status.textContent = `Moving at ${ms}ms per step.`;
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function stepDelayAnimationFrame() {
  if (status) status.textContent = 'Moving at every animation frame.';
  return new Promise(resolve => requestAnimationFrame(resolve));
}

export function stepDelayKey() {
  if (status) status.textContent = 'Press space for the next step.';
  return new Promise(resolve => { pendingKeyResolve = resolve; });
}

export function stepNoDelay() { }

let pendingKeyResolve = null;

document.addEventListener('keydown', (e) => {
  if (e.key === ' ' && pendingKeyResolve) {
    pendingKeyResolve();
    pendingKeyResolve = null;
  }
});


let status;

window.addEventListener('load', () => {
  status = document.querySelector('.delay-status');
});

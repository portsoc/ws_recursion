/*
 * Iterative solution to the Tower of Hanoi problem.
 */

import { stepDelayKey as stepDelay } from './delays.js';

async function moveBlocks(n, from, to, spare) {
  if (n < 1) return; // nothing to do

  if (n % 2 === 0) {
    // for even numbers of blocks, need to start on the spare
    [to, spare] = [spare, to];
  }

  // simply do legal moves between pairs of towers:
  // from&to, from&spare, to&spare, loop until done
  do {
    await moveBlockBetween(from, to);

    // rotate the towers: move the last to be the first
    [from, to, spare] = [spare, from, to];
  } while (!isDone(from, to, spare));
}

// move block between towers t1 and t2, whichever way is a legal move
async function moveBlockBetween(t1, t2) {
  const size1 = Number(t1.querySelector('.block')?.dataset.size ?? Infinity);
  const size2 = Number(t2.querySelector('.block')?.dataset.size ?? Infinity);

  if (size1 > size2) {
    await moveBlock(t2, t1);
  } else {
    await moveBlock(t1, t2);
  }
}

// done when all the blocks are in just one element
function isDone(...towers) {
  // check that the count of non-empty towers is 1
  return towers.filter(t => t.querySelectorAll('.block').length > 0).length === 1;
}

async function moveBlock(from, to) {
  // first report that we'll move the block and wait a bit
  console.log(`will move a block from ${getName(from)} to ${getName(to)}`);
  await stepDelay();

  // actually move the first block
  const block = from.querySelector('.block');
  to.insertBefore(block, to.querySelector('.block'));
}

function getName(el) {
  const h2 = el.querySelector('h2');
  if (h2) return h2.textContent;

  return 'noname';
}


async function main() {
  const towers = document.querySelectorAll('.tower');
  const n = towers[0].querySelectorAll('.block').length;

  await moveBlocks(n, towers[0], towers[2], towers[1]);

  const status = document.querySelector('#status');
  status.textContent = 'All done, thanks for playing. Reload to restart.';
}

window.addEventListener('load', main);

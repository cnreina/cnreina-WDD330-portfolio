/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */


window.onload = function() {
  console.log("window.onload");
  const resetButton = document.getElementById('resetbutton');
  resetButton.addEventListener('click', handleResetButtonEvent);

  const gridContainer = document.getElementById('gridcontainer');
  gridContainer.addEventListener('touchend', handleGridContainerEvent);

  const playerInfo = document.getElementById('playerinfo');
  playerInfo.innerHTML = 'O';

};

function handleResetButtonEvent(event) {
  console.log(event.target.id);

};

function handleGridContainerEvent(event) {
  const selectedCell = document.getElementById(event.target.id);
  const playerInfo = document.getElementById('playerinfo');

  if (currentPlayer() === 'O') {
    selectedCell.innerHTML = 'O';
    playerInfo.innerHTML = 'X';
  } else {
    selectedCell.innerHTML = 'X';
    playerInfo.innerHTML = 'O';
  }
};

function currentPlayer() {
  const player = document.getElementById('playerinfo');
  return player.innerHTML;
};

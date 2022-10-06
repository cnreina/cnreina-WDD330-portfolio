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
  if ("ontouchend" in document.documentElement) {
    console.log("Using touchend");
    gridContainer.addEventListener('touchend', handleGridContainerEvent);
  }
  else {
    console.log("Using click");
    gridContainer.addEventListener('click', handleGridContainerEvent);
  }
  
  const playerInfo = document.getElementById('playerinfo');
  playerInfo.innerHTML = 'O';

};

function handleResetButtonEvent(event) {
  resetGame();
};

function handleGridContainerEvent(event) {
  const selectedCell = document.getElementById(event.target.id);
  const playerInfo = document.getElementById('playerinfo');

  if (selectedCell.innerHTML === 'O' || selectedCell.innerHTML === 'X') { return; };

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

function resetGame() {
  const gridCells = document.querySelectorAll('.gridcells');
  for(const cell of gridCells) {
    cell.innerHTML = '';
  };
};

/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */


window.onload = function () {
  // SETUP HANDLERS
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
  };
  
  const playerInfo = document.getElementById('playerinfo');
  playerInfo.innerHTML = 'O';

};

// EVENT HANDLERS

function handleResetButtonEvent() {
  resetGame();
};

function handleGridContainerEvent(event) {
  const selectedCell = document.getElementById(event.target.id);
  const playerInfo = document.getElementById('playerinfo');

  // prevent overwriting
  if (selectedCell.innerHTML === 'O' || selectedCell.innerHTML === 'X') { return; };

  // game is over
  if (currentPlayer() === '') { return; };

  // set cell
  if (currentPlayer() === 'O') {
    selectedCell.innerHTML = 'O';
    playerInfo.innerHTML = 'X';
  } else {
    selectedCell.innerHTML = 'X';
    playerInfo.innerHTML = 'O';
  };

  // process game state
  if (isGameOver() === 'O') {
    displayResult('O');
    return;
  };
  if (isGameOver() === 'X') {
    displayResult('X');
    return;
  };
  if (isGameOver() === '.') {
    displayResult('.');
    return;
  };

};

// GAME LOGIC

/*	isGameOver
  Returns O or X as winner.
  Returns . to signal no empty cells.
  Returns empty if game continues.
*/
function isGameOver() {
  // Player O winns
  if (gameCompleted() === 'O') {
    return 'O';
  };
  
  // Player X winns
  if (gameCompleted() === 'X') {
    return 'X';
  };
  
  // Game Over - No winner (No empty cells)
  if (gridIsFull() === true) {
    return '.';
  };

  // Continue - No winner
  return '';
};

function gameCompleted() {
  // Player O
  if (columnCompleted() === 'O') {
    return 'O';
  };
  if (rowCompleted() === 'O') {
    return 'O';
  };
  if (diagonalCompleted() === 'O') {
    return 'O';
  };

  // Player X
  if (columnCompleted() === 'X') {
    return 'X';
  };
  if (rowCompleted() === 'X') {
    return 'X';
  };
  if (diagonalCompleted() === 'X') {
    return 'X';
  };

  // No winner
  return '';
};

function rowCompleted() {
  // 1
  const cell01 = document.getElementById('gridcell01');
  const cell02 = document.getElementById('gridcell02');
  const cell03 = document.getElementById('gridcell03');
  if (cell01.innerHTML === 'O' && cell02.innerHTML === 'O' && cell03.innerHTML === 'O') {
    cell01.classList.add('redColor');
    cell02.classList.add('redColor');
    cell03.classList.add('redColor');
    return 'O';
  };
  if (cell01.innerHTML === 'X' && cell02.innerHTML === 'X' && cell03.innerHTML === 'X') {
    cell01.classList.add('redColor');
    cell02.classList.add('redColor');
    cell03.classList.add('redColor');
    return 'X';
  };

  // 2
  const cell04 = document.getElementById('gridcell04');
  const cell05 = document.getElementById('gridcell05');
  const cell06 = document.getElementById('gridcell06');
  if (cell04.innerHTML === 'O' && cell05.innerHTML === 'O' && cell06.innerHTML === 'O') {
    cell04.classList.add('redColor');
    cell05.classList.add('redColor');
    cell06.classList.add('redColor');
    return 'O';
  };
  if (cell04.innerHTML === 'X' && cell05.innerHTML === 'X' && cell06.innerHTML === 'X') {
    cell04.classList.add('redColor');
    cell05.classList.add('redColor');
    cell06.classList.add('redColor');
    return 'X';
  };

  // 3
  const cell07 = document.getElementById('gridcell07');
  const cell08 = document.getElementById('gridcell08');
  const cell09 = document.getElementById('gridcell09');
  if (cell07.innerHTML === 'O' && cell08.innerHTML === 'O' && cell09.innerHTML === 'O') {
    cell07.classList.add('redColor');
    cell08.classList.add('redColor');
    cell09.classList.add('redColor');
    return 'O';
  };
  if (cell07.innerHTML === 'X' && cell08.innerHTML === 'X' && cell09.innerHTML === 'X') {
    cell07.classList.add('redColor');
    cell08.classList.add('redColor');
    cell09.classList.add('redColor');
    return 'X';
  };

  return '';
};

function columnCompleted() {
  // 1
  const cell01 = document.getElementById('gridcell01');
  const cell04 = document.getElementById('gridcell04');
  const cell07 = document.getElementById('gridcell07');
  if (cell01.innerHTML === 'O' && cell04.innerHTML === 'O' && cell07.innerHTML === 'O') {
    cell01.classList.add('redColor');
    cell04.classList.add('redColor');
    cell07.classList.add('redColor');
    return 'O';
  };
  if (cell01.innerHTML === 'X' && cell04.innerHTML === 'X' && cell07.innerHTML === 'X') {
    cell01.classList.add('redColor');
    cell04.classList.add('redColor');
    cell07.classList.add('redColor');
    return 'X';
  };

  // 2
  const cell02 = document.getElementById('gridcell02');
  const cell05 = document.getElementById('gridcell05');
  const cell08 = document.getElementById('gridcell08');
  if (cell02.innerHTML === 'O' && cell05.innerHTML === 'O' && cell08.innerHTML === 'O') {
    cell02.classList.add('redColor');
    cell05.classList.add('redColor');
    cell08.classList.add('redColor');
    return 'O';
  };
  if (cell02.innerHTML === 'X' && cell05.innerHTML === 'X' && cell08.innerHTML === 'X') {
    cell02.classList.add('redColor');
    cell05.classList.add('redColor');
    cell08.classList.add('redColor');
    return 'X';
  };

  // 3
  const cell03 = document.getElementById('gridcell03');
  const cell06 = document.getElementById('gridcell06');
  const cell09 = document.getElementById('gridcell09');
  if (cell03.innerHTML === 'O' && cell06.innerHTML === 'O' && cell09.innerHTML === 'O') {
    cell03.classList.add('redColor');
    cell06.classList.add('redColor');
    cell09.classList.add('redColor');
    return 'O';
  };
  if (cell03.innerHTML === 'X' && cell06.innerHTML === 'X' && cell09.innerHTML === 'X') {
    cell03.classList.add('redColor');
    cell06.classList.add('redColor');
    cell09.classList.add('redColor');
    return 'X';
  };

  return '';
};

function diagonalCompleted() {
  // diagonal 1
  const cell01 = document.getElementById('gridcell01');
  const cell05 = document.getElementById('gridcell05');
  const cell09 = document.getElementById('gridcell09');
  if (cell01.innerHTML === 'O' && cell05.innerHTML === 'O' && cell09.innerHTML === 'O') {
    cell01.classList.add('redColor');
    cell05.classList.add('redColor');
    cell09.classList.add('redColor');
    return 'O';
  };
  if (cell01.innerHTML === 'X' && cell05.innerHTML === 'X' && cell09.innerHTML === 'X') {
    cell01.classList.add('redColor');
    cell05.classList.add('redColor');
    cell09.classList.add('redColor');
    return 'X';
  };

  // diagonal 2
  const cell03 = document.getElementById('gridcell03');
  // const cell05 = document.getElementById('gridcell05');
  const cell07 = document.getElementById('gridcell07');
  if (cell03.innerHTML === 'O' && cell05.innerHTML === 'O' && cell07.innerHTML === 'O') {
    cell03.classList.add('redColor');
    cell05.classList.add('redColor');
    cell07.classList.add('redColor');
    return 'O';
  };
  if (cell03.innerHTML === 'X' && cell05.innerHTML === 'X' && cell07.innerHTML === 'X') {
    cell03.classList.add('redColor');
    cell05.classList.add('redColor');
    cell07.classList.add('redColor');
    return 'X';
  };

  return '';
};

function gridIsFull() {
  const gridCells = document.querySelectorAll('.gridcells');
  for (const cell of gridCells) {
    if (cell.innerHTML === '') {
      return false;
    };
  };
  return true;
};

// GAME CONTROL
function currentPlayer() {
  const player = document.getElementById('playerinfo');
  return player.innerHTML;
};

function resetGame() {
  const playerInfoLabel = document.getElementById('playerinfolabel');
  playerInfoLabel.innerHTML = 'Current Player:';
  const playerInfo = document.getElementById('playerinfo');
  playerInfo.innerHTML = 'O';

  const gridCells = document.querySelectorAll('.gridcells');
  for(const cell of gridCells) {
    cell.innerHTML = '';
    cell.classList.remove('redColor');
  };
};

function displayResult(codeParam) {
  const playerInfoLabel = document.getElementById('playerinfolabel');
  const playerInfo = document.getElementById('playerinfo');
  playerInfo.innerHTML = '';
  switch (codeParam) {
    case 'O':
      playerInfoLabel.innerHTML = 'O winns!';
    break;

    case 'X':
      playerInfoLabel.innerHTML = 'X winns!';
    break;

    case '.':
      playerInfoLabel.innerHTML = 'Game Over - No winner';
    break;
      
    default:
      break;
  }
};

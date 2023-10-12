const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*
if(!score){
score = {
  wins: 0,
  losses: 0,
  ties: 0
};
}
*/

let isAutoPlaying = false;
let intervalId;
/*const autoPlay = () => {

};*/
//in this case normal function syntax is easier to read and allows hoisting so is better than arrow function
function autoPlay(){
  if(!isAutoPlaying){
    intervalId =setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors');
});
document.querySelector('.js-autoPlay-button').addEventListener('click', autoPlay);

document.querySelector('.js-reset-button').addEventListener('click', () => {
  score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('Rock');
  } else if(event.key === 'p'){
    playGame('Paper');
  } else if(event.key === 's'){
    playGame('Scissors');
  }
});

function playGame(playerMove){
const computerMove = pickComputerMove();
let result = '';

if(playerMove === 'Scissors'){
  if(computerMove === 'Rock'){
    result = 'You lose';
  } else if(computerMove === 'Paper'){
    result = 'You win!!!';
  } else {
    result = 'Tie';
  }
}
 else if(playerMove === 'Paper'){
    if(computerMove === 'Rock'){
        result = 'You win!!!';
      } else if(computerMove === 'Paper'){
        result = 'Tie';
      } else {
        result = 'You lose';
      }
  }
   else if(playerMove === 'Rock'){
    if(computerMove === 'Rock'){
        result = 'Tie';
      } else if(computerMove === 'Paper'){
        result = 'You lose';
      } else {
        result = ' You win!!!';
      }
    }

    if(result === 'You win!!!'){
      score.wins += 1;
    } else if(result === 'You lose'){
      score.losses += 1;
    } else if(result === 'Tie'){
      score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result')
    .innerHTML = result;

    document.querySelector('.js-moves')
    .innerHTML = ` You
<img src="Images/${playerMove}.png" 
class="move-icon">
<img src="Images/${computerMove}.png" 
class="move-icon">
Computer`;


}

function updateScoreElement(){
document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins}, losses: ${score.losses}, Ties: ${score.ties}`;
}


function pickComputerMove(){
const randomNumber = Math.random();

let computerMove = '';

if(randomNumber >=0 && randomNumber < 1/3){
    computerMove = 'Rock';
  } else if(randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'Paper';
  } else {
    computerMove = 'Scissors';
}

return computerMove; // return statement ends function here, nothing after will run
}
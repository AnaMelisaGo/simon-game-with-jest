let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    turnProgress : false,
    lastButton: '',
    choices: ['button1', 'button2', 'button3', 'button4'],
}

function newGame(){
    /**
     * Function to reset the game frome the start when
     * new game button is clicked
    */ 
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    for (let circle of document.getElementsByClassName('circle')) {
        if (circle.getAttribute('data-listener') !== 'true') {
            circle.addEventListener('click', (e) => {
                if (game.currentGame.length > 0 && !game.turnProgress) {
                    let move = e.target.getAttribute('id');
                    game.lastButton = move;
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }
            });
            circle.setAttribute('data-listener', 'true'); 
        }
    }
    showScore();
    addTurn();

}

function showScore() {
    /**
     * Function to show score
     */
    document.getElementById('score').innerText = game.score;
}

function addTurn(){
    /**
     * A function to add random selected button to currentGame
     */
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random()*4))]);
    showTurns();
}

function lightsOn(circle) {
    /**
     * Function to add light effects to the game
     */
    document.getElementById(circle).classList.add('light');
    setTimeout(() => {
        document.getElementById(circle).classList.remove('light');
    }, 400);
}

function showTurns() {
    /**
     * A function to show turns to the player
     */
    game.turnNumber = 0;
    game.turnProgress = true;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnProgress = false;
        }
    }, 1000);
}

function playerTurn() {
    /**
     * Function to take the player's turn and compares it to the
     * computer's random choice
     */
    let i = game.playerMoves.length -1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length == game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        } 
    } else {
        alert('Wrong move!');
        newGame();
    }
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };
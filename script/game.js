let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
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
    //showTurn;
}

module.exports = { game, newGame, showScore, addTurn };
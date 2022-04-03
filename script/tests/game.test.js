/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

jest.spyOn(window, 'alert').mockImplementation(() => {})

beforeAll(() => {
    const fs = require('fs');
    const fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test('currentGame key exists', () => {
        expect('currentGame' in game).toBe(true);
    });
    test('playerMoves key exists', () => {
        expect('playerMoves' in game).toBe(true);
    });
    test('choices key exists', () => {
        expect('choices' in game).toBe(true);
    });
    test('turnNumber key exists', () => {
        expect('turnNumber' in game).toBe(true);
    });
    test('choices contains correct ids', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']);
    });
    test('lastButton key exists', ()=> {
        expect('lastButton' in game).toBe(true);
    });
    test('turnProgress key progress', ()=> {
        expect('turnProgress' in game).toBe(true);
    });
    test('turnProgress key value is false', () => {
        expect(game.turnProgress).toEqual(false);
    })
});

describe('newGame should reset everything frome the start', () => {
    beforeAll(() => {
        game.score = 42;
        game.currentGame = ['button2', 'button3', 'button1', 'button4'];
        game.playerMoves = ['button2', 'button3', 'button1', 'button4'];
        document.getElementById('score').innerText = '42';
        newGame();
    });
    test('score is back to 0', () => {
        expect(game.score).toEqual(0);
    });
    test("should be one move in the computer's array", () => {
        expect(game.currentGame.length).toEqual(1);
    });
    test('playerMoves is reset', () => {
        expect(game.playerMoves.length).toEqual(0);
    });
    test('turn number is reset to 0', () => {
        expect(game.turnNumber).toEqual(0);
    })
    test('should display 0 in the element with score id', () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    });
});

describe('gameplay is working correctly', () => {
    beforeEach(() => {
        game.currentGame = [];
        game.playerMoves = [];
        game.score = 0;
        addTurn();
    });
    afterEach(() => {
        game.currentGame = [];
        game.playerMoves = [];
        game.score = 0;
    });
    test('addTurn adds a new turn to the game', () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test('Should add the correct class to light up the buttons', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    });
    test('showTurns should update game.turnNumber', () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test('data-listener to set to true', () => {
        const elements = document.getElementsByClassName('circle');
        for (let element of elements) {
            expect(element.getAttribute('data-listener')).toEqual('true');
        }
    });
    test('should incement the score if the turn is correct', () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test('should call an alert if the move is wrong', () => {
        game.playerMoves.push('wrong');
        playerTurn();
        expect(window.alert).toBeCalledWith('Wrong move!');
    });
    test('turning progress is set to true', () => {
        showTurns();
        expect(game.turnProgress).toBe(true);
    });
    test('clicking during computer sequence should fail', () =>{
        showTurns();
        game.lastButton = '';
        document.getElementById('button2').click();
        expect(game.lastButton).toEqual('');
    })
});

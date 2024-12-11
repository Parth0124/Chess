"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const Messages_js_1 = require("./Messages.js");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: Messages_js_1.INIT_TYPE,
            payload: {
                color: "white",
            },
        }));
        this.player2.send(JSON.stringify({
            type: Messages_js_1.INIT_TYPE,
            payload: {
                color: "black",
            },
        }));
        this.moveCount = 0;
    }
    makeMove(socket, move) {
        //validation for making a move
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            return;
        }
        try {
            this.board.move(move);
        }
        catch (error) {
            console.log(error);
            return;
        }
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: Messages_js_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white",
                },
            }));
            this.player2.send(JSON.stringify({
                type: Messages_js_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white",
                },
            }));
            return;
        }
        if (this.moveCount % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: Messages_js_1.MOVE,
                payload: move,
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: Messages_js_1.MOVE,
                payload: move,
            }));
        }
        this.moveCount++;
    }
}
exports.Game = Game;

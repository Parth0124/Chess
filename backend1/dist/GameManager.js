"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Messages_js_1 = require("./Messages.js");
const Game_js_1 = require("./Game.js");
class GameManager {
    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter((user) => socket !== user);
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === Messages_js_1.INIT_TYPE) {
                if (this.pendingUser) {
                    const game = new Game_js_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type === Messages_js_1.MOVE) {
                const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;

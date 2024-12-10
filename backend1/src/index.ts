import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({port:4000});

const gameManager = new GameManager()

wss.on('connection', function connection(ws) {
    gameManager.addUser(ws)

    ws.on('disconnect', () => gameManager.removeUser(ws))
    
    ws.send('something')

});

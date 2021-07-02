'use strict'

const { httpServer, httpsServer, wsServerFront, wsServerClient } = require('../constants/express')
const url = require('url')


let rsArray = new Array()

const wsService = {
    wsUpgrade: function () {
        httpsServer.on('upgrade', (req, socket, head) => {
            switch (url.parse(req.url).pathname) {
                case '/rsfront':
                    wsServerFront.handleUpgrade(req, socket, head, (ws) => {
                        wsServerFront.emit('connection', ws, req);
                    });
                    break;
                case '/rsclient':
                    wsServerClient.handleUpgrade(req, socket, head, (ws) => {
                        wsServerClient.emit('connection', ws, req);
                    });
                default:
                    //socket.destroy();
                    break;
            }
        });
    },
    wsFront: function () {
        // At front connection on websocket
        wsServerFront.on('connection', function connection(ws, req) {

            const uuid = url.parse(req.url).query;
            console.log(`Connection received from front for uuid : ${uuid}`)

            // Create entry in rsArray
            rsArray.push({
                uuid: uuid,
                front: ws,
                client: null
            })
            
            wsServerFront.on('message', (ws, msg) => {
                // Loop through rsArray
                rsArray.forEach(rs => {
                    if (rs.uuid === uuid && rs.server === ws) {
                        rs.client.send(msg)
                    }
                });
            });
        });
    },
    wsClient: () => {
        // At client connection on websocket
        wsServerClient.on('connection', function connection(ws, req) {
            const uuid = url.parse(req.url).query;
            console.log(`Connection received from client for uuid : ${uuid}`)
            ws.send("dir")
        
            // Loop through rsArray
            rsArray.forEach(rs => {
                if (rs.uuid === uuid && rs.client === null) {
                    rs.client = ws
                    rs.front.send("Client connected")
                }
            });
            ws.on('message', function incoming(message) {
                console.log('received: %s', message)
                // Loop through rsArray
                rsArray.forEach(rs => {
                    if (rs.uuid === uuid && rs.client === ws) {
                        console.log(`${uuid} found`)

                        rs.front.send("Un message a été recu")
                    }
                });
            });
        });
    }
}

module.exports = wsService
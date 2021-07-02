'use strict'

const { httpServer, httpsServer, wsServerFront, wsServerClient } = require('../constants/express')
const url = require('url')

let rsArray = new Array()

const wsService = {

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
        });
        wsServerFront.on('message', function (ws, msg) {
            // Loop through rsArray
            rsArray.forEach(rs => {
                if (rs.uuid === uuid && rs.server === ws) {
                    rs.client.send(msg)
                }
            });
        });
    },
    wsClient: function () {
        // At client connection on websocket
        wsServerClient.on('connection', function connection(ws, req) {
            const uuid = url.parse(req.url).query;
            console.log(`Connection received from client for uuid : ${uuid}`)

            // Loop through rsArray
            rsArray.forEach(rs => {
                if (rs.uuid === uuid && rs.client === null) {
                    rs.client = ws
                    rs.front.send("Client connected")
                }
                ws.send("whoami")
            });
        });
        wsServerClient.on('message', function (ws, msg) {
            console.log(msg)
            // Loop through rsArray
            rsArray.forEach(rs => {
                if (rs.uuid === uuid && rs.client === ws) {
                    console.log(`${uuid} found`)
                    
                    rs.front.send(msg)
                }
            });
        });
    }
}

module.exports = wsService
'use strict'

const { httpServer, httpsServer, wsServerFront, wsServerClient } = require('../constants/express')
const url = require('url')
const iconv = require('iconv-lite')

/*
const fs = require('fs')
const charsetDetector = require('node-icu-charset-detector')
const iconvlite = require('iconv-lite');
*/


/*
function getFileContentsInUTF8(file_path) {
  var content = fs.readFileSync(file_path);
  var original_charset = charsetDetector.detectCharset(content);
  var jsString = iconvlite.decode(content, original_charset.toString());
  return jsString;
}
*/

let rsArray = new Array()

const wsService = {
    wsUpgrade: function () {
        httpsServer.on('upgrade', (req, socket, head) => {
            
            switch (url.parse(req.url).pathname) {
                case '/rsfront':
                    wsServerFront.handleUpgrade(req, socket, head, (ws) => {
                        wsServerFront.emit('connection', ws, req);
                    })
                    break
                case '/rsclient':
                    wsServerClient.handleUpgrade(req, socket, head, (ws) => {
                        wsServerClient.emit('connection', ws, req);
                    })
                    break
                default:
                    socket.destroy();
                    break;
            }
        })
    },


    wsFront: function () {
        // At front connection on websocket
        wsServerFront.on('connection', (ws, req) => {

            const uuid = url.parse(req.url).query;
            console.log(`Connection received from front for uuid : ${uuid}`)

            // Create entry in rsArray
            // Register uuid and front
            //console.log(req.socket.remoteAddress)
            rsArray.push({
                uuid: uuid,
                front: ws,
                client: null
            })
            ws.on('message', (msg) => {
                console.log(`Front : ${msg}`)

                // Find good client and transfer message
                rsArray.forEach(rs => {
                    if (rs.front === ws && rs.client) {
                        console.log(`Front -> Client : OK`)
                        rs.client.send(msg)
                    }
                })
            })

            ws.on('close', () => {
                console.log("Front closed")

                // Find good front, close client connection and unregister from rsArray
                rsArray.forEach((rs, index, rsArray) => {
                    if (rs.front === ws && rs.client) {
                        rs.client.close()
                        rsArray.splice(index, 1)
                    }
                })
            })
        })
    },


    wsClient: () => {
        // At client connection on websocket
        wsServerClient.on('connection', (ws, req) => {
            const uuid = url.parse(req.url).query;
            console.log(`Connection received from client for uuid : ${uuid}`)

            // Find a good entry in rsArray
            // Register client
            rsArray.forEach(rs => {
                if (rs.uuid === uuid && rs.client === null && rs.front) {
                    rs.client = ws
                    rs.front.send("Client connected")
                    return
                }
            })

            ws.on('message', (msg) => {
                const encodedMessage = iconv.decode(msg, 'cp850')
                console.log(`Client : ${encodedMessage}`)

                // Find good front and transfer message
                rsArray.forEach(rs => {
                    if (rs.client === ws && rs.front) {
                        console.log(`Client -> Front : OK`)
                        rs.front.send(encodedMessage)

                    }
                })
            })
            ws.on('close', () => {
                console.log("Client closed")

                // Find good client, close front connection and unregister from rsArray
                rsArray.forEach((rs, index, rsArray) => {
                    if (rs.client === ws && rs.front) {
                        rs.front.send("Client disconnected")
                        rs.front.close()
                        rsArray.splice(index, 1)
                    }
                })
            })
        })
    }
}

module.exports = wsService
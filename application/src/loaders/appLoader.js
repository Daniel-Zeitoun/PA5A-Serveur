'use strict'

const { httpServer, httpsServer } = require('../constants/express')
const sequelize = require('../constants/sequelize')
const WebSocket = require('ws')
const readline = require('readline');
const url = require('url')
const wsService = require('../services/wsService')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const appLoader = async () => {
  const httpPort = 80
  const httpsPort = 443


  try {
    httpServer.listen(httpPort)
    console.log(`HTTP Server running on port ${httpPort}`)

    httpsServer.listen(httpsPort)
    console.log(`HTTPS Server running on port ${httpsPort}`)

    wsService.wsFront()
    wsService.wsClient()

    /*wsServerFront.on('connection', function connection(ws, req) {

      if (ws.readyState == 1) {
        console.log(`Server say : Connection is now established from ${ws}`)
        //console.log(req)

        //    const uuid = req.url.split('?')[1].split('=')[1]

        //   console.log(uuid)

      }
      else if (ws.readyState == 2) {
        console.log(`Server say : Connection is now closing`)
      }
      else {
        console.log(`Server say : Connection is closed`)
      }
*/
    /* Message receive from websocket connection  */

    /* ws.on('message', function incoming(message) {
       //  console.log(`${message}`)
       let remote_addr = req.socket.remoteAddress
       //  ws.send("dir")
       if (checkIfValidUUID(message) == true) {
         //    console.log("Thats a valid uuid, need to add in the tab")
*/
    /*  if (uniqueValues.size < tab.length) {
          console.log('duplicates found')
        }*/
    //  Bot.uuid = message
    //cd  tab.push(Bot)
    // }

    //else {
    //     console.log("That's not a uuid, it's a command")
    //   console.log(`Command: ${message}`)
    //}

    //  console.log(tab)
    //})

    // ws.send("dir")

    /*
    
        function removeDuplicates(array) {
          return array.filter((a, b) => array.indexOf(a) === b)
        };
    
        function checkIfValidUUID(str) {
          // Regular expression to check if string is a valid UUID
          const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    
          return regexExp.test(str);
        }
      })
    */

  } catch (error) {
    console.error()
  }

  await sequelize.sync()
}

module.exports = appLoader
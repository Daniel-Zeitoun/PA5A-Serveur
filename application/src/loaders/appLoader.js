'use strict'

const { httpServer, httpsServer, wsServer } = require('../constants/express')
const sequelize = require('../constants/sequelize')

const appLoader = async () => {
    const httpPort = 80
    const httpsPort = 443

    try {
        httpServer.listen(httpPort)
        console.log(`HTTP Server running on port ${httpPort}`)

        httpsServer.listen(httpsPort)
        console.log(`HTTPS Server running on port ${httpsPort}`)

        const wsPortSplited = wsServer.options.server._connectionKey.split(':')
        console.log(`WebSocket Server running on port ${wsPortSplited[wsPortSplited.length - 1]}`)


        wsServer.on('connection', function connection(ws) {
            console.log(`Connexion ok : ${ws}`)

            
            ws.on('message', function incoming(message) {
                console.log(`Message recu : ${message}`)
            })

            ws.send("whoami")
        })

    } catch (error) {
        console.error()
    }

    await sequelize.sync()
}

module.exports = appLoader
'use strict'

const { httpServer, httpsServer } = require('../constants/express')
const sequelize = require('../constants/sequelize')

const appLoader = async () => {
    const httpPort = 80
    const httpsPort = 443

    try {
        httpServer.listen(httpPort)
        console.log(`HTTP Server running on port ${httpPort}`)

    } catch (error) {
        console.error()
    }

    try {
        httpsServer.listen(httpsPort)
        console.log(`HTTPS Server running on port ${httpsPort}`)

    } catch (error) {
        console.error()
    }
    await sequelize.sync()
}

module.exports = appLoader
'use strict'

const { httpsServer } = require('../constants/express')
const sequelize = require('../constants/sequelize')
const wsService = require('../services/wsService')

const appLoader = async () => {
  const httpPort = 80
  const httpsPort = 443

  try {
    /*httpServer.listen(httpPort, () => {
      console.log(`HTTP Server running on port ${httpPort}`)
    })*/

    httpsServer.listen(httpsPort, () => {
      console.log(`HTTPS Server running on port ${httpsPort}`)
    })

    // Start websockets
    wsService.wsFront()
    wsService.wsClient()
    wsService.wsUpgrade()

  } catch (error) {
    console.error()
  }

  await sequelize.sync()
}

module.exports = appLoader
'use strict'

const appLoader = require('./loaders/appLoader')
const dbLoader = require('./loaders/dbLoader')

const start = async () => {
    await appLoader()
    await dbLoader()
}

start().catch(err => console.error(`Application bootstraping error (${err.message})`, err.stack))
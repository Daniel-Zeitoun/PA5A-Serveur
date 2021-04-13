'use strict'

const express = require("express")
const path = require("path")
const api = require("./controllers/api")

const app = express()
const port = 80

for (const [key, value] of Object.entries({
    "x-powered-by": false
})) app.set(key, value)

app.use("/api", api)

app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`)
})
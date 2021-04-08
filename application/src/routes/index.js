const express = require("express")
const router = express.Router()

const apiRoutes = require("../api/polling")

module.exports = () => {

    router.get("/", (req, res) => {
        res.send("<h1>Welcome to PA5A Server</h1>")
    })

    router.use("/api/polling", apiRoutes())

    return router
}


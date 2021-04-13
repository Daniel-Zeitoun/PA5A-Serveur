'use strict'

const express = require("express")
const router = express.Router()
const clientService = require("../../services/clients")

router.put("/:uuid", (req, res) => {
    const { isNew, data } = clientService.createOrUpdate(req.params.uuid)
    res.status(isNew ? 201 : 200).json(data)
})
module.exports = router
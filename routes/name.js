'use strict'
const express = require('express')
const router = express.Router()

const data = require('../data/name.js')

let id = 4

router.route('/')
    .get((req, res) => {
        console.log("recive get")
        res.json(data)
    })
    .post((req, res) => {
        console.log(`recieve post.\nrequest.body = ${JSON.stringify(req.body)}`)
        const { name } = req.body
        if (typeof name !== 'string' || !name) {
            const err = new Error('name is required')
            err.statusCode = 400
            next(err)
        } else {
            const newname = {id: id += 1, name: name}
            data.push(newname)
            res.status(201).json(name) 
        }
    })

module.exports = router

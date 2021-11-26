'use strict'
const express = require('express')
const router = express.Router()

let data = require('../data/name.js')

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

router.route('/:id(\\d+)')
    .delete((req, res) => {
        const targetId = Number(req.params.id)
        console.log("recive delete.")
        data = data.filter(name => name.id !== targetId)
        res.status(204).end()
    })
    .put((req, res) => {
        const targetId = Number(req.params.id)
        console.log(`recieve put.\nrequest.body = ${JSON.stringify(req.body)}`)
        const { name } = req.body
        if (typeof name !== 'string' || !name) {
            const err = new Error('name is required')
            err.statusCode = 400
            next(err)
        } else {
            let newname = {id: targetId, name: name}
            data = data.map(x => {
                return x.id === targetId ? {id: x.id, name: name} : x
            })
            res.status(202).json(newname) 
        }
    })

module.exports = router

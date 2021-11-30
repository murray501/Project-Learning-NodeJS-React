'use strict'

const uuid = require('uuid')

const express = require('express')
const router = express.Router()

let db = require('./../database')
let id = 0;

(async () => await db.removeAll())();

router.route('/')
    .get((req, res, next) => {
        console.log("recive get")
        db.fetchAll().then(data => res.json(data), next)
    })
    .post((req, res, next) => {
        console.log(`recieve post.\nrequest.body = ${JSON.stringify(req.body)}`)
        const { name } = req.body
        if (typeof name !== 'string' || !name) {
            const err = new Error('name is required')
            err.statusCode = 400
            next(err)
        } else {
            const newname = {id: ++id, name: name}
            db.put(newname).then(() => res.status(201).json(newname), next)
        }
    })

router.route('/:id(\\d+)')
    .delete((req, res, next) => {
        const targetId = Number(req.params.id)
        console.log("recive delete.")
        db.del(targetId).then(() => res.status(204).end(), next)
    })
    .put((req, res, next) => {
        const targetId = Number(req.params.id)
        console.log(`recieve put.\nrequest.body = ${JSON.stringify(req.body)}`)
        const { name } = req.body
        if (typeof name !== 'string' || !name) {
            const err = new Error('name is required')
            err.statusCode = 400
            next(err)
        } else {
            let newname = {id: targetId, name: name}
            db.update(newname).then(() => res.status(202).json(newname), next)            
        }
    })

module.exports = router

'use strict'

const express = require('express')

const app = express()

app.use(express.json())

app.use('/name', require('./routes/name'))


app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).json({ error: err.message })
})

module.exports = app.listen(3000)

const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })

nextApp.prepare().then(
    () => app.get('*', nextApp.getRequestHandler()),
    err => {
        console.error(err)
        process.exit(1)
    }
)

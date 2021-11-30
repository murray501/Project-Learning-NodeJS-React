'use strict'

const express = require('express')

const app = express()

app.use(express.json())

app.use('/name', require('./routes/name'))

// error handling
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).json({ error: err.message })
})

module.exports = app.listen(3000)

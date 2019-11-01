const express = require('express')
const helmet = require('helmet')

const server = express()

//middleware
server.use(helmet())
server.use(express.json())

//router
const projectRouter = require('./router/projectRouter')
server.use('/api/projects', projectRouter)

module.exports = server

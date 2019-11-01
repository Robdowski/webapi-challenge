const express = require('express')
const helmet = require('helmet')

const server = express()

//middleware
server.use(helmet())
server.use(express.json())

//router
const projectRouter = require('./router/projectRouter')
server.use('/api/projects', projectRouter)

const actionRouter = require('./router/actionRouter')
server.use('/api/actions', actionRouter)

module.exports = server

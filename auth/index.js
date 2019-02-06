const express = require('express')
const app = express()
const server = require('http').Server(app)

const port = 4000
const route = require('./app/routes')

app.use(route)

server.listen(port, () => {
  console.log(`auth service listening on ${port}`)
})
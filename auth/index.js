const express = require('express')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const validator = require('express-validator')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secret_key = process.env.JWT_SECRET

const port = 4000
const route = require('./app/routes')

//connect to mongoDb with mongoose
mongoose.connect('mongodb://lab_bis_service_auth:ariefyusron98@ds125125.mlab.com:25125/lab_bis_auths')
mongoose.Promise = global.Promise

app.use((req,res,next) => {
  req.bcrypt = bcrypt
  req.saltRounds = saltRounds
  req.jwt = jwt
  req.secret_key = secret_key
  next()
})
app.use(bodyParser.json())
app.use(validator())
app.use(route)

server.listen(port, () => {
  console.log(`auth service listening on ${port}`)
})
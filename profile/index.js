const express = require('express')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const validator = require('express-validator')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const secret_key = process.env.JWT_SECRET

const port = 5000
const route = require('./app/routes')

//connect to mongoDb with mongoose
mongoose.connect('mongodb://lab_bis_service_profile:ariefyusron98@ds125125.mlab.com:25125/lab_bis_profiles')
mongoose.Promise = global.Promise

app.use((req,res,next) => {
  req.jwt = jwt
  req.secret_key = secret_key
  next()
})
app.use(bodyParser.json())
app.use(validator())
app.use(route)

server.listen(port, () => {
  console.log(`profile service listening on ${port}`)
})
const authModel = require('../models/auth')

const register = async (req,res) => {
  try{
    const newUser = await authModel.create(req.body)
    res.json(newUser)
  } catch{
    res.status(400).json({
      message: 'NIM already exists'
    })
  }
}

const login = async (req,res) => {
  res.json('login')
}

module.exports = {
  register,
  login
}
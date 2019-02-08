const authModel = require('../models/class')

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
  const userByNim = await authModel.findOne({
    nim: req.body.nim
  })
  if(userByNim){
    const compare = req.bcrypt.compareSync(req.body.password,userByNim.password)
    if(compare){
      const token = req.jwt.sign({userByNim},req.secret_key)
      res.json({
        userData: userByNim,
        token: token
      })
    } else{
      res.status(400).json({
        message: 'Password invalid'
      })
    }
  } else{
    res.status(400).json({
      message: 'NIM invalid'
    })
  }
}

module.exports = {
  register,
  login
}
const register = (req,res,next) => {
  req.check('nim', 'NIM length 12').isLength({min:12, max:12})
  const error = req.validationErrors()
  if(error){
    res.status(400).json({
      message: error[0].msg
    })
  } else{
    req.body.password = req.bcrypt.hashSync(req.body.nim, req.saltRounds)
    next()
  }
}

module.exports = {
  register
}
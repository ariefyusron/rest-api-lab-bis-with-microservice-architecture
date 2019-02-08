const checkAuth = (req,res,next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]
    const decoded = req.jwt.verify(token,req.secret_key)
    req.userData = decoded.userByNim
    next()
  } catch(error){
    res.status(400).json({message: 'Auth failed'})
  }
}

const validasiStoreClass = (req,res,next) => {
  req.check('name', 'Name is required').not().isEmpty()
  req.check('classId', 'Class Id is required').not().isEmpty()
  const error = req.validationErrors()
  if(error){
    res.status(400).json({
      message: error[0].msg
    })
  } else{
    next()
  }
}

module.exports = {
  checkAuth,
  validasiStoreClass
}
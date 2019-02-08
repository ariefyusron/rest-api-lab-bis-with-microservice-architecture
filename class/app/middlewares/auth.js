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

module.exports = {
  checkAuth
}
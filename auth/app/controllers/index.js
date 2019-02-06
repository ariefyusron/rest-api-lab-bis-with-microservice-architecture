const register = async (req,res) => {
  res.json('register')
}

const login = async (req,res) => {
  res.json('login')
}

module.exports = {
  register,
  login
}
const classModel = require('../models/class')

const index = async (req,res) => {
  const getClass = await classModel.find({
    'members.auth_id': req.userData._id
  }, ['name','classIdForJoin','members'])
  res.json(getClass)
}

const store = async (req,res) => {
  try{
    const storeClass = await classModel.create({
      name: req.body.name,
      classIdForJoin: req.body.classId,
      members: {
        auth_id: req.userData._id,
        status: 'Teacher',
      }
    })
    res.json(storeClass)
  }catch{
    res.status(400).json({
      message: 'Class Id already exists'
    })
  }
}

module.exports = {
  index,
  store
}
const classModel = require('../models/class')

const index = async (req,res) => {
  const getClass = await classModel.aggregate([
    {$match: {'members.auth_id': req.userData._id}},
    {$unwind: '$members'},
    {$group: {
      _id: '$_id',
      classIdForJoin: {'$first':'$classIdForJoin'},
      name: {'$first':'$name'},
      totalMembers: {$sum: 1}
    }},
    {$sort: {_id: -1}}
  ])
  for(i in getClass) {
    if(getClass[i].totalMembers === 1){
      getClass[i].totalMembers = `${getClass[i].totalMembers} member`
    } else{
      getClass[i].totalMembers = `${getClass[i].totalMembers} members`
    }
  }
  res.json(getClass)
}

const join = (req,res) => {
  classModel.findOne({
    classIdForJoin: req.params.idClassForJoin
  },(err, result) => {
    if(!result){
      res.status(400).json({
        message: 'Class not found'
      })
    } else{
      for(i in result.members){
        if(req.userData._id == result.members[i].auth_id){
          res.status(400).json({
            message: 'You have joined'
          })
          return false
        }
      }
      result.members.push({auth_id: req.userData._id,status: 'Student'})
      result.save()
      res.json(result)
    }
  })
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
  join,
  store
}
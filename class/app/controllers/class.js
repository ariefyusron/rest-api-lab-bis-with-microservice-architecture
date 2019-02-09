const classModel = require('../models/class')

const index = async (req,res) => {
  const getClassToResults = await classModel.aggregate([
    {$match: {members: {
      $elemMatch: {
        auth_id: req.userData._id,
        isLeave: false
      }
    }}},
    {$unwind: '$members'},
    {$match: {'members.isLeave': false}},
    {$group: {
      _id: '$_id',
      classIdForJoin: {'$first':'$classIdForJoin'},
      name: {'$first':'$name'},
      totalMembers: {$sum: 1}
    }},
    {$sort: {_id: -1}}
  ])
  for(i in getClassToResults) {
    if(getClassToResults[i].totalMembers <= 1){
      getClassToResults[i].totalMembers = `${getClassToResults[i].totalMembers} member`
    } else{
      getClassToResults[i].totalMembers = `${getClassToResults[i].totalMembers} members`
    }
  }
  res.json(getClassToResults)
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
        if(req.userData._id == result.members[i].auth_id && result.members[i].isLeave == false){
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

const leave = (req,res) => {
  classModel.findOne({
    classIdForJoin: req.params.idClassForJoin,
    'members.auth_id': req.userData._id
  },(err, result) => {
    if(!result){
      res.status(400).json({
        message: 'Class not found'
      })
    } else{
      for(i in result.members){
        if(req.userData._id == result.members[i].auth_id && result.members[i].isLeave == false){
          result.members[i].isLeave = true
          result.save()
          res.json(result)
          return false
        }
      }
      res.status(400).json({
        message: 'Class not found'
      })
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
  leave,
  store
}
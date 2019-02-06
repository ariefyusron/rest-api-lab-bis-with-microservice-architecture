const profileModel = require('../models/profile')

const store = async (req,res) => {
  try{
    const storeNewUserProfile = await profileModel.create({
      auth_id: req.userData._id
    })
    res.json(storeNewUserProfile)
  } catch{
    res.status(400).json({
      message: 'User already exists profile'
    })
  }
}

const show = async (req,res) => {
  try{
    let showProfile = await profileModel.findOne({
      auth_id: req.userData._id
    })
    showProfile = {
      nim: req.userData.nim,
      name: showProfile.name || null,
      fakultas: showProfile.fakultas || null,
      prodi: showProfile.prodi || null,
      tahunAngkatan: showProfile.tahunAngkatan || null,
      img_url: showProfile.img_url || null
    }
    res.json(showProfile)
  } catch{
    res.status(400).json({
      message: 'Error please try again'
    })
  }
}

const update = async (req,res) => {
  try{
    await profileModel.findOneAndUpdate({auth_id: req.userData._id}, {$set:req.body})
    let showUpdateProfil = await profileModel.findOne({
      auth_id: req.userData._id
    })
    showUpdateProfil = {
      nim: req.userData.nim,
      name: showUpdateProfil.name || null,
      fakultas: showUpdateProfil.fakultas || null,
      prodi: showUpdateProfil.prodi || null,
      tahunAngkatan: showUpdateProfil.tahunAngkatan || null,
      img_url: showUpdateProfil.img_url || null
    }
    res.json(showUpdateProfil)
  } catch{
    res.status(400).json({
      message: 'Error please try again'
    })
  }
}

module.exports = {
  store,
  show,
  update
}
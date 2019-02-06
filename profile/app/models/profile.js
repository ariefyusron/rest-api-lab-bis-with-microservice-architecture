const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
  auth_id: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
  },
  fakultas: {
    type: String,
  },
  prodi: {
    type: String,
  },
  tahunAngkatan: {
    type: String,
  },
  img_url: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
})

const Profile = mongoose.model('Profile',profileSchema)

module.exports = Profile
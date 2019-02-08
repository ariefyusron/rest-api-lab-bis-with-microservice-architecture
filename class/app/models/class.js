const mongoose = require('mongoose')
const Schema = mongoose.Schema

const classSchema = new Schema({
  nim: {
    type: String,
    minlength: 12,
    maxlength: 12,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
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

const Class = mongoose.model('Class',classSchema)

module.exports = Class
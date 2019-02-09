const mongoose = require('mongoose')
const Schema = mongoose.Schema

const members = new Schema({
  auth_id: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Teacher','Student'],
    required: true
  },
  isLeave: {
    type: Boolean,
    default: 0
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

const classSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  classIdForJoin: {
    type: String,
    unique: true,
    required: true
  },
  members: [members],
  isDelete: {
    type: Boolean,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
  deleted_at: {
    type: Date,
    default: Date.now()
  }
})

const Class = mongoose.model('Class',classSchema)

module.exports = Class
const mongoose = require('mongoose')

const teachersSchema = mongoose.Schema({
  ID:String,
  Name:String,
  Password:String,
  Gender:String,
  Age:Number,
  Title:String,
  Department:String,
})

module.exports = mongoose.model('teachers', teachersSchema,'teachers')
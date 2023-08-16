const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
  ID:String,
  Name:String,
  Gender:String,
  Age:Number,
  Classes:String,
  EarnedCredits:Number,
  Password:String,
})

module.exports = mongoose.model('Student',studentSchema,"Student")
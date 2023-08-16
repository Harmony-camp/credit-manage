const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
  Department: String,
})

module.exports = mongoose.model('department', departmentSchema,'department')
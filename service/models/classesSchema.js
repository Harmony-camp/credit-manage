const mongoose = require('mongoose')

const classesSchema = mongoose.Schema({
  className: String,
})

module.exports = mongoose.model('classes', classesSchema,'classes')
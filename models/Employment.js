const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employmentSchema = new Schema(
  {
    employee: 
      {
        type: Schema.Types.ObjectId,
        ref: 'employee'
      },
    company: 
      {
        type: Schema.Types.ObjectId,
        ref: 'company'
      },
      joiningDate: {
        type: String,
        required: true,
        trim: true
      },
      leavingDate: {
        type: String,
        required: true,
        trim: true
      }
  }
)

const Employment = mongoose.model('employment', employmentSchema)

module.exports = Employment

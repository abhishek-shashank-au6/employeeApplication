const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new mongoose.Schema(
  {
    name: {
      unique: true,
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'employee'
      }
    ]
  },
  { timestamps: true }
)

const Company = mongoose.model('company', companySchema)

module.exports = Company
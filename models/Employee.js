const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const employeeSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        unique: true,
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    companies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'company'
      }
    ]
  },
  { timestamps: true }
)

employeeSchema.statics.findByEmailAndPassword = async (email, password) => {
    try {
      const employee = await Employee.findOne({ email: email })
      if (!employee) throw new Error('Incorrect Credentials')
      const isMatched = await bcrypt.compare(password, employee.password)
      if (!isMatched) throw new Error('Incorrect Credentials')
      return employee
    } catch (err) {
      res.send(err.message)
    }
}

employeeSchema.pre('save', async function(next) {
    const employee = this
    try {
      if (employee.isModified('password')) {
        const hashedPassword = await bcrypt.hash(employee.password, 10)
        employee.password = hashedPassword
        next()
      }
    } catch (err) {
      res.send(err.message)
      next(err)
    }
})

const Employee = mongoose.model('employee', employeeSchema)

module.exports = Employee

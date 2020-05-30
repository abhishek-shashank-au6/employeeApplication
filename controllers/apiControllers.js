const moment = require('moment')
const Employee = require('../models/Employee')
const Company = require('../models/Company')
const Employment = require('../models/Employment')

module.exports = {
    async registerUser (req, res) {
      try{
        const { email, name, password } = req.body
        if (!email || !name || !password) {
          return res
            .status(400)
            .send({ statusCode: 400, message: 'Bad request' })
        }
        const employee = await Employee.create({
          email,
          name,
          password
        })
        req.session.userId = employee._id
        return res.redirect('/dashboard')
      }
      catch(err) {
        if (err.name === 'ValidationError')
          console.log(err.message)
          return res.status(400).send(`Validation Error: ${err.message}`)
        res.redirect('/register')
      }
    },

    async loginUser (req, res) {
      try{
        const email = req.body.email
        const password = req.body.password
        if (!email || !password)
          return res.status(400).send('Incorrect credentials')
        const employee = await Employee.findByEmailAndPassword(email, password)

        req.session.userId = employee._id
        res.redirect('/dashboard')
      }
      catch(err) {
        if (err.name === 'ValidationError')
          return res.status(400).send(`Validation Error: ${err.message}`)
        res.redirect('/login')
      }
    },

    async logoutUser (req, res) {
      try{
        req.session.destroy()
        return res.redirect('/')
      }
      catch(err){
        return res.status(400).send(`Error: ${err.message}`)
      }
    },

    async createEmploymentHistory (req,res) {
      try{
        const user = req.user
        const company = await Company.create({
          name: req.body.name, 
          category: req.body.category, 
          location: req.body.location, 
        })
        await Employment.create({
          employee: user._id,
          company: company._id,
          joiningDate: moment(req.body.joiningDate).format('DD-MM-YYYY'), 
          leavingDate: moment(req.body.leavingDate).format('DD-MM-YYYY')
        })
                
        await Company.findOneAndUpdate({_id: company._id}, {$push: {employees: user._id}})
        await Employee.findOneAndUpdate({_id: user._id}, {$push: {companies: company._id}})
        res.redirect('/dashboard')
      }
      catch(err){
        return res.status(400).send(`Error: ${err.message}`)
      }
    }
  }
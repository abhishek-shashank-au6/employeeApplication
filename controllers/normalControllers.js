const Employee = require('../models/Employee')
const Company = require('../models/Company')
const Employment = require('../models/Employment')

module.exports = {
  async renderHomePage(req, res){
    try {
      const companies = await Company.find({})
      res.render('index', {
        title: 'Home page',
        companies: companies
      })
    } catch (err) {
      return res.status(400).send(`Error: ${err.message}`)
    }
  },

  async renderRegisterPage(req, res) {
    try {
      res.render('register', {
        title: 'Register page',
      })
    } catch (err) {
      return res.status(400).send(`Error: ${err.message}`)
    }
  },

  async renderLoginPage(req, res) {
    try {
      res.render('login', {
        title: 'Login page',
      })
    } catch (err) {
      return res.status(400).send(`Error: ${err.message}`)
    }
  },

  async renderDashboardPage(req, res) {
    try {
      const user = req.user
      const companies = await Employment.find({
        employee: req.user._id
      }).populate('company')
      res.render('dashboard', {
        title: 'Dashboard',
        userId: user.id,
        name: user.name,
        companies: companies,
      })
    } catch (err) {
      return res.status(400).send(`Error: ${err.message}`)
    }
  },

  async renderCompanyDashboardPage(req, res) {
    try{
      const employees = await Employment.find({
        company: req.params.companyId
      }).populate('employee')
      res.render('companyDashboard', {
        title: 'Company Dashboard',
        employees: employees
      })
    }
    catch(err){
      return res.status(400).send(`Error: ${err.message}`)
    }
  },

  async renderCreateEmploymentPage(req, res) {
    try {
      const user = req.user
      res.render('createEmployment', {
        title: 'Create Employment page',
        userId: user.id,
      })
    } catch (err) {
      return res.status(400).send(`Error: ${err.message}`)
    }
  }
}

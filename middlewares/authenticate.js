const Employee = require('../models/Employee')

module.exports = async (req, res, next) => {
  if (req.session.userId) {
    try{
        const employee = await Employee.findById(req.session.userId)
        req.user = employee
        next()
    }
    catch(err){
        console.log(err.message)
        res.redirect('/login')
    }
  } else { 
      res.redirect('/login')
  } 
      
}

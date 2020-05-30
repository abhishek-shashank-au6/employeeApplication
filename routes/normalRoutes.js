const express = require('express')
const router = express.Router()
const {renderHomePage, renderRegisterPage, renderLoginPage, renderDashboardPage, renderCompanyDashboardPage, renderCreateEmploymentPage} = require('../controllers/normalControllers')
const authenticate = require('../middlewares/authenticate')

router.get('/', renderHomePage)

router.get('/register', renderRegisterPage)

router.get('/login', renderLoginPage)

router.get('/dashboard', authenticate, renderDashboardPage)

router.get('/dashboard/:companyId', renderCompanyDashboardPage)

router.get('/createEmployment', authenticate, renderCreateEmploymentPage)

module.exports = router

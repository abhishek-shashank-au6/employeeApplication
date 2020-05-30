const express = require('express')
const router = express.Router()
const {registerUser, loginUser, logoutUser, createEmploymentHistory} = require('../controllers/apiControllers')
const authenticate = require('../middlewares/authenticate')

router.post('/register', registerUser)

router.post('/login', loginUser)

router.delete('/logout', authenticate, logoutUser)

router.post('/createEmployment', authenticate, createEmploymentHistory)

module.exports = router

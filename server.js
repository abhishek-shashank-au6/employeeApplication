const express = require('express')
const hbs = require('hbs')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path')
require('./utils/hbs')
require('./db')

const apiRoutes = require('./routes/apiRoutes')
const normalRoutes = require('./routes/normalRoutes')

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views', 'pages'))
app.set('view options', {layout: 'layout'})

hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

app.use(express.urlencoded({ extended: false}))

app.use(methodOverride('_method'))

app.use(
    session({
        secret: 'employeeSecret',
        resave: false,
        name: 'EmployeeAppSession',
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 30,
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        }
    })
)

app.use(apiRoutes)
app.use(normalRoutes)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server Started')
    
})
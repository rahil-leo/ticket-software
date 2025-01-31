require('dotenv').config()
const express = require('express')
const app = express()
const cookieparser = require('cookie-parser')

const { connectDB } = require('./config/db')
connectDB()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieparser())

const authroute = require('./routes/authroute')
const homeroute = require('./routes/homeroute')
const adminroute = require('./routes/adminroute')

app.use('/admin', adminroute)
app.use('/login', authroute)
app.use('/', homeroute)



app.get('*', (req, res) => {
    res.send('<h1 style = backgroudcolor:red>this page is not defined </h1>')
})

app.listen(4200, () => {
    console.log('server started port 4200')
})
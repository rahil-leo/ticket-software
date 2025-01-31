const express = require('express')
const router = express.Router()

const { home, bookbus, booked, travellers, logout, bookedticket, cancelticket } = require('../controllers/home')
const { isLoggedin } = require('../middleware/check')



router
    .route('/')
    .get(isLoggedin, home) 
    .post(booked)
router
    .route('/bookbus')
    .get(bookbus)
router
    .route('/logout')
    .get(isLoggedin, logout)    
router
    .route('/travellers')
    .get(travellers) 
router
    .route('/delete/:id')
    .get(isLoggedin, cancelticket)
router
    .route('/bookedticket')
    .get(bookedticket)

   
module.exports = router
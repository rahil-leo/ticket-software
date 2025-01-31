const express = require('express')
const router = express.Router()

const { login, logged } = require('../controllers/auth')


router
    .route('/')
    .get(login) 
    .post(logged)

module.exports = router
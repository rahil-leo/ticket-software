const express = require('express')
const router = express.Router()

const { login, logged } = require('../controllers/auth')
const {usercookie} = require('../middleware/check')

router
    .route('/')
    .get(usercookie,login) 
    .post(logged)

module.exports = router
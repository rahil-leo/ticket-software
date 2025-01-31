const express = require('express')
const router = express.Router()

const { admin, showadmin, adminsignup, adminlogin, adminsigned, adminlogged, addnewuser, useradded, logout, change } = require('../controllers/admin')
const { isAdminLogged,cookie } = require('../middleware/admincheck')

router
    .route('/')
    .get(isAdminLogged,admin) 
    .post(showadmin)
router
    .route('/adminsignup')
    .get(isAdminLogged,adminsignup)
    .post(adminsigned)
router
    .route('/adminloging')
    .get(cookie,adminlogin)
    .post(adminlogged)
router
    .route('/logout')
    .get(logout)    
router
    .route('/adduser')
    .get(isAdminLogged,addnewuser)
    .post(useradded)
router
    .route('/change')
    .get(change)

module.exports = router
const express = require('express')
const router = express.Router()

const { admin, showadmin, adminsignup, adminlogin, adminsigned, adminlogged, addnewuser, useradded, change } = require('../controllers/admin')
const { isAdminLogged } = require('../middleware/admincheck')

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
    .get(isAdminLogged,adminlogin)
    .post(adminlogged)
router
    .route('/adduser')
    .get(isAdminLogged,addnewuser)
    .post(useradded)
router
    .route('/change')
    .get(change)

module.exports = router
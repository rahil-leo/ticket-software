const express = require('express')
const router = express.Router()

const { admin, showadmin, adminsignup, adminlogin, adminsigned, adminlogged, addnewuser, useradded, logout, change, updateadminpassword, changeadminname, changeuser, changeuserpassword } = require('../controllers/admin')
const { isAdminLogged, cookie } = require('../middleware/admincheck')
const { isLoggedin } = require('../middleware/check')


router
    .route('/')
    .get(isAdminLogged,admin) 
    .post(showadmin)
router
    .route('/adminsignup')
    .get(adminsignup)
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
    .route('/changeuser')
    .get(isLoggedin,changeuser)
    .post(changeuserpassword)
router
    .route('/change')
    .get(isAdminLogged,change)
    .post(updateadminpassword)
router
    .route('/changeadmin')
    .post(changeadminname)


module.exports = router
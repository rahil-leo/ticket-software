let Ticket = require('../models/Ticket')
let Admin = require('../models/Admin')
let adminjwt = require('../utils/adminJwt')
let User = require('../models/User')


exports.adminsignup = (req, res) => {
    res.render('adminauth/adminsignup',{msg:''})
}

exports.adminsigned = async (req, res) => {
    try {
        var adminsigned = req.body.adminsignup
        var adminpassword = req.body.adminpassword

        let admindetails = {
            username: adminsigned,
            password: adminpassword,
            id: Date.now()
        }
        console.log(admindetails, 'this is signed detials1')
        
        let storeuser = await Admin.findOne({ username: adminsigned })
        console.log(storeuser, 'this is stored user')
        if (storeuser) {
            return res.render('adminauth/adminsignup', { msg: ' username is already taken' })
        }
        await Admin.create(admindetails)
        return res.render('adminauth/adminlogin')
    } catch (e) {
        console.log(e)
        return res.send('error page')
    }
}


exports.adminlogin = (req, res) => {
    res.render('adminauth/adminlogin',{msg:''})
}

exports.adminlogged = async (req, res) => {
    try {

        var loggedUser = req.body.adminlogin
        var loggedPassword = req.body.adminpassword

        var user = await Admin.find({ username: req.body.adminlogin, password: loggedPassword })
        console.log(user,'this is find admin')

        if (!user) {
            return res.render('adminauth/adminlogin', { msg: 'invalid password or username' })
        }
        const admintoken = adminjwt(user)
        console.log(admintoken,'this admin token u just type now')

        return res.cookie('cookie', admintoken, { httpOnly: true }).redirect('/admin')

    } catch (e) {
        console.log(e)
        return res.send('no page')
    }
}


exports.admin = (req, res) => {
    return res.render('admin/admin')
}

exports.showadmin = async(req, res) => {
    let store = {
        date: req.body.date,
        bus:req.body.selectbus
    }
    
    let usman = await Ticket.find({
        date: req.body.date,
        bus:req.body.selectbus
    })

    // var abc = 0

    // usman.forEach((i) => {
    //     abc = abc + i.price
    // })

    const abc = usman.reduce((a, i) => {
        return a + i.price
    }, 0)

    console.log(abc)


    return res.render('admin/showadmin',{usman, abc})
}

exports.addnewuser = (req, res) => {
    return res.render('admin/adduser',{msg:''})
}

exports.useradded = async (req, res) => {
    try {
        var usersigned = req.body.signname
        var userpassword = req.body.signpassword


        let signedetails = {
            username: usersigned,
            password: userpassword,
            id: Date.now()
        }
        console.log(signedetails, 'this is signed detials')
        let storeuser = await User.findOne({ username: usersigned })
        console.log(storeuser, 'this is stored user')
        if (storeuser) {
            return res.render('admin/adduser', { msg: ' username is already taken' })
        }
        await User.create(signedetails)
        return res.render('admin/adduser',{msg:'user created'})
    } catch (e) {
        console.log(e)
        return res.send('error page')
    }
}

exports.change = (req, res) => {
    return res.render('admin/changeadmin')
}
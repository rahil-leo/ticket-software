let Ticket = require('../models/Ticket')
let Admin = require('../models/Admin')
let adminjwt = require('../utils/adminJwt')


let User = require('../models/User')
const abc = require('../utils/adminJwt')


exports.adminsignup = (req, res) => {
    res.render('adminauth/adminsignup',{msg:''})
}

exports.adminsigned = async (req, res) => {
    try {
        var adminsigned = req.body.username
        var adminpassword = req.body.adminpassword

        let storeuser = await Admin.findOne({ username: req.body.username })

        if (storeuser) {
            return res.render('adminauth/adminsignup', { msg: ' username is already taken' })
        }

        let admindetails = {
            username: adminsigned,
            password: adminpassword,
            id: Date.now()
        }
        // console.log(admindetails, 'this is signed detials1 ')
        await Admin.create(admindetails)
        return res.render('adminauth/adminlogin',{msg:''})
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

        // console.log(req.body.adminlogin, req.body.adminpassword)

        var user = await Admin.findOne({ username: req.body.adminlogin })

        // console.log(user, 'this is find admin in login')

        if (user) {
            const validate = await user.validatepassword(req.body.adminpassword)
            if (!validate) {
                return res.render('adminauth/adminlogin', { msg: 'invalid password or username' })
            }
            // console.log(validate, 'this is validate')
            const admintoken = adminjwt(user)
            // console.log(admintoken, 'this admin find')
            return res.cookie('admincookie', admintoken, { httpOnly: true }).redirect('/admin')
        }
        return res.render('adminauth/adminlogin',{msg:'unexpected error '})

    } catch (e) {
        console.log(e)
        return res.render('adminauth/adminlogin',{msg:'error'})
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
        // console.log(signedetails, 'this is signed detials')
        let storeuser = await User.findOne({ username: usersigned })
        // console.log(storeuser, 'this is stored user')
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

// here change username

exports.changeuser = (req, res) => {
    var abc = req.user.username
    console.log(abc)
    return res.render('admin/changeuser',{msg:'', abc})
} 

exports.changeuserpassword =async (req, res) => {
    try {
        const userchange = await User.findOne({ username: req.body.username })
        if (!userchange) {
            // console.log('working this 1')
            return res.render('admin/changeuser', { msg: 'Admin name is incorect' })
        }

        const samepassword = await userchange.validatepassword(req.body.newpassword)
        if (samepassword) {
            // console.log('working this 2')
            return res.render('admin/changeuser', { msg: 'New password must be different' })
        }

        console.log('working this 3')
        userchange.password = req.body.newpassword;
        await userchange.save()

        return res.render('auth/login', { msg: 'Password updated' })
    } catch (error) {
        console.log(error)
        return res.render('admin/changeuser', { msg: 'Error updating password' })
    }
}

exports.changeuserusername = async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { username: req.body.currentname },
            { username: req.body.newname }
        )
        return res.render('auth/login', { msg:  'username changed' })
    } catch (err) {
        console.log(err)
        res.send('username is not changed')
    }
}


//here change admin password and username


exports.change = (req, res) => {
    let abc = req.user.username
    console.log(abc)
    return res.render('admin/changeadmin',{msg:'', abc})
}


exports.updateadminpassword = async (req, res) => {
    try {
        const admin = await Admin.findOne({ username: req.body.username })
        if (!admin) {
            return res.render('admin/changeadmin', { msg: 'Admin name is incorect' })
        }

        const samepassword = await admin.validatepassword(req.body.newpassword)
        if (samepassword) {
            return res.render('admin/changeadmin', { msg: 'New password must be different' })
        }
        
        admin.password = req.body.newpassword;
        await admin.save()

        return res.render('adminauth/adminlogin', { msg: 'Password updated' })
    } catch (error) {
        return res.render('admin/changeadmin', { msg: 'Error updating password' })
    }
}

exports.changeadminname =async (req, res) => {
    try {
        await Admin.findOneAndUpdate(
            { username: req.body.currentname },
            { username: req.body.newname }
        )
        return res.render('adminauth/adminlogin', { msg: 'changed' })
    } catch(err) {
        console.log(err)
        res.send('username is not changed')
    }
}

exports.logout = (req, res) => {
    return res.clearCookie('admincookie').render('adminauth/adminlogin',{msg:''})
}
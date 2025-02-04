let User = require('../models/User')
let createJwt = require('../utils/generateJwt')

exports.login = (req, res) => {
    return res.render('auth/login')
}

exports.login = (req, res) => {
    return res.render('auth/login', { msg: '' })
}

exports.logged = async (req, res) => {
    try {

        var loggedUser = req.body.loginname
        var loggedPassword = req.body.loginpassword

        var user = await User.findOne({ username: loggedUser})
        if (user) {
            const validateuser = await user.validatepassword(req.body.loginpassword)
            
            if (!validateuser ) {
                return res.render('auth/login', { msg: 'invalid password or username' })
            }
            // console.log(validate, 'this is validate')
            const token = createJwt(user)
            // console.log(admintoken, 'this admin find')
            return res.cookie('cookie', token, { httpOnly: true }).redirect('/')
        }
        // return res.cookie('cookie', token, { httpOnly: true }).redirect('/')
        return res.render('auth/login', { msg: 'unexpected error ' })

    } catch (e) {
        console.log(e)
        return res.send('no page')
    }
}
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

        var user = await User.findOne({ username: loggedUser, password: loggedPassword })

        if (!user) {
            return res.render('auth/login', { msg: 'invalid password or username' })
        }
        const token = createJwt(user)

        return res.cookie('cookie', token, { httpOnly: true }).redirect('/')

    } catch (e) {
        console.log(e)
        return res.send('no page')
    }
}
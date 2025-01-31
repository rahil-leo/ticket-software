const jwt = require('jsonwebtoken')

exports.isLoggedin = (req, res, next) => {
    const token = req.cookies?.cookie

    // console.log(token,'this is user token')

    if (!token) {
        return res.redirect('/login')
    }
    try {
        var decoded = jwt.verify(token, 'SECRET')
        // console.log(decoded , 'this is decoded value')
        req.user = decoded
        return next()
    } catch (e) {
        console.log(e)
        return res.clearCookie('cookie').redirect('/login')
    }
}

exports.usercookie = (req, res, next) => {
    try {
        const usercookie = req.cookies?.cookie
        console.log(usercookie)
        if (!usercookie) {
            next()
            console.log('there is no cookie for this user ')
        } else {
            return res.render('auth/login')
        }
    } catch(e) {
        console.log(e)
        return res.send('usercookie is not working')
   }

}
const jwt = require('jsonwebtoken')

exports.isAdminLogged = (req, res, next) => {
    const adminstoken = req.cookies?.cookie

    console.log(adminstoken,'this is user adminstoken')

    if (!adminstoken) {
        return res.redirect('/admin/adminloging')
    }
    try {
        var decoded = jwt.verify(adminstoken, 'ADMINSECRET')
        console.log(decoded , 'this is decoded value')
        req.user = decoded
        return next()
    } catch (e) {
        console.log(e)
        return res.clearCookie('cookie').redirect('/admin/adminloging')
    }
}
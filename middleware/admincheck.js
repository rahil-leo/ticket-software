const jwt = require('jsonwebtoken')

exports.isAdminLogged = (req, res, next) => {
    const adminstoken = req.cookies?.admincookie

    console.log(adminstoken,'this is user adminstoken')

    if (!adminstoken) {
        next()
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


exports.cookie = (req, res, next) => {
    try {
        const cookie = req.cookies?.admincookie
        console.log(cookie)
        if (!cookie,'this is admin cookie') {
            next()
        } else {
            return res.render('admin/admin')
        }
    }catch(e) {
        console.log(e)
        res.send('admin cookie is not working')
    }
}
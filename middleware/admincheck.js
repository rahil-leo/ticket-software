const jwt = require('jsonwebtoken')



exports.isAdminLogged = (req, res, next) => {
    const cookie = req.cookies.admincookie

    try {
        const decoded = jwt.verify(cookie, 'ADMINSECRET')
        req.user = decoded
        next()
    } catch {
        return res.render('adminauth/adminlogin',{msg:'token error'})
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
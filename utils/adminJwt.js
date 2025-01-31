const jwt = require('jsonwebtoken')


const abc = (adminuser) => {
    return jwt.sign({
        username: adminuser.username,
        id: adminuser.id
    }, 'ADMINSECRET')
}

module.exports = abc
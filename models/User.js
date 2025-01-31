const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')


const user = new mongoose.Schema({
    username: String,
    password: String,
    id: String

})

// user.methods.createJWT = function () {
//     return jwt.sign({
//         username: this.username,
//         id: this.id
//     }, 'SECRET')
// }

// user.pre('save', function () {
//     this.password = '123'
// })


module.exports = mongoose.model('User', user)
const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const user = new mongoose.Schema({
    username: String,
    password: String,
    id: String

})

user.pre('save', async function (next){
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

user.methods.validatepassword= async function(userpassword){
    return await bcrypt.compare(userpassword,this.password)
}

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
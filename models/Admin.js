const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const adminschema = new mongoose.Schema({
    username: String,
    password: String,
    id: String
})

adminschema.pre('save', async function (next){
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

adminschema.methods.validatepassword= async function(userpassword){
    return await bcrypt.compare(userpassword,this.password)
}

module.exports = mongoose.model('Admin', adminschema )

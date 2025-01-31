const mongoose = require('mongoose')


const adminschema = new mongoose.Schema({
    username: String,
    password: String,
    id: String
})

module.exports = mongoose.model('Admin', adminschema )

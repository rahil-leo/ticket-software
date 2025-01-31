const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')


const ticketschema = new mongoose.Schema({
    username: String,
    from: String,
    to: String,
    price:String,
    date: String,
    id: String,
    bus: String,
    price: Number,
    
})

module.exports = mongoose.model('Ticket', ticketschema )
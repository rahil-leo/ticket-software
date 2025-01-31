const mongoose = require('mongoose')

exports.connectDB = async () => {
    await mongoose.connect('mongodb+srv://jubail:28308000@rahil.f0nsc.mongodb.net/busticket')
    console.log('connect db')
}
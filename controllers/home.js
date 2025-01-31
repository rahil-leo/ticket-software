let User = require('../models/User')
let Ticket = require('../models/Ticket')

exports.home = async (req, res) => {
    let contector = await User.find()

    let bookdetails = await Ticket.find()
    return res.render('home/home',{bookdetails,contector})
}



exports.travellers = async (req, res) => {
    
    let bookdetails = await Ticket.find()
    return res.render('home/travellers',{bookdetails})
}

exports.bookbus = (req, res) => {
    return res.render('home/bookbus')
}

exports.booked = async (req, res) => {

    try {
        let bookingdate = req.body.date
        let name = req.body.name
        let selectbus = req.body.selectbus
        let from = req.body.from
        let to = req.body.to
        let price = req.body.price

        let stored = {
            username: name,
            date: bookingdate,
            id: Date.now(),
            bus: selectbus,
            from: from,
            to: to,
            price:price
        }

        console.log(stored,'here is the stored value')
        await Ticket.create(stored)
        console.log('here id the created value')
        return res.redirect('/bookedticket')
    } catch(e) {
        console.log(e)
        res.send('booking is not working')
    }
}

exports.cancelticket = async (req, res) => {
    try {
        let id = req.params.id
        await Ticket.findOneAndDelete({ id: id })
        return res.redirect('/travellers')
    } catch (e) {
        console.log(e)
    }
}


exports.bookedticket = (req, res) => {
    return res.render('home/bookedticket')
}


exports.logout = (req, res) => {
    return res.clearCookie('cookie').redirect('/login')
}


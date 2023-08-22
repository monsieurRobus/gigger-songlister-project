const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Event name needed']
    },
    date: {
        type: Date,
        required: [true, 'please insert a date']
    },
    place: {
        type: String,
        required: [true, 'please insert a location']
    },
    description: {
        type: String
    },
    contactName: {
        type: String
    },
    contactPhone: {
        type: String
    },
    contactMail: {
        type: String
    },
    setlist: [{
        type: mongoose.Types.ObjectId,
        ref: 'Setlist'
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['boda', 'privada', 'concierto', 'otros']
    }
    
})

const Event = mongoose.model('Event',EventSchema)

module.exports = Event
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
    description: {
        type: String
    },
    setlist: {
        type: mongoose.Types.ObjectId,
        ref: 'Setlist'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    // location: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Location'
    // }
    
})

const Event = mongoose.model('Event',EventSchema)

model.exports = Event
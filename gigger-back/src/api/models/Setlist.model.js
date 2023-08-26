const mongoose = require('mongoose')

const SetlistSchema = new mongoose.Schema({
    name: {
        type: String,        
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long']
    },
    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Songs'
        }
    ],
    events: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Events'
        }
    ],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String
    },
    favouritedBy: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
    
    },{
        timestamps: true
    })

    const Setlist = mongoose.model('Setlist',SetlistSchema)

    module.exports = Setlist
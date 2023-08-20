const mongoose = require('mongoose')



const SongSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "Song already exists!"]
    },
    artist: {
        type: String,
    },
    duration: {
        type: Number,
    },
    lyrics: {
        type: String,
    },
    notes: {
        type: String,
        default: "This song is awesome uwu",
    },
    setlists: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Setlist'
        }
    ],
    user: 
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ,
    tags: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Tag'
        }
    ],
    favouritedBy: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]

})

const Song = mongoose.model('Song',SongSchema)

module.exports = Song
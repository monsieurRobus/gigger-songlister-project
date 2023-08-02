const mongoose = require('mongoose')


const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'No name was given for this tag'],
        unique: [true, 'This name is used by another tag']
    },
    description: {
        type: String        
    },
    song: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Song'
        }
    ],
    color: {
        type: String,
        default: "#ffdf66"
    }

})

const Tag = mongoose.model('Tag',TagSchema)

module.exports = Tag
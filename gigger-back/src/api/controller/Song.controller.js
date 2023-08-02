const Song = require('../models/Song.model')
const mongoose = require('mongoose')

const getAllSongs = async (req, res, next) => {

    try {

        const users = await Song.find()
        if(users.length>0)
            return res.status(200).json({ message: 'Songs found', users: users })
        else
            return res.status(404).json({message: 'No songs found'})
    
    }
    catch (error)
    {
        return next(error)
    }

}

const addNewSong = async (req,res,next) => {
    try{
        
    }
    catch(error)
    {
        return next(error)
    }
}

module.exports = { getAllSongs}
const Song = require('../models/Song.model')
const mongoose = require('mongoose')
const User = require('../models/User.model')

const getAllSongs = async (req, res, next) => {

    try {

        const songs = await Song.find()
        
        const countSongs = await mongoose.connection.db.collection('songs').countDocuments()    
        if(songs.length>0)
            return res.status(200).json({ message: 'Songs found', songs: songs })
        else
            return res.status(404).json({message: 'No songs found'})
    
    }
    catch (error)
    {
        return next(error)
    }

}

const getAllSongsPaginated = async (req, res, next) => {

    try{
        let page = 1
        const { pageReq } = req.params
        if(pageReq)
        {
            page = parseInt(pageReq)
        }        
        const limit = 15
        const skip = (page - 1) * limit
        const countSongs = await mongoose.connection.db.collection('songs').countDocuments()
        const totalPages = Math.ceil(countSongs / limit)
        const songs = await Song.find().skip(skip).limit(limit)
        return res.status(200).json({ message: `${countSongs} Songs found, showing page ${page} of ${totalPages}`, songs, totalPages, currentPage: page, limit })
  
    }
    catch(error)
    {
      return next(error)
    }
  
  }

const getSongById = async(req,res,next) => {
    try 
    {
        const {id} = req.params
        const song = await Song.findById(id)

        if(song)
        {
            
            return res.status(200).json({message: 'Song found', song})
        }
        else 
        {
            return res.status(404).json({message: 'Song not found'})
        }
    }
    catch(error){
        return next(error)
    }
}

const addNewSong = async (req,res,next) => {
    try{
        const {name,artist,duration,lyrics,notes,tags} = req.body
        const song = new Song({...req.body, user:req.user._id})
        const songAlreadyAdded = await Song.findOne({name})
        const user = await User.findById(req.user._id)


        
        if(songAlreadyAdded) {
            return res.status(200).json({message: "A song with this name has already been added, please, change it's name"})
        }

        const songSaved = await song.save()
        
        if(songSaved)
            {
                
                user.ownedSongs.push(songSaved._id)
                user.save()
                return res.status(200).json({ message: 'Song was saved uwu ', song: song})

            }
        else 
            {
                return res.status(404).json({message: 'Song could not be saved :('})
            }

    }
    catch(error)
    {
        return next(error)
    }
}

const deleteSong = async (req,res,next) => {

    try{
        const {id} = req.query

        const songDeleted = await Song.findByIdAndDelete(id)

        // Delete song reference in user

        const userSongOwner = await User.findById(new mongoose.Types.ObjectId(songDeleted.user))
        const indexToDelete = userSongOwner?.ownedSongs?.indexOf(id.toString)
        if(indexToDelete)
        {
            userSongOwner.ownedSongs.splice(indexToDelete,1)
            await userSongOwner.save()
        }

        if(songDeleted)
            {
                const isDeleted = await Song.findById(id)
                if(!isDeleted)
                {
                    return res.status(200).json({deleted: true, songDeleted})
            
                }
                else
                {
                    return res.status(404).json({deleted: false})
            
                }
            }
        else 
            {
                return res.status(404).json({deleted: false, message: "Song not found"})
            
            }
    }
    catch (error)
    {
        next(error)
    }

    

}

const updateSong = async(req,res,next) => {
    try 
    {
        const {id} = req.query
        const songToUpdate = await Song.findByIdAndUpdate(id,{...req.body})
        const keysToUpdate = Object.keys(req.body)

        const updatedSong = await Song.findById(id)
        
        keysToUpdate.forEach((key)=>{
            console.log(updatedSong.key)
        })

        
        return res.status(200).json({updated:true , song: updatedSong})  

    }
    catch(error) 
    {
        next(error)
    }
}

module.exports = { getAllSongs, addNewSong, getSongById, getAllSongsPaginated, deleteSong, updateSong}
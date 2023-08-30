const Song = require('../models/Song.model')
const mongoose = require('mongoose')
const User = require('../models/User.model')
const Setlist = require('../models/Setlist.model')
const Tag = require('../models/Tag.model')
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

const getSongsFilteredPaginated = async(req,res,next) => {
    try{
        
        const {tagFilters,durationFilter,bandFilter} = req.query

        console.log(tagFilters,durationFilter,bandFilter)

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

const getFilteredSongsPaginated = async (req,res,next) => {
    try {

        let page = 1
        const { pageReq } = req.params

        const nameFilter = req.body.name
        const tagsFilter = req.body.tags?.map(tag=>tag.id)

        const filterMounted = nameFilter!=="" ? tagsFilter.length>0? {artist: nameFilter, tags: { $in: tagsFilter}} : {artist:nameFilter} : {tags: {$in: tagsFilter}}     
        console.log(filterMounted)
        if(pageReq)
        {
            page = parseInt(pageReq)
        }        
        const limit = 15
        const skip = (page - 1) * limit
        const countSongs = await mongoose.connection.db.collection('songs').countDocuments()
        const totalPages = Math.ceil(countSongs / limit)
        const songs = await Song.find(filterMounted).skip(skip).limit(limit)
        return res.status(200).json({ message: `${countSongs} Songs found, showing page ${page} of ${totalPages}`, songs, totalPages, currentPage: page, limit })

    }catch(error){
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

        const limit = 15
        const countSongs = await mongoose.connection.db.collection('songs').countDocuments()
        const totalPages = Math.ceil(countSongs / limit)
        
        if(songAlreadyAdded) {
            return res.status(200).json({message: "A song with this name has already been added, please, change it's name"})
        }

        const songSaved = await song.save()
        
        if(songSaved)
            {
                
                user.ownedSongs.push(songSaved._id)

                // Adding songs to each tag object

                songSaved.tags.forEach(async tag => {
                    await Tag.findByIdAndUpdate(tag,{$push: {song: songSaved._id}})
                })

                user.save()
                return res.status(200).json({ message: 'Song was saved uwu ', song: song, totalPages: totalPages})

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
        console.log(id)
        const songDeleted = await Song.findByIdAndDelete(id)

        // Delete song reference in user favs

        const users = await User.find({favouriteSongs: id})

        users.forEach(async user => {
            user.favouriteSongs = [...user.favouriteSongs.filter(songId => songId != id)]
            await user.save()
        })

        songDeleted.setlists.map(async setlist => {
            await Setlist.findByIdAndUpdate(setlist,{ $pull: {  songs: id } });
        })  

        const userOwner = await User.findOneAndUpdate(
            { ownedSongs: id },
            { $pull: { ownedSongs: id } },
            { versionKey: false }
          );
          

        if(songDeleted)
            {

                songDeleted.tags.forEach(async tag => {
                    await Tag.findByIdAndUpdate(tag,{$pull: {song: songDeleted._id}})
                })

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

const favSong = async(req,res,next) => {
    try 
    {
        const {songId} = req.body 
        const userId = req.user._id

        const songToFav = await Song.findById(songId)

        if(!songToFav)
        {
            return res.status(404).json({message: "Song not found"})
        }
       
        
        const userFav = songToFav.favouritedBy.filter(user => userId.equals(user))
        const userToUpdate = await User.findById(req.user._id)
        if(userFav.length<1) 
        {
            
            // SI NO ES FAV; FAV
            
            const updatedFavList = [...songToFav.favouritedBy,req.user._id]
            const updatedSongList = [...req.user.favouriteSongs,songId]
            songToFav.favouritedBy=[...updatedFavList]
            userToUpdate.favouriteSongs=[...updatedSongList]
            songToFav.save()
            userToUpdate.save()
            return res.status(200).json({message: "song faved", favouritedBy: updatedFavList})
        }
    
        else
        {   
            // SI ES FAV; UNFAV
            const newUserFavList = songToFav.favouritedBy.filter(user => !userId.equals(user))
            const newSongFavList = req.user.favouriteSongs.filter(song => !song.equals(songId))
            
            userToUpdate.favouriteSongs=[...newSongFavList]
            songToFav.favouritedBy=[...newUserFavList]
            songToFav.save()
            userToUpdate.save()
            return res.status(200).json({message: "song unfav", favouritedBy: newUserFavList})
        }
}
    catch
    {
        next(error)
    }
}

module.exports = { getAllSongs, addNewSong, getSongById, getAllSongsPaginated, getFilteredSongsPaginated, deleteSong, updateSong, favSong}
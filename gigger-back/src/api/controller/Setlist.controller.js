const mongoose = require('mongoose')
const Song = require('../models/Song.model')
const User = require('../models/User.model')
const Setlist = require('../models/Setlist.model')
const { io } = require('../../utils/socket')
const Event = require('../models/Event.model')

const getAllSetlists = async (req, res, next) => {
    try {

        const setlist = await Setlist.find()
        
        const countSetlist = await mongoose.connection.db.collection('setlist').countDocuments()   

        if(setlist.length>0)
            return res.status(200).json({ message: 'Setlist found', setlist: setlist })
        else
            return res.status(404).json({message: 'No setlist found'})
    
    }
    catch (error)
    {
        return next(error)
    }

}

const getAllSetlistsPaginated = async (req, res, next) => {

    try{
        let page = 1
        const { pageReq } = req.params
        if(pageReq)
        {
            page = parseInt(pageReq)
        }        
        const limit = 6
        const skip = (page - 1) * limit
        const countSetlist = await mongoose.connection.db.collection('setlists').countDocuments()
        const totalPages = Math.ceil(countSetlist / limit)
        const setlists = await Setlist.find().skip(skip).limit(limit)
        return res.status(200).json({ message: `${countSetlist} Setlist found, showing page ${page} of ${totalPages}`, setlists, totalPages, currentPage: page, limit })
  
    }
    catch(error)
    {
      return next(error)
    }
  
  }

const getSetlistById = async(req,res,next) => {
    try 
    {
        const {id} = req.params
        const setlist = await Setlist.findById(id)

        if(setlist)
        {
            
            return res.status(200).json({message: 'Setlist found', setlist})
        }
        else 
        {
            return res.status(404).json({message: 'Setlist not found'})
        }
    }
    catch(error){
        return next(error)
    }
}

const addNewSetlist = async (req,res,next) => {
    try{
        const {name,songs} = req.body
        if (songs.length > 0)
        {
        const setlist = new Setlist({...req.body, user:req.user._id})
        const setlistAlreadyAdded = await Setlist.findOne({name})
        const user = await User.findById(req.user._id)
        songs.forEach(async song => {
            const songToUpdate = await Song.findById(new mongoose.Types.ObjectId(song))
            songToUpdate.setlists.push(setlist._id)
            await songToUpdate.save()
        })
        
        if(setlistAlreadyAdded) {
            return res.status(200).json({message: "A setlist with this name has already been added, please, change it's name"})
        }

        const setlistSaved = await setlist.save()
        
        if(setlistSaved)
            {
                
                user.ownedSetlist.push(setlistSaved._id)
                user.save()
                return res.status(200).json({ message: 'Setlist was saved uwu ', setlist: setlist})

            }
        else 
            {
                return res.status(404).json({message: 'Setlist could not be saved :('})
            }
        }
        else
        {
            return res.status(404).json({message: 'Setlist songlist cannot be empty'})
        }

    }
    catch(error)
    {
        return next(error)
    }
}

const deleteSetlist = async (req,res,next) => {

    try{
        const {id} = req.query

        const setlistDeleted = await Setlist.findByIdAndDelete(id)

        // Delete setlist reference in user

        const userSetlistOwner = await User.findOne(setlistDeleted.user)
        const users = await User.find({favouriteSetlists: id})

        users.forEach(async user => {
            user.favouriteSetlists = [...user.favouriteSetlists.filter(setlistId => setlistId != id)]
            await user.save()
        })

        setlistDeleted.events.map(async event => {
            
            const eventToClean = await Event.findById(event)
            if(eventToClean)
            {
                eventToClean.setlist = null
                await eventToClean.save()
            }

        })  
       
        const userOwner = await User.findOneAndUpdate(
            { ownedSetlist: id },
            { $pull: { ownedSetlist: id } },
            { versionKey: false }
          );

          
        setlistDeleted.songs.map(async song => {
            console.log(song)
            await Song.findByIdAndUpdate(song,{ $pull: {  setlists: id } });
        })  

        
            
        if(setlistDeleted)
            {
                const isDeleted = await Setlist.findById(id)
                if(!isDeleted)
                {
                    return res.status(200).json({deleted: true, setlistDeleted})
            
                }
                else
                {
                    return res.status(404).json({deleted: false})
            
                }
            }
        else 
            {
                return res.status(404).json({deleted: false, message: "Setlist not found"})
            
            }
    }
    catch (error)
    {
        next(error)
    }

    

}

const updateSetlist = async(req,res,next) => {
    try 
    {
        const {id} = req.query
        // // const {addsongs, deletesongs} = req.body
        // const result = {}
        
        // if(deletesongs) 
        // {            
            
        //     deletesongs.forEach(async (song)=>{
        //         const songReference = await Song.findById(new mongoose.Types.ObjectId(song))
        //         indexToDelete = songReference.setlists?.indexOf(id.toString)
        //         if(indexToDelete)
        //         {
        //             songReference.setlists.splice(indexToDelete,1)
        //             await songReference.save()
        //         }
                
        //     })

        // }

        // if(addsongs) 
        // {                        

        //     addsongs.forEach(async (song)=>{
        //         const songReference = await Song.findById(new mongoose.Types.ObjectId(song))
        //         if(songReference)
        //         {
        //             songReference.setlists.push(song)                    
        //             await songReference.save()
                    
        //         }
        //         else 
        //         {
        //             return res.status(404).json({message: `Song ${song} does not exist. Please check your selection.`})
        //         }
                
                
        //     })

        // }

        const setlist = await Setlist.findByIdAndUpdate(id,{...req.body})
        const keysToUpdate = Object.keys(req.body)

        const updatedSetlist = await Setlist.findById(id)
        
        keysToUpdate.forEach((key)=>{
            console.log(updatedSetlist.key)
        })

        
        return res.status(200).json({updated:true , setlist: updatedSetlist})  

    }
    catch(error) 
    {
        next(error)
    }
}

const favSetlist = async(req,res,next) => {
    try 
    {
        const {setlistId} = req.body 
        const userId = req.user._id

        const setlistToFav = await Setlist.findById(setlistId)

        if(!setlistToFav)
        {
            return res.status(404).json({message: "Setlist not found"})
        }
       
        
        const userFav = setlistToFav.favouritedBy.filter(user => userId.equals(user))
        const userToUpdate = await User.findById(req.user._id)

        
        if(userFav.length<1) 
        {            
            // SI NO ES FAV; FAV
            const updatedFavList = [...setlistToFav.favouritedBy,req.user._id]
            const updatedSetlistList = [...req.user.favouriteSetlists,setlistId]
            setlistToFav.favouritedBy=[...updatedFavList]
            userToUpdate.favouriteSetlists=[...updatedSetlistList]
            setlistToFav.save()
            userToUpdate.save()
            return res.status(200).json({message:"setlist faved", favouritedBy: updatedFavList, setlist:setlistId})
        }
    
        else
        {   
            
            // SI ES FAV; UNFAV
            const newUserFavList = setlistToFav.favouritedBy.filter(user => !userId.equals(user))
            const newSetlistFavList = req.user.favouriteSetlists.filter(song => !song.equals(setlistId))
            
            userToUpdate.favouriteSetlists=[...newSetlistFavList]
            setlistToFav.favouritedBy=[...newUserFavList]
            setlistToFav.save()
            userToUpdate.save()
            return res.status(200).json({message: "setlist unfav", favouritedBy: newUserFavList, setlist:setlistId})
        }
}
    catch (error)
    {
        next(error)
    }
}

module.exports = { getAllSetlists, addNewSetlist, getSetlistById, getAllSetlistsPaginated, deleteSetlist, updateSetlist, favSetlist}
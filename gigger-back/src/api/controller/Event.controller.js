const mongoose = require('mongoose')
const Song = require('../models/Song.model')
const User = require('../models/User.model')
const Event = require('../models/Event.model')

const getAllEvents = async (req, res, next) => {
    try {

        const event = await Event.find()
        
        const countEvent = await mongoose.connection.db.collection('event').countDocuments()        
        if(event.length>0)
            return res.status(200).json({ message: 'Event found', event: event })
        else
            return res.status(404).json({message: 'No event found', event: []})
    
    }
    catch (error)
    {
        return next(error)
    }

}

const getAllEventsPaginated = async (req, res, next) => {

    try{
        let page = 1
        const { pageReq } = req.params
        if(pageReq)
        {
            page = parseInt(pageReq)
        }        
        const limit = 6
        const skip = (page - 1) * limit
        const countEvent = await mongoose.connection.db.collection('events').countDocuments()
        const totalPages = Math.ceil(countEvent / limit)
        const events = await Event.find().skip(skip).limit(limit)
        return res.status(200).json({ message: `${countEvent} Event found, showing page ${page} of ${totalPages}`, events, totalPages, currentPage: page, limit })
  
    }
    catch(error)
    {
      return next(error)
    }
  
  }

const getEventById = async(req,res,next) => {
    try 
    {
        const {id} = req.params
        const event = await Event.findById(id)

        if(event)
        {
            
            return res.status(200).json({message: 'Event found', event})
        }
        else 
        {
            return res.status(404).json({message: 'Event not found'})
        }
    }
    catch(error){
        return next(error)
    }
}

const addNewEvent = async (req,res,next) => {
    try{
        const {name,date,description,contactName,contactPhone,contactEmail,type} = req.body
        
        const event = new Event({...req.body, user:req.user._id})
        const eventAlreadyAdded = await Event.findOne({name})
        const user = await User.findById(req.user._id)

        if((type!="boda")&&(type!="privada")&&(type!="concierto")&&(type!="otros"))
        {
            return res.status(404).json({message: "No type has been selected, please choose an event type."})
        }

        if (req.files) {
            console.log(req.files)
          }

        if(eventAlreadyAdded) {
            return res.status(404).json({message: "An event with this name has already been added, please, change it's name"})
        }

        const eventSaved = await event.save()
        
        if(eventSaved)
            {
                
                user.ownedEvents.push(eventSaved._id)
                user.save()
                return res.status(200).json({ message: 'Event was saved uwu ', event: event})

            }
        else 
            {
                return res.status(404).json({message: 'Event could not be saved :('})
            }

    }
    catch(error)
    {
        return next(error)
    }
}

const deleteEvent = async (req,res,next) => {

    try{
        const {id} = req.query

        const eventDeleted = await Event.findByIdAndDelete(id)

        // Delete event reference in user

        const userEventOwner = await User.findById(new mongoose.Types.ObjectId(eventDeleted.user))
        const indexToDelete = userEventOwner?.ownedEvent?.indexOf(id.toString)
        if(indexToDelete)
        {
            userEventOwner.ownedEvent.splice(indexToDelete,1)
            await userEventOwner.save()
        }

        if(eventDeleted)
            {
                const isDeleted = await Event.findById(id)
                if(!isDeleted)
                {
                    return res.status(200).json({deleted: true, eventDeleted})
            
                }
                else
                {
                    return res.status(404).json({deleted: false})
            
                }
            }
        else 
            {
                return res.status(404).json({deleted: false, message: "Event not found"})
            
            }
    }
    catch (error)
    {
        next(error)
    }

    

}

const updateEvent = async(req,res,next) => {
    try 
    {
        const {id} = req.query
        const {addsongs, deletesongs} = req.body
        const result = {}
        
        if(deletesongs) 
        {            
            
            deletesongs.forEach(async (song)=>{
                const songReference = await Song.findById(new mongoose.Types.ObjectId(song))
                indexToDelete = songReference.events?.indexOf(id.toString)
                if(indexToDelete)
                {
                    songReference.events.splice(indexToDelete,1)
                    await songReference.save()
                }
                
            })

        }

        if(addsongs) 
        {                        

            addsongs.forEach(async (song)=>{
                const songReference = await Song.findById(new mongoose.Types.ObjectId(song))
                if(songReference)
                {
                    songReference.events.push(song)                    
                    await songReference.save()
                    
                }
                else 
                {
                    return res.status(404).json({message: `Song ${song} does not exist. Please check your selection.`})
                }
                
                
            })

        }

        const event = await Event.findByIdAndUpdate(id,{...req.body})
        const keysToUpdate = Object.keys(req.body)

        const updatedEvent = await Event.findById(id)
        
        keysToUpdate.forEach((key)=>{
            console.log(updatedEvent.key)
        })

        
        return res.status(200).json({updated:true , Event: updatedEvent})  

    }
    catch(error) 
    {
        next(error)
    }
}

module.exports = { getAllEvents, addNewEvent, getEventById, getAllEventsPaginated, deleteEvent, updateEvent}
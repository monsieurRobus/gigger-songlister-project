const mongoose = require('mongoose')
const Song = require('../models/Song.model')
const User = require('../models/User.model')
const Event = require('../models/Event.model')
const Setlist = require('../models/Setlist.model')

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
        const {name,date,description,contactName,contactPhone,contactEmail,type,setlist} = req.body
        
        if (req.file) {
            req.body.file=[req.file.path]
          }

        const event = new Event({...req.body, user:req.user._id})
        const eventAlreadyAdded = await Event.findOne({name})
        const setlistToUpdate = await Setlist.findOneAndUpdate(new mongoose.Types.ObjectId(setlist),{events:event._id})
        const user = await User.findById(req.user._id)
     
        
        

        if((type!="boda")&&(type!="privada")&&(type!="concierto")&&(type!="otros"))
        {
            return res.status(404).json({message: "No type has been selected, please choose an event type."})
        }

        

        if(eventAlreadyAdded) {
            return res.status(404).json({message: "An event with this name has already been added, please, change it's name"})
        }

        const eventSaved = await event.save()
        
        if(eventSaved)
            {
                
                user.ownedEvents.push(eventSaved._id)
                await user.save()
                // if (setlistToUpdate) {
                //     setlistToUpdate.events.push(setlist)
                //     await setlistToUpdate.save()
                // }
                // else
                // {
                //     return res.status(404).json({message: "No setlist was found."})
                // }
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
        await Setlist.findByIdAndUpdate(eventDeleted.setlist,{$pull: {events: id}})
        const indexToDelete = userEventOwner?.ownedEvent?.indexOf(id.toString)
        if(indexToDelete)
        {
            setlistsAssociated.forEach(setlist.event.filter(event => event != id))
            userEventOwner.ownedEvent.splice(indexToDelete,1)
            await userEventOwner.save()
            await setlistsAssociated.save()
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

const deleteSetlistFromEvent = async(req,res,next) => {
    const {id} = req.query
    try {
        const eventToClean = await Event.findById(id)
        
        if(eventToClean){

            const setlistId = await Setlist.findByIdAndUpdate(eventToClean.setlist,{$pull: {events: id}})
            eventToClean.setlist=null
            await eventToClean.save()

            


            return res.status(200).json({updated:true, event: eventToClean})
        }
    }
    catch(error)
    {
        next(error)
    }

}

const updateEvent = async(req,res,next) => {
    try 
    {
        const {id} = req.query
        
        const event = await Event.findByIdAndUpdate(id,{...req.body})
        const keysToUpdate = Object.keys(req.body)

        const updatedEvent = await Event.findById(id)
        
        

        
        return res.status(200).json({updated:true , Event: updatedEvent})  

    }
    catch(error) 
    {
        next(error)
    }
}

module.exports = { getAllEvents, addNewEvent, getEventById, getAllEventsPaginated, deleteEvent, deleteSetlistFromEvent, updateEvent}
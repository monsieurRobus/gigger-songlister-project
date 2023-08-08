const mongoose = require('mongoose')
const Song = require('../models/Song.model')
const User = require('../models/User.model')
const Setlist = require('../models/Setlist.model')
const Tag = require('../models/Tag.model')

const getAllTags = async (req, res, next) => {
    try {

        const tags = await Tag.find()
        
        const countTags = await mongoose.connection.db.collection('tag').countDocuments() 

        if(tags.length>0)
            return res.status(200).json({ message: 'Tags found', tags: tags })
        else
            return res.status(404).json({message: 'No tags found'})
    
    }
    catch (error)
    {
        return next(error)
    }

}

const getAllTagsPaginated = async (req, res, next) => {

    try{
        let page = 1
        const { pageReq } = req.params
        if(pageReq)
        {
            page = parseInt(pageReq)
        }        
        const limit = 6
        const skip = (page - 1) * limit
        const countTags = await mongoose.connection.db.collection('tags').countDocuments()
        const totalPages = Math.ceil(countTags / limit)
        const tags = await Tag.find().skip(skip).limit(limit)
        return res.status(200).json({ message: `${countTags} Tags found, showing page ${page} of ${totalPages}`, tags, totalPages, currentPage: page, limit })
  
    }
    catch(error)
    {
      return next(error)
    }
  
  }

const getTagById = async(req,res,next) => {
    try 
    {
        const {id} = req.params
        const tag = await Tag.findById(id)

        if(tag)
        {
            
            return res.status(200).json({message: 'Tag found', tag})
        }
        else 
        {
            return res.status(404).json({message: 'Tag not found'})
        }
    }
    catch(error){
        return next(error)
    }
}

const addNewTag = async (req,res,next) => {
    try{
        const {name,description,color} = req.body
        const tag = new Tag({...req.body, user:req.user._id})
        const tagAlreadyAdded = await Tag.findOne({name})
        const user = await User.findById(req.user._id)

        
        if(tagAlreadyAdded) {
            return res.status(200).json({message: "A tag with this name has already been added, please, change it's name"})
        }

        const tagSaved = await tag.save()
        
        if(tagSaved)
            {
                return res.status(200).json({ message: 'Tag was saved uwu ', tag: tag})
            }
        else 
            {
                return res.status(404).json({message: 'Tag could not be saved :('})
            }

    }
    catch(error)
    {
        return next(error)
    }
}

const deleteTag = async (req,res,next) => {

    try{
        const {id} = req.query

        const tagDeleted = await Tag.findByIdAndDelete(id)

        // Delete setlist reference in user

        const songsWithTag = await Song.find({tags: id})
        console.log(songsWithTag)
        songsWithTag.forEach(song=>{
            song.tags = song.tags.filter(tag => tag != id)
            song.save()
        })

        if(tagDeleted) {
            return res.status(200).json({message: "Tag deleted", tag: tagDeleted})
        }
        else
        {
            return res.status(404).json({message: "Tag not found, could not delete"})
        }
        
        
    }
    catch (error)
    {
        next(error)
    }

    

}

const updateTag = async(req,res,next) => {
    try 
    {
        const {id} = req.query
        const result = {}

        const tag = await Tag.findByIdAndUpdate(id,{...req.body})
        const keysToUpdate = Object.keys(req.body)

        const updatedTag = await Tag.findById(id)
                
        return res.status(200).json({updated:true , tag: updatedTag})  

    }
    catch(error) 
    {
        next(error)
    }
}

module.exports = { getAllTags, addNewTag, getTagById, getAllTagsPaginated, deleteTag, updateTag}
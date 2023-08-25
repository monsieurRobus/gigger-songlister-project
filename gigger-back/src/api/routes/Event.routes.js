const express = require('express')
const router = express.Router()
const { getAllEvents, addNewEvent, getEventById, getAllEventsPaginated, deleteEvent, updateEvent } = require('../controller/Event.controller')
const { isAuth, isAuthAdmin } = require('../../middlewares/auth.middleware')
const { uploadUser } = require('../../middlewares/files.middleware')
router.get('/',getAllEvents)
router.get('/page/:pageReq',getAllEventsPaginated)
router.patch('/update',isAuth,updateEvent)
router.get('/:id',isAuth,getEventById)
router.post('/new',isAuth,uploadUser.single('file'),addNewEvent)
router.delete('/delete',isAuth,deleteEvent)

module.exports = router
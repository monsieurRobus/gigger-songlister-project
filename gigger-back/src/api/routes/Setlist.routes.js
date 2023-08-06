const express = require('express')
const router = express.Router()
const { getAllSetlists, addNewSetlist, getSetlistById, getAllSetlistsPaginated, deleteSetlist, updateSetlist } = require('../controller/Setlist.controller')
const { isAuth, isAuthAdmin } = require('../../middlewares/auth.middleware')

router.get('/',getAllSetlists)
router.get('/page/:pageReq',getAllSetlistsPaginated)
router.patch('/update',isAuth,updateSetlist)
router.get('/:id',isAuth,getSetlistById)
router.post('/new',isAuth,addNewSetlist)
router.delete('/delete',isAuth,deleteSetlist)

module.exports = router
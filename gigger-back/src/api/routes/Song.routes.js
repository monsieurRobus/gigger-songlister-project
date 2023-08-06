const express = require('express')
const router = express.Router()
const { getAllSongs, addNewSong, getSongById, getAllSongsPaginated, deleteSong, updateSong } = require('../controller/Song.controller')
const { isAuth, isAuthAdmin } = require('../../middlewares/auth.middleware')

router.get('/',getAllSongs)
router.get('/page/:pageReq',getAllSongsPaginated)
router.patch('/update',isAuth,updateSong)
router.get('/:id',isAuth,getSongById)
router.post('/new',isAuth,addNewSong)
router.delete('/delete',isAuth,deleteSong)

module.exports = router
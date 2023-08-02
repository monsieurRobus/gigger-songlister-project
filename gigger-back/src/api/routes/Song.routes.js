const express = require('express')
const router = express.Router()
const { getAllSongs } = require('../controller/Song.controller')
const { isAuth, isAuthAdmin } = require('../../middlewares/auth.middleware')

router.get('/',getAllSongs)

module.exports = router
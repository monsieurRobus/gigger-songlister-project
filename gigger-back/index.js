const {server,router} = require('./src/utils/server')
const mongoose = require('mongoose')
const {db} = require('./src/utils/db')
const express = require('express')
const cors = require('cors');
const routerUser = require('./src/api/routes/User.routes')
const routerSong = require('./src/api/routes/Song.routes')
const routerSetlist = require('./src/api/routes/Setlist.routes')
const routerTag = require('./src/api/routes/Tag.routes')
const routerEvent = require('./src/api/routes/Event.routes');
const { io, httpServer } = require('./src/utils/socket');

const endpoint = process.env.ENDPOINT || '/api/v1'



server.use(express.json())
server.use(
  cors({
    origin: '*',
    credentials: true,
  })
)
server.use(endpoint, router)

router.use('/user', routerUser)
router.use('/songs', routerSong)
router.use('/setlist', routerSetlist)
router.use('/tags', routerTag)
router.use('/events', routerEvent)


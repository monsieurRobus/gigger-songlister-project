const express = require('express')
const router = express.Router()
const { getAllTags, addNewTag, getTagById, getAllTagsPaginated, deleteTag, updateTag } = require('../controller/Tag.controller')
const { isAuth, isAuthAdmin } = require('../../middlewares/auth.middleware')

router.get('/',getAllTags)
router.get('/page/:pageReq',getAllTagsPaginated)
router.patch('/update',isAuth,updateTag)
router.get('/:id',isAuth,getTagById)
router.post('/new',[isAuth],addNewTag)
router.delete('/delete',isAuth,deleteTag)

module.exports = router
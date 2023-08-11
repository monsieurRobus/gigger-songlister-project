const express = require('express')
const router = express.Router()
const { getUserById, registerUser, activateUser, getAllUsersPaginated, deleteUser, getAllUsers, update, loginUser, resendCode, forgotPassword,sendPassword, changePassword } = require('../controller/User.controller')
const { isAuth, isAuthAdmin } = require('../../middlewares/auth.middleware')
const { uploadUser } = require('../../middlewares/files.middleware')



router.get('/:id', [isAuth],getUserById)
router.get('/', getAllUsers)
router.get('/page/:pageReq', getAllUsersPaginated)
router.patch('/activate', activateUser)
router.post('/resend', resendCode)
router.post('/register', uploadUser.single('image'),registerUser)
router.post('/login', loginUser)
router.delete('/:id', deleteUser)
router.post('/forgotpassword/send', forgotPassword)
router.post('/sendpassword/:id', sendPassword);
router.post('/changePassword/:id', changePassword);
router.patch('/update', [isAuth], uploadUser.single('image'), update);

module.exports = router
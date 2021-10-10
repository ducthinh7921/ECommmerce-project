const express = require('express')
const router = express.Router()

const { authLogin,isAuth} = require('../controllers/auth')
const {profile} = require('../controllers/user')
const {create} = require('../controllers/order')


router.post('/create/:id',authLogin ,profile,isAuth ,create)


module.exports = router
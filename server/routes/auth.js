const express = require('express')
const router = express.Router() 

const { register, login, logout ,authLogin} = require('../controllers/auth')
const {RegisterValidator,LoginValidator} = require('../validator/validate')

router.post('/register', RegisterValidator,register)

router.post('/login',LoginValidator, login)

router.get('/logout', logout )


module.exports = router
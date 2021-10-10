const express = require('express')
const router = express.Router() 
const User = require('../models/user')


const { authLogin,isAuth,isAdmin} = require('../controllers/auth')
const {profile,admin,read,update} = require('../controllers/user')

router.get('/secret/:id',authLogin ,profile,isAuth,isAdmin ,admin)

router.get('/:id',authLogin ,profile,isAuth ,read)
router.put('/:id',authLogin ,profile,isAuth ,update)





module.exports = router
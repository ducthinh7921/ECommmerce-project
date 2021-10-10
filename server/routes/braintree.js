const express = require('express')
const router = express.Router()

const { authLogin,isAuth} = require('../controllers/auth')
const {profile} = require('../controllers/user')
const {generateToken,processPayment} = require('../controllers/braintree')


// router.get('/getToken/:userId',authLogin,profile,isAuth,generateToken);
router.get('/getToken/:id',authLogin,profile,isAuth,generateToken);
router.post('/payment/:id',authLogin,profile,isAuth,processPayment);


// router.get('/:id',authLogin ,profile,isAuth ,(req,res) => {
//     res.json(req.profile)
// })


module.exports = router
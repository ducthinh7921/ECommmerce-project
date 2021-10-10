const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.register = (req, res) => {
    const user = new User(req.body)
    user.save((error, user) => {
        if(error) return res.status(400).send(error)
        user.salt = undefined
        user.hash_password = undefined
        res.status(201).send({message:"Register successfully",user})
    })

}

exports.login = (req, res) => {
    const {email, password} = req.body
        User.findOne({ email}, (err, user) =>{ 
            if(err || !user) return res.status(400).json({error:'Email does not exist' })

            if(!user.authenticate(password)) {
                return res.status(401).json({error:"Incorrect email or password"})
            }
    
            const token = jwt.sign({_id: user._id },process.env.ACCESS_TOKEN_SECRET)
            res.cookie('t', token, {expire: new Date() +9999})
            const {_id, name ,email, role} = user
            return res.status(200).json({token,user:{_id, name , email, role}})

        })

}

exports.logout = (req, res) => {
    res.clearCookie('t')
    res.send({message:"Logout successfully"})

}

exports.authLogin = expressJwt({
    secret: process.env.ACCESS_TOKEN_SECRET,
    algorithms: ['HS256'],
    userProperty:"auth"
})

exports.isAuth = (req, res,next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user) {
        return res.status(403).json({message : "access denied"})
    }
    next()

}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.status(403).json({message : "Admin resourse! Access denied"})
    }
    next()

}

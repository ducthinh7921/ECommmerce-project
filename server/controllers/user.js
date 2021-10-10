const User = require('../models/user')

exports.profile = (req, res,next) => {

    User.findById(req.params.id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({err: "User not found"})
        }

        req.profile = user
        next()
    })


}

exports.admin = (req, res) => {
    res.json(req.profile)
}


exports.read = (req, res) => {
    req.profile.hash_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)

}

exports.update = (req, res) => {
    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {$new: true},(err, user) =>{
        if(err) return res.status(400).json({err: "You are not authorized to update"})

        user.hash_password = undefined
        user.salt = undefined
        return res.json({user, message: "update successfully"})

        

    })

}
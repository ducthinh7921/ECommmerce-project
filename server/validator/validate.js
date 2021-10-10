exports.RegisterValidator = (req,res,next) => {
    req.check('name','Name is required').notEmpty();
    req.check('email','Email must be between 3 and 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must be contain @')
        .isLength({
            min:4,
            max:32
        });
    req.check('password','Password is required').notEmpty();
    req.check('password')
        .isLength({
            min:6
        })
        .withMessage('Password must be contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must be contain a number')
    const errors = req.validationErrors()
    if(errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next()
}

exports.LoginValidator = (req,res,next) => {
    req.check('email','Email is required').notEmpty();

    req.check('email','Email must be between 3 and 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must be contain @')
        .isLength({
            min:4,
            max:32
        });
    req.check('password','Password is required').notEmpty();
    req.check('password')
        .isLength({
            min:6
        })
        .withMessage('Password must be contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must be contain a number')
    const errors = req.validationErrors()
    if(errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next()
}

exports.CreateCatValidator = (req,res,next) => {
  
    req.check('name','Name is required').notEmpty();
    req.check('name')
        .isLength({
            min:3
        })
        .withMessage('Name must be contain at least 3 characters')
    const errors = req.validationErrors()
    if(errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next()
}
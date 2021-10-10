const express = require('express')
const router = express.Router() 

const { create, categoryById, category,delCategory ,getAll,updateCategory} = require('../controllers/category')
const { authLogin,isAuth,isAdmin} = require('../controllers/auth')
const {profile} = require('../controllers/user')
const {CreateCatValidator} = require('../validator/validate')


router.post('/:id',authLogin ,profile,isAuth,isAdmin ,create )

router.get('/:categoryId',categoryById,  category)
router.get('/', getAll)


router.delete('/:categoryId/:id',categoryById, authLogin ,profile,isAuth,isAdmin,delCategory)
router.put('/:categoryId/:id',categoryById, authLogin ,profile,isAuth,isAdmin,updateCategory)



module.exports = router
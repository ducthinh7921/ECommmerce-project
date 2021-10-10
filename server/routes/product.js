const express = require('express')
const router = express.Router() 

const { create, productById ,product,delProduct, updateProduct,
        allProduct,relatedList,listCategory,listBySearch,photo,listProduct} 
    = require('../controllers/product')

const { authLogin,isAuth,isAdmin} = require('../controllers/auth')
const {profile} = require('../controllers/user')

router.post("/search", listBySearch);
router.get("/searchProduct", listProduct);
router.get('/categories', listCategory)
router.get('/',allProduct )
router.get('/related/:productId',productById,relatedList )
router.get('/:productId',productById, product )
router.get('/photo/:productId',productById, photo )

router.post('/:id',authLogin ,profile,isAuth,isAdmin ,create )
router.delete('/:productId/:id',productById, authLogin ,profile,isAuth,isAdmin,delProduct )
router.put('/:productId/:id',productById, authLogin ,profile,isAuth,isAdmin,updateProduct )






module.exports = router
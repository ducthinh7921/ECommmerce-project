const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const { errorHandler} = require('../handleError/handleError')



// http://localhost:5000/api/product?sortBy=sold&order=desc&limit=3

exports.allProduct = (req, res) => {

    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find()
            .select("-photo")
            .populate('category')
            .sort([[sortBy,order]])
            .limit(limit)
            .exec((err,product) => {
                    if(err) {
                        return res.status(400).json({message:"Product not found"})
                    }
                    res.json(product)
                })

}

// san pham lien quan

exports.relatedList = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find({_id: {$ne: req.product},category: req.product.category })
        //  .select("-photo")
        .limit(limit)
        .populate('category','_id name')
        .exec((err,product) => {
            if(err) {
                return res.status(400).json({message:"Product not found"})
            }
            res.json(product)
        })
}

exports.listCategory = (req, res) => {
    Product.distinct('category', {} , (err, categories) => {
        if(err) {
            return res.status(400).json({message:"Category not found"})
        }
        res.json(categories)

    })
}


exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (error,fields,files) =>{
        if(error) {
            return res.status(400).json({error:"Image could not be updloaded"})
        }

        const {name, description,price,category,quantity,shipping} = fields

        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({error:"all fields are required"})

        }


        let product = new Product(fields)
         
        if(files.photo) {
            // check photo
            if(files.photo.sie > 1000000) {
                 return res.status(400).json({error:"Image should be less than 1mb"})

            }

            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((error, product) => {
            if(error) {
                return res.status(400).json({error:errorHandler(error)})
            }
            res.json({message:"create successfully",product})
            
        })
    })
}

exports.productById = (req, res, next)  => {
    Product.findById(req.params.productId)
    .populate('category')
    .exec((error, product) => {
        if(error || !product) {
            return res.status(400).json({error:"Product not found"})
        }
        req.product = product
        next()
    })
}

exports.product = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

exports.delProduct = (req, res) => {
    let product = req.product
    product.remove((err , deleteProduct) => {
        if(error) {
            return res.status(400).json({error:errorHandler(error)})
        }
        res.json({deleteProduct, message: "delete successfully"})
    })
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (error,fields,files) =>{
        if(error) {
            return res.status(400).json({error:"Image could not be updloaded"})
        }

        const {name, description,price,category,quantity,shipping} = fields

        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({error:"all fields are required"})

        }


        let product = req.product
        product = _.extend(product,fields)
         
        if(files.photo) {
            // check photo
            if(files.photo.sie > 1000000) {
                 return res.status(400).json({error:"Image should be less than 1mb"})

            }

            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, product) => {
            if(error) {
                return res.status(400).json({error:errorHandler(error)})
            }
            res.json({message:"update successfully",product})
            
        })
    })
}   

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({error: "Products not found"});
            }
            res.json({ size: data.length,data});
        });
};

exports.photo = (req, res,next) => {
    if(req.product.photo) {
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.listProduct = (req, res) => {
    // query value by key and category
    const query = {}
    // assign search value to query.name
    if(req.query.search) {
        query.name = {$regex: req.query.search, $options: 'i'}
        // assign category value to query.category
        if(req.query.category && req.query.category !== 'All') {
            query.category = req.query.category
        }
        // find product by search and category 
        Product.find(query,(error, product) => {
            if(error) {
                return res.status(400).json({error:handleError(error)})
            }
            res.json(product)
        })
        .select('-photo')
    }
}
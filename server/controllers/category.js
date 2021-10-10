const Category = require('../models/category')
const { errorHandler} = require('../handleError/handleError')

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((error, cat) => {
        if(error) {
            return res.status(400).json({error: errorHandler(error)})
        }
        res.json({message:"create successfully",cat})
    })

}

exports.categoryById = (req, res, next) => {
    Category.findById(req.params.categoryId).exec((err, category) => {
        if(err || !category) {
            return res.status(400).json({err:"Category not found"})
        }
        req.category = category
        next()
    })
}

exports.category = (req, res) => {
    return res.json(req.category)
}

exports.delCategory = (req, res) => {
    let category = req.category
    category.remove((err , deleteCategory) => {
        if(err) {
            return res.status(400).json({err})
        }
        res.json({deleteCategory, message: "delete successfully"})
    })
}
exports.updateCategory = (req, res) => {
    const category = req.category
    category.name = req.body.name
    category.save((err, category) => {
        if(err) {
            return res.status(400).json({err})
        }
        res.json({category, message: "update successfully"})

    })
}

exports.getAll = (req, res) => {
    Category.find().exec((err, category) => {
        if(err) {
            return res.status(400).json({err})
        }
        res.json(category)
    })
}
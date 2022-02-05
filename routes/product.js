const express = require('express')
const router = express.Router()
/*-----------------Controllers----------------------*/
const productControllers = require('../controllers/product')
/*-----------------Models ----------------------*/
const Product = require("../models/Product")
/*-----------------Routes ----------------------*/
                /*Get All*/
router.get('/', productControllers.allProducts)
                /*Get Group*/
router.get('/find/:title', async function (req, res){
    try{
        products = await Product.find({title: {$regex: req.params.title, $options: 'i'}})
        res.json(products)
    }catch (error) {
        res.status(404).send(error)
    }
})
                /*Get One*/
router.get('/:id', async function (req, res){
    try{
        oneProduct = await Product.findById(req.params.id)
        if(oneProduct == null){
            return res.status(404).json({error: 'Product not found'})
        }
        res.json(oneProduct)
    }catch (error) {
        res.status(500).json({error:error.messgae})
    }
})

                /*Create One*/
router.post('/create', async function (req, res){
    console.log(req.body)
    product = new Product({
        title: req.body.title, 
        description: req.body.description , 
        price: req.body.price
    })
    try{
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    }catch (error) {
        res.status(400).json({error:error.messgae})
    }
})
                /*Update One*/
router.patch('/:id', async function (req, res){
    try{
        oneProduct = await Product.findById(req.params.id)
        if(oneProduct == null){
            return res.status(404).json({error: 'Product not found'})
        }
        oneProduct.title = req.body.title
        if (req.body.description != null) oneProduct.description = req.body.description
        if (oneProduct.price != null) oneProduct.price = req.body.price
        oneProduct.save()
        res.json(oneProduct)
    }catch (error) {
        res.status(400).json({error:error.messgae})
    }
})

                /*Delete One*/
router.delete('/:id', async function (req, res){
    try{
        oneProduct = await Product.findById(req.params.id)
        if(oneProduct == null){
            return res.status(404).json({error: 'Product not found'})
        }
        oneProduct.remove()
        res.json({message: 'Product deleted'})
    }catch (error) {
        res.status(500).json({error:error.messgae})
    }
})
/*
TIPS FOR CLEANER CODE:
ADD MIDDLEWARES ON SUCH A FIND ONE QUERY TO DECREASE DUPLICATED CODE...

MAYBE ALSO DO FUNCTIONS/MIDDLEWARES FOR MORE QUERIRES

router.route(/:id).get().post().etc...

*/

module.exports = router
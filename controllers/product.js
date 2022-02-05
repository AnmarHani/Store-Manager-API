const express = require('express')
/*-----------------Models ----------------------*/
const Product = require("../models/Product")

exports.allProducts = async(req, res) => {
    try{
        products = await Product.find()
        res.json(products)
    }catch (error) {
        res.status(404).send(error)
    }
}
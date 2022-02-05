const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    seller:String,
    title: String,
    description: String,
    price: Number,
})

module.exports = mongoose.model('Product', productSchema)
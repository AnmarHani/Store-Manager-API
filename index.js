/*-----------------Required ----------------------*/
const express = require('express');
const mongoose = require('mongoose');
/*-----------------Routers ----------------------*/
const userRouter = require("./routes/user")
const productRouter = require("./routes/product")
/*-----------------Models ----------------------*/

/*-----------------Middlewares ----------------------*/

mongoose.connect('mongodb://localhost:27017/db1', {
    useNewUrlParser:true
}).then(()=>{
    const app = express();
    app.use(express.json())
    app.use('/user', userRouter)
    app.use('/products', productRouter)
    
    app.listen(3000)
}).catch(err => {
    console.log("An error occured while trying to connect to the database: " + err.message)
});
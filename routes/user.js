const express = require('express')
const router = express.Router()

router.get('/', function (req, res){
    res.send("U are in users")
})

/*

get("/:id"){
    req.params.id
}

router.route(/:id).get().post().etc...

*/

module.exports = router
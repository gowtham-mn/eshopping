const express = require('express');
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try {
        res.send([global.food_items,global.food_catogory]);
    } catch (e) {
        console.error(e.message);
    }
})

module.exports = router;
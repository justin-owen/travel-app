const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
    res.render('home/index')
});
router.get('/regions', (req, res)=>{
    res.render('home/regions')
});
router.get('/countries', (req, res)=>{
    res.render('home/countries')
});

module.exports = router;
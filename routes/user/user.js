const express = require('express');
const router = express.Router();

const Region = require('../../models/region')
const Country = require('../../models/country')
const City = require('../../models/city')

const {userAuthenticated} = require('../../helpers/authentication');



router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'user';
    next();


});
router.get('/', (req, res)=>{
    res.render('user/user-index')
});
router.get('/countries', (req, res)=>{
    Country.find({}).sort({'name':1}).then((countries)=>{
        res.render('user/user-countries', {data: countries})
    })
    
});
router.get('/regions', (req, res)=>{
    Region.find({}).sort({'name':1}).then((regions)=>{
        res.render('user/user-regions', {data: regions})
    })
});

router.get('/myposts', (req, res)=>{
    res.render('user/user-myposts')
});

module.exports = router;
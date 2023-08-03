const express = require('express');
const router = express.Router();
const {userAuthenticated} = require('../../helpers/authentication');



router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'user';
    next();


});
router.get('/', (req, res)=>{
    res.render('user/user-index')
});
router.get('/countries', (req, res)=>{
    res.render('user/user-countries')
});
router.get('/regions', (req, res)=>{
    res.render('user/user-regions')
});
router.get('/myposts', (req, res)=>{
    res.render('user/user-myposts')
});

module.exports = router;
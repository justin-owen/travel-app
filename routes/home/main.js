const express = require('express');
const router = express.Router();
const user = require('../../models/user')
const bodyParser = require('body-parser')
router.get('/', (req, res)=>{
    res.render('home/index')
});
router.get('/regions', (req, res)=>{
    res.render('home/regions')
});
router.get('/countries', (req, res)=>{
    res.render('home/countries')
});
router.post('/', (req, res) =>{
    try{
        const newUser = new user({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
        });
        newUser.save()
        console.log(newUser)
        res.render('home/index')
    }catch (error){
        console.log(error)
    }

});
module.exports = router;
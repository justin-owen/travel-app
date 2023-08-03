const express = require('express');
const router = express.Router();
const UserModel = require('../../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;


router.all('/*', (req, res, next)=>{


    req.app.locals.layout = 'home';
    next();


});


router.get('/', (req, res)=>{
    res.render('home/index')
});
router.get('/regions', (req, res)=>{
    res.render('home/regions')
});
router.get('/countries', (req, res)=>{
    res.render('home/countries')
});
router.get('/login', (req, res)=>{
    res.render('home/login')
})
router.get('/register', (req, res)=>{
    res.render('home/register')
})


//app login
passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
    UserModel.findOne({email: email}).then(user=>{
        if(!user) return done(null, false, {message: "No user Found"})
        bcrypt.compare(password, user.password, (err, matched)=>{
            if (err) return err;
            if(matched) {
                console.log(user)
                return done(null, user);
            }else{
                return done(null, false, {message: 'Incorrect password'})
            }
        });
        
    })

}));
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

router.post('/login', (req, res, next)=>{

        passport.authenticate('local', {
            successRedirect:'/user',
            failureRedirect: '/login',
            failureFlash:true
         })(req, res, next);

});
router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
router.post('/register', (req, res) =>{
    try{
        let errors = [];


        if(!req.body.firstName) {
    
            errors.push({message: 'Please enter your first name'});
    
        }
    
    
        if(!req.body.lastName) {
    
            errors.push({message: 'Please add a last name'});
    
        }
        if(!req.body.userName) {
    
            errors.push({message: 'Please add a user name'});
    
        }
    
        if(!req.body.email) {
    
            errors.push({message: 'Please add an email'});
    
        }
    
        if(!req.body.password) {
    
            errors.push({message: 'please enter a password'});
    
        }
        if(!req.body.password.match('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/')){
            errors.push({message: 'Password must be between 6 and 20 characters that contains one numeric digit, one uppercase, and one lowercase letter.'})
        }
    

    
    
        if(errors.length > 0){
            res.render('home/register', {

                errors: errors,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
    
            })
        }else{


            UserModel.findOne({email: req.body.email}).then(user=>{
                if(!user){

                    bcrypt.genSalt(10, (err, salt)=>{
                        bcrypt.hash(req.body.password, salt, (err, hash)=>{
                            const newUser = new UserModel({
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                userName: req.body.userName,
                                email: req.body.email,
                                password: hash,
                            });
                            newUser.save()
                        })
                    })
                    res.redirect('/login')

                }else{
                    errors.push({message: 'Email already in use!'});
                    res.render('home/register', {
                        errors: errors
                    })
                }
            })
        }

    }catch (error){
        console.log(error)
    }

});
module.exports = router;
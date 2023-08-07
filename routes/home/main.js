const express = require('express');
const router = express.Router();
// All Models
const UserModel = require('../../models/user')
const Region = require('../../models/region')
const Country = require('../../models/country')
const City = require('../../models/city')
const Post = require('../../models/post')

// Authentication and hashing references
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

// Setting layout for all pages within non logged in user
router.all('/*', (req, res, next)=>{


    req.app.locals.layout = 'home';
    next();


});

// Home page
router.get('/', (req, res)=>{
    Post.find({}).sort({createdAt: -1}).limit(10).then((recentPosts)=>{
        res.render('home/index', {recentPosts:recentPosts})
    });  
});
// Login
router.get('/login', (req, res)=>{
    res.render('home/login')
});
// Register
router.get('/register', (req, res)=>{
    res.render('home/register')
});
router.get('/search', (req, res)=>{
    const searchTerm = req.query.term
    City.find({name:{$regex: searchTerm}}).sort({'name': 1}).then(cities=>{
        res.render('home/cities', {data: cities})
    })

});
// Regions page
router.get('/regions', (req, res)=>{
    Region.find({}).sort({'name':1}).then((regions)=>{
        res.render('home/regions', {data: regions})
    })
    
});
// Countries page
router.get('/countries', (req, res)=>{
    Country.find({}).sort({'name':1}).then((countries)=>{
        
        res.render('home/countries', {data: countries})
    })
});
// Countries within a region name
router.get('/countries/:name', (req, res)=>{
    var regionName = req.params.name
    Country.find({'region': regionName}).sort({'name':1}).then((countries)=>{
        
        res.render('home/countries', {data: countries})
    })
});
// Cities page
router.get('/cities', (req, res)=>{
    City.find({}).sort({'name':1}).then((cities)=>{
        
        res.render('home/cities', {data: cities})
    })
});
// Cities within a country name
router.get('/cities/:name', (req, res)=>{
    var countryName = req.params.name
    City.find({'country': countryName}).sort({'name':1}).then((cities)=>{
        
        res.render('home/cities', {data: cities})
    })
});

router.get('/posts/:name', (req, res)=>{
    var cityName = req.params.name
    Post.find({'city': cityName}).then((posts)=>{
        res.render('home/posts', {posts: posts, name:cityName})
    })
});

//app login
passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
    UserModel.findOne({email: email}).then(user=>{
        if(!user) return done(null, false, {message: "No user Found"})
        bcrypt.compare(password, user.password, (err, matched)=>{
            if (err) return err;
            if(matched) {

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
// logging out
router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
// App register
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
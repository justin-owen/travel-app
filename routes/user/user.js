const express = require('express');
const router = express.Router();

const Region = require('../../models/region')
const Country = require('../../models/country')
const City = require('../../models/city')
const Post = require('../../models/post')

const {userAuthenticated} = require('../../helpers/authentication');




router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'user';
    next();


});
router.get('/', (req, res)=>{
    Post.find({}).sort({createdAt: -1}).limit(10).then((recentPosts)=>{
        Post.find({'userName':req.user.userName}).sort({createdAt: -1}).limit(10).then((myposts)=>{
            res.render('user/user-index', {myposts:myposts, recentPosts:recentPosts})
        })
    })
});
router.get('/search', (req, res)=>{
    const searchTerm = req.query.term
    City.find({name:{$regex: searchTerm}}).sort({'name': 1}).then(cities=>{
        res.render('home/cities', {data: cities})
    })

});
router.get('/countries', (req, res)=>{
    Country.find({}).sort({'name':1}).then((countries)=>{
        res.render('user/user-countries', {data: countries})
    })
    
});
router.get('/regions', (req, res)=>{
    Region.find({}).then((regions)=>{
        res.render('user/user-regions', {data: regions})
    })
});
// Countries within a region name
router.get('/countries/:name', (req, res)=>{
    var regionName = req.params.name
    Country.find({'region': regionName}).sort({'name':1}).then((countries)=>{
        
        res.render('user/user-countries', {data: countries})
    })
});
// Cities page
router.get('/cities', (req, res)=>{
    City.find({}).sort({'name':1}).then((cities)=>{
        
        res.render('user/user-cities', {data: cities})
    })
});
// Cities within a country name
router.get('/cities/:name', (req, res)=>{
    var countryName = req.params.name
    City.find({'country': countryName}).sort({'name':1}).then((cities)=>{
        
        res.render('user/user-cities', {data: cities})
    })
});
router.get('/posts/create', (req, res)=>{
    City.find({}).sort({'name': 1}).then((cities)=>{
        res.render('user/user-create-post', {cities: cities})
    })
})
router.get('/posts/:name', (req, res)=>{
    var cityName = req.params.name
    Post.find({'city': cityName}).then((posts)=>{
        res.render('user/user-posts', {posts: posts, name:cityName})
    })
});
router.put('/posts/:id/like', (req, res)=>{
    var cityName = req.body.city
    var increment = req.body.increment
    var id = req.body.id

    Post.findOne({'_id': id}).then(post=>{
        post.likeCount = post.likeCount + increment
        post.save().then(updatedPost=>{
            res.json(updatedPost)
        })
    })
    
});

router.put('/posts/:id/dislike', (req, res)=>{
    var cityName = req.body.city
    var increment = req.body.increment
    var id = req.body.id

    Post.findOne({'_id': id}).then(post=>{
        post.likeCount = post.likeCount + increment
        post.save().then(updatedPost=>{
            res.json(updatedPost)
        })
    })
});


router.post('/posts/create', (req, res)=>{
    const newPost = new Post({
        city: req.body.city,
        locationName: req.body.locationName,
        userName: req.body.userName,
        locationDetails: req.body.locationDetails
    });
    newPost.save().then(newPost=>{
        res.redirect('/user/myposts')
    })

});
router.post('/posts/create/:name', (req, res)=>{
    const city = req.params.name
    const newPost = new Post({
        city: req.body.city,
        locationName: req.body.locationName,
        userName: req.body.userName,
        locationDetails: req.body.locationDetails
    });
    newPost.save().then(newPost=>{
        res.redirect(`/user/posts/${city}`)
    })

});
router.get('/posts/create/:name', (req, res)=>{
    var cityName = req.params.name
    res.render('user/user-create-post', {name: cityName})
});

router.get('/myposts', (req, res)=>{
    Post.find({'userName':res.locals.user.userName}).sort({createdAt: -1}).then((posts)=>{
        res.render('user/user-myposts', {posts: posts})
    })
});
router.get('/posts/edit/:id', (req, res)=>{
    Post.find({'_id':req.params.id}).then((post)=>{
        City.find({}).sort({'name': 1}).then((cities)=>{
            res.render('user/user-edit-post', {post: post, cities:cities})

        })
    })
});
router.put('/posts/edit/:id', (req, res)=>{
   Post.findOne({'_id': req.params.id}).then(post=>{
        post.locationName = req.body.locationName,
        post.locationDetails = req.body.locationDetails
        post.save().then(updatedPost=>{
            res.redirect('/user/myposts')
        })
   })
});
router.delete('/myposts/:id', (req, res)=>{
   Post.deleteOne({'_id': req.params.id}).then(result=>{
        res.redirect('/user/myposts')
   })
});

module.exports = router;
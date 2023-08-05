const express = require('express')
const app = express()
const path = require('path')
const handlebars = require('express-handlebars')
const handlebrs = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const insecureHandlebars = allowInsecurePrototypeAccess(handlebars)
const bodyParser = require('body-parser')
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport')
require('dotenv').config()
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, family: 4}).then((db)=>{
    console.log('MONGO connected');
}).catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

app.use(session({
    secret: 'justinoweniscool',
    resave: true,
    saveUninitialized: true,
  }));

app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next)=>{

    res.locals.user = req.user;
    
    res.locals.success_message = req.flash('success_message');

    res.locals.error_message = req.flash('error_message');

    res.locals.form_errors = req.flash('form_errors');

    res.locals.error = req.flash('error');

    next();


});


app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine({defaultLayout: 'home', handlebars:allowInsecurePrototypeAccess(handlebrs)}));
app.use(express.static(path.join(__dirname, 'public')));


const main = require('./routes/home/main')
const user = require('./routes/user/user')




app.use('/', main)
app.use('/user', user);



app.listen(4000, () => console.log(`server running on 4000`))


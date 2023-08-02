const express = require('express')
const app = express()
const path = require('path')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
require('dotenv').config()
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, family: 4}).then((db)=>{
    console.log('MONGO connected');
}).catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json())

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine({defaultLayout: 'home'}));
app.use(express.static(path.join(__dirname, 'public')));
const main = require('./routes/home/main')

app.use('/', main)

app.post('/')

app.listen(4000, () => console.log(`server running on 4000`))


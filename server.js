const express = require('express')
const app = express()
const path = require('path')
const handlebars = require('express-handlebars')

app.use(express.json())

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine({defaultLayout: 'home'}));
app.use(express.static(path.join(__dirname, 'public')));
const main = require('./routes/home/main')

app.use('/', main)

app.listen(4000, () => console.log(`server running on 4000`))


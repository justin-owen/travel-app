const express = require('express')
const app = express()
const path = require('path')
const handlebars = require('express-handlebars')

app.use(express.json())

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine({defaultLayout: 'home'}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.render('home/index')
})


app.listen(4000, () => console.log(`server running on 4000`))


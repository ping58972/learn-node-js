const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app= express();

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const productController = require('./controllers/error');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', shopRoute);
app.use('/admin', adminRoute);
app.use('/', productController.get404);

app.listen(4000);
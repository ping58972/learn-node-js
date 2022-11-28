const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const productController = require('./controllers/error');
const User = require('./modles/user');



const app= express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    User.findById('5cf5a89ec7d3dd3478fa6137').then(user=> {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    }).catch(err=>console.log(err));
});

app.use('/admin', adminRoute);
app.use(shopRoute);
app.use(productController.get404);


mongoConnect(()=>{
    app.listen(3000);
});




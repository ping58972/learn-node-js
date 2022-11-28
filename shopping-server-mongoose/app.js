const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


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
    User.findById('5cf8915ffcf7093404b2dca4').then(user=> {
        req.user = user;
        next();
    }).catch(err=>console.log(err));
});

app.use('/admin', adminRoute);
app.use(shopRoute);
app.use(productController.get404);



mongoose.connect('mongodb+srv://ping:pink58972@cluster0-5aiyx.mongodb.net/mongoose-shop?retryWrites=true&w=majority')
.then(result => {
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: 'Ping',
                email: 'me@ping58972.com',
                cart:{
                    items: []
                }
            });
            user.save();
        }
    });
    app.listen(3000);
}).catch(err=>console.log(err));



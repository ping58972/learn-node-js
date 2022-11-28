const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const productController = require('./controllers/error');

const sequelize = require('./util/database');
const Product = require('./modles/product');
const User = require('./modles/user');
const Cart = require('./modles/cart');
const CartItem = require('./modles/cart-item');
const Order = require('./modles/order');
const OrderItem = require('./modles/order-item');

const app= express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    User.findByPk(1).then(user=> {
        req.user = user;
        next();
    }).catch(err=>console.log(err));
});

app.use('/admin', adminRoute);
app.use(shopRoute);
app.use(productController.get404);
// app.use('/', shopRoute);
// app.use('/', productController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem })

sequelize
 .sync({force: true})
//.sync()
.then((result)=>{
   return User.findByPk(1);
 // console.log(result)
    //app.listen(4000);
})
.then(user => {
    if(!user){
       return User.create({name: 'Ping', email: 'test@ping58972.com'});
    }
   // return Promise.resolve(user); 
    return user; 
}).then(user=>{
   return user.createCart();
    
}).then(cart=>{
    app.listen(4000);
})
.catch(err=>console.log(err));


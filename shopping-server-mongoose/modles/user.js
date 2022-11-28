const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongodb = require('mongodb');
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, required: true}
        }]
    }
});

userSchema.methods.addToCart = function (product) {
    //console.log(product);
    //console.log(this.cart);
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if(cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity: newQuantity});
    }
    const updatedCart = {items: updatedCartItems};
    this.cart = updatedCart;
    return this.save();
            
}

userSchema.methods.removeFromCart =  function(productId) {
    const updatedCartItems = this.cart.items.filter( item => {
                    return item.productId.toString() !== productId.toString();
                });
            this.cart.items = updatedCartItems;
          return  this.save();
}

userSchema.methods.clearCart = function () {
    this.cart = {items: []};
    return this.save();
}

module.exports = mongoose.model('User', userSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class User {
//     constructor(username, email, cart, id) {
//         this.name = username;
//         this.email = email;
//         this.cart = cart;
//         this._id =  id;
//     }

//     save() {
//         return getDb().collection("users").insertOne(this).then(result => console.log(result)).catch(err=> console.log(err) );
//     }

//     addToCart (product) {
//         const cartProductIndex = this.cart.items.findIndex(cp => {
//             return cp.productId.toString() === product._id.toString();
//         });
//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];
//         if(cartProductIndex >= 0) {
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//         } else {
//             updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity: 1});
//         }
//         const updatedCart = {items: updatedCartItems};
//         return getDb().collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}});
//     }

//     getCart() {
//         const productIds = this.cart.items.map(i => {
//             return i.productId;
//         });
//         return getDb().collection('products')
//         .find({_id: {$in: productIds}})
//         .toArray()
//         .then(products => {
//             return products.map(p => {
//                 return {...p, quantity: this.cart.items.find(i => {
//                         return i.productId.toString() === p._id.toString();
//                     }).quantity
//                 }
//             });
//         }).catch(err=>console.log(err))
//     }

//     deleteItemFromCart(productId) {
//         const updatedCartItems = this.cart.items.filter( item => {
//             return item.productId.toString() !== productId.toString();
//         });
//         return getDb().collection('users')
//             .updateOne(
//                 {_id: new mongodb.ObjectId(this._id)},
//                 { $set: {cart: {items: updatedCartItems}} }
//             );
//     }

//     addOrder() {
//        return this.getCart().then(products => {
//             const order = {
//                 items: products,
//                 user: {
//                     _id: new mongodb.ObjectId(this._id),
//                     name: this.name
//                 }
//             }
//             return getDb().collection('orders')
//             .insertOne(order).then(result => {
//                 this.cart = {items: []};
//                 return getDb().collection('users').updateOne(
//                     {_id: new mongodb.ObjectId(this._id)},
//                     { $set: {cart: {items: []}}}
//                 );
//             });
//         });
//     }

//     getOrders() {
//         return getDb().collection('orders')
//         .find({'user._id': new mongodb.ObjectId(this._id)})
//         .toArray();
//     }

//     static findById(userId) {
//         return getDb().collection('users').findOne({_id: new mongodb.ObjectId(userId)})
//         .then(user => {
//             console.log(user);
//             return user}).catch(err=>console.log(err));
//         // .next().then(user => user).catch(err=>console.log(err));
//     }
// }

// module.exports = User;
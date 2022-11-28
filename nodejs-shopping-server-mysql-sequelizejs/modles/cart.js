const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;

// const fs = require('fs');
// const path = require('path');
// const p = path.join(
//     path.dirname(process.mainModule.filename), 
//     'data', 
//     'cart.json');

// module.exports = class Cart {
//     static addProduct(id, productPrice){
//         // Fetch the previous cart
//         fs.readFile(p, (err, fileContent) => {
//             let cart = {products: [], totalPrice: 0}
//             if(!err){
//                 cart = JSON.parse(fileContent);
//             }
//             // Anakyze the cart then find the existing product
//             const existingProductIndex = cart.products.findIndex(
//                 prod => prod.id === id
//                 );
//             const existingProduct = cart.products[existingProductIndex];
//             // add new product and increase quantity.
//             let updatedProduct;
//             if(existingProduct){
//                 updatedProduct = {...existingProduct};
//                 updatedProduct.qty = updatedProduct.qty + 1;
//                 cart.products = [...cart.products];
//                 cart.products[existingProductIndex] = updatedProduct;
//             }else {
//                 updatedProduct = {id: id, qty: 1};
//                 cart.products = [...cart.products, updatedProduct];
//             }
//             cart.totalPrice = cart.totalPrice + +productPrice;
//             fs.writeFile(p, JSON.stringify(cart), err => {
//                 console.log(err)
//             });
//         });
//     }

//     static deleteProduct(id, productPrice) {
//         fs.readFile(p, (err, fileContent)=> {
//             if(err) {
//                 return;
//             }
//             const cart = JSON.parse(fileContent);
//             const updatedCart = {...cart};
//             const product = updatedCart.products.find(prod => prod.id === id);
//             if(!product){
//                 return;
//             }
//             const productQty = product.qty;
//             updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
//             updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty ;

//             fs.writeFile(p, JSON.stringify(updatedCart), err => console.log(err))
//         });
//     }

//     static getCart(callBack) {
//         fs.readFile(p, (err, fileContent) => {
//             const cart = JSON.parse(fileContent);
//             if(err){
//                 callBack(null)
//             } else {
//                 callBack(cart);
//             }
//         });
//     }
// };
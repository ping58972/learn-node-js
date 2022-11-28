// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'ping_mysql',
//     password: '58972pink'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('ping_mysql', 'root', '58972pink', {
    dialect: 'mysql', host: 'localhost'});

    module.exports = sequelize;
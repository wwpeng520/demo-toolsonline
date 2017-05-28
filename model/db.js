const Sequelize = require('sequelize');

module.exports = new Sequelize('tools', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+08:00',
    pool:{
        max: 5,
        min: 0,
        idle: 10000
    }
});
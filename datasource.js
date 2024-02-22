const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./database/config/config.js')[env];
const sequelize = new Sequelize(config);

const getInstance = () => {
    return sequelize;
}

const connect = () => {
    return sequelize.authenticate();
}



module.exports = {
    getInstance,
    connect
}
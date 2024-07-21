const dbConfig = require('./db-config');
const Sequilize = require("sequelize");

const connection = new Sequilize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT
});

module.exports = connection;
// const mysql = require('mysql');
const { Sequelize } = require('sequelize');
require("dotenv").config();

const dbConfig = new Sequelize(
    process.env.DB_NAME,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'mysql',
    }
);

module.exports = { dbConfig };
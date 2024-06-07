// const mysql = require('mysql');
const { Sequelize } = require('sequelize');
require("dotenv").config();

const dbConfig = new Sequelize(
    process.env.MYSQL_ADDON_DB,
    process.env.MYSQL_ADDON_USER,
    process.env.MYSQL_ADDON_PASSWORD,
    {
        host: process.env.MYSQL_ADDON_HOST,
        dialect: 'mysql',
    }
);

module.exports = { dbConfig };
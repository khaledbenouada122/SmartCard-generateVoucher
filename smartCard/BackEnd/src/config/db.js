'use strict';
const { development } = require('./db.config.json');

const Sequelize = require("sequelize");

module.exports = {
    DB: development.database,
    HOST: development.host,
    PASSWORD: development.password,
    USER: development.username,
    logging: false,
    dialect: development.dialect,
    dialectOptions: {
      options: {
        requestTimeout: 3000,
      },
    },
    pool: {
      acquire: 30000,
      idle: 10000,
      max: 5,
      min: 0,
      options: {
          requestTimeout: 3000,
        },
      },
      pool: {
        acquire: 30000,
        idle: 10000,
        max: 5,
        min: 0,
      },
    };;


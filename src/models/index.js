const Sequelize = require('sequelize');
const config = require('../config');
const checkConnection= require('../utils/checkConnection');

let sequelize = new Sequelize(
    config.postgresql.database,
    config.postgresql.username,
    config.postgresql.password,
    {
        host: config.postgresql.host,
        dialect: config.postgresql.dialect,
        logging: false
    }
);

// checkConnection.testConnection(sequelize);

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;


module.exports = db;
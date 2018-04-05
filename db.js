const Sequelize = require('sequelize');
const config = require('./config/config_db');
let db = null;

module.exports = () => {
    if(!db){
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );
        db = {
            sequelize,
            Sequelize,
            models: {}
        };
        const CLIENTE = sequelize.import('./model/Cliente.js');
        db.models[CLIENTE] = CLIENTE;
    }
    return db;
};

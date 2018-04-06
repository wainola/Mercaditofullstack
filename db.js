const mysql = require('mysql2');
const config = require('./config/config_db');

const connection = mysql.createConnection({
    host: 'localhost',
    user: config.username,
    password: config.password,
    database: 'mercadito_de_larmahue'
});

connection.connect((err) => {
    if (err) { console.log('Error en la conexion a MySQL'); }
    console.log('Conexion exitosa a MySQL');
});

module.exports = connection;
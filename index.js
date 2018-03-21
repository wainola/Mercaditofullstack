const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// Controllers
const GetProductos = require('./controllers/products');

const app = express();

const port = 4500;

// DB CONNECTION
const mongoDB = 'mongodb://127.0.0.1/larmahue_market';

mongoose.connect(mongoDB);

// GET MONGOOSE TO USE THE GLOBAL PROMISE LIBRARY
mongoose.Promise = global.Promise;

// GET THE DEFAULT CONNECTION
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MONGODB CONNECTION ERROR:'));

// EXAMPLE OF MODEL
// const Producto = mongoose.model('productest', {name: String});
// const p1 = new Producto({name:"Cebollas Caramelizadas"});
// p1.save().then(() => console.log('Registro Guardado'));

app.use(express.static(path.join(__dirname, '/client/build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})
app.get('/api/productos', (req, res) => {
    const products = GetProductos();
    res.json(products);
});

app.listen(
    port,
    () => console.log(`Server started on port ${port}`)
);

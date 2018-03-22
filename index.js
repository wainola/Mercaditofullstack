const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router');

// Controllers
const GetProductos = require('./controllers/products');

const app = express();
// LOGING LIBRARY
app.use(morgan('combined'));
// PARSING ALL THE INCOMING REQ AS JSON
app.use(bodyParser.json({type: '*/*'}));

router(app);


const port = process.env.PORT || 4500;

// DB CONNECTION
const mongoDB = 'mongodb://localhost:27017/larmahue_market';

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

const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on port ${port}`);
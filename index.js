const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router');
const cors = require('cors');
const fs = require('fs');
const fileUpload = require('express-fileupload');

// Controllers
const GetProductos = require('./controllers/products');

const app = express();
// LOGING LIBRARY
app.use(morgan('combined'));
// PARSING ALL THE INCOMING REQ AS JSON
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

router(app);

const port = process.env.PORT || 4500;

// DB CONNECTION
const mongoDB = 'mongodb://localhost:27017/larmahue_market';

mongoose.connect(mongoDB);

// GET MONGOOSE TO USE THE GLOBAL PROMISE LIBRARY
mongoose.Promise = global.Promise;

// GET THE DEFAULT CONNECTION
const db = mongoose.connection;

db.once('open', function(){
    console.log('conected to mongoDB');
});

db.on('error', function(err){
    console.log(err);
});

// EXAMPLE OF MODEL
// const Producto = mongoose.model('productest', {name: String});
// const p1 = new Producto({name:"Cebollas Caramelizadas"});
// p1.save().then(() => console.log('Registro Guardado'));

app.use(express.static(path.join(__dirname, '/client/build')));
// app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/productos', (req, res) => {
    const products = GetProductos();
    res.json(products);
});

app.post('/upload', (req, res, next) => {
    console.log(req.files);
    res.send({msg: 'file uploaded'});
});

const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on port ${port}`);
const express = require('express');
const path = require('path');

// Controllers
const GetProductos = require('./controllers/products');

const app = express();

const port = 4500;

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

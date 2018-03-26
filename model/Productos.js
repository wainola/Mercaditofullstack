const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// PRODUCT SCHEMA
const productSchema = new Schema({
    nombre: {type:String, lowercase:true},
    urlImagen: {type:String, lowercase:true},
    descripcion: {type:String},
    stock: {type:Number, required:true},
    precio: {type:Number, required:true},
    tipo: {type:String, lowercase:true}
});

const ModelClassProducto = mongoose.model('producto', productSchema);
module.exports = ModelClassProducto;
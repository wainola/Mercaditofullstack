const Producto = require('../model/Producto');
exports.getAllProducts = function(req, res, next){
    res.send({products: 'todos los productos'});
}

exports.saveProduct = function(req, res, next){
    const nombre = req.body.nombre;
    const urlImagen = req.body.urlImagen;
    const descripcion = req.body.descripcion;
    const stock = req.body.stock;
    const precio = req.body.precio;
    const tipo = req.body.tipo;

    res.json({data: req.body});
    //console.log(req.body);
    // SEARCHING IF THE PRODUCT ALREADY EXISTS
    // Producto.findOne({nombre:nombre}, function(err, existingProduct){
    //     if(err) { return next(err); }
    //     if(existingProduct){
    //         return res.status(422).send({error: 'Producto ya existe'});
    //     }
    //     const producto = new Producto({
    //         nombre: nombre,
    //         urlImagen: urlImagen,
    //         descripcion: descripcion,
    //         stock: stock,
    //         precio: precio,
    //         tipo: tipo
    //     });

    //     producto.save(function(err){
    //         if(err){
    //             return next(err);
    //         }
    //         res.json({saved: 'guardado con exito!'});
    //     });
    // });
}
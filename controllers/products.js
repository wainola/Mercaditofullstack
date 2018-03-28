const Producto = require('../model/Producto');

exports.getAllProducts = function(req, res, next){
    res.send({products: 'todos los productos'});
}

exports.saveProduct = function(req, res, next){
    // PARSING DATA TO SAVE TO THE DATABASE
    let data = JSON.parse(req.body.datos);
    const nombre = data.nombre;
    const descripcion = data.descripcion;
    const stock = data.stock;
    const precio = data.precio;
    const tipo = data.tipo;
    // IMAGE FILE TO SAVE ON PUBLIC DIRECTORY
    let fileImage = req.files.file;

    // console.log(fileImage);
    // console.log(JSON.parse(req.body.datos));
    // console.log(`precio es ${precio}`);

    // //SEARCHING IF THE PRODUCT ALREADY EXISTS
    Producto.findOne({nombre:nombre}, function(err, existingProduct){
        if(err) { return next(err); }
        if(existingProduct){
            return res.status(422).send({error: 'Producto ya existe'});
        }
        const producto = new Producto({
            nombre: nombre,
            urlImagen: `public/${fileImage.name}`,
            descripcion: descripcion,
            stock: stock,
            precio: precio,
            tipo: tipo
        });

        producto.save(function(err){
            if(err){
                return next(err);
            }
            // PROCESSING IMAGE FILE, MOVING TO THE PUBLIC DIRECTORY
            fileImage.mv(`public/${fileImage.name}`, function (err) {
                console.log("Entre MV function");
                if (err) {
                    console.log("Error");
                    return res.status(500).send(err);
                }
            });
            res.json({ saved: 'guardado con exito!', file: `public/${fileImage.name}`});
        });
    });
}
const Producto = require('../model/Producto');
const fs = require('fs');
const db = require('../db');

exports.getAllProducts = function(req, res, next){
    const productos = Producto.find({}, function(err, productos){
        if(err){ return next(err); }
        res.send(productos);
    });

}

exports.saveProduct = function(req, res, next){
    // PARSING DATA TO SAVE TO THE DATABASE
    let data = JSON.parse(req.body.datos);
    const nombre = data.nombre.toLowerCase();
    const descripcion = data.descripcion.toLowerCase();
    const stock = data.stock;
    const precio = data.precio;
    const tipo = data.tipo.toLowerCase();
    // IMAGE FILE TO SAVE ON PUBLIC DIRECTORY
    let fileImage = req.files.file;
    let urlCatalogo = 'client/public/catalogo_imagenes/';

    console.log(req.files.file.name);

    // SETTING THE OBJECT THAT SAVES TO THE MYSQL DATABASE
    let producto_mysql = {
        nombre_producto: nombre,
        cantidad: stock,
        precio: precio,
        tipo: tipo,
        descripcion: descripcion
    };

    console.log('PRODUCTO A ENVIAR A MYSQL => ', producto_mysql);

    db.query('INSERT INTO INVENTARIO SET ?', producto_mysql, (err, resultado) => {
        if(err) {
            console.log('error en la insercion en mysql');
            console.log(err);
            return
        }
        console.log('datos insertados correctamente en mysql');
    });

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
            urlImagen: `/catalogo_imagenes/${fileImage.name}`,
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
            // CHECKING IF THE IMAGE ALREADY EXISTS

            /*
            ACTUALMENTE SI LA IMAGEN EXISTE, ENVIA ESTE MENSAJE PERO PERSISTE EN GUARDAR EL ARCHIVO CON LA MISMA IMAGEN.
            BUSCAR UNA SOLUCION MAS MODULAR QUE ANTE LA CARGA DE UNA IMAGEN SIMILAR SIMPLEMENTE GENERE UNA NUEVA IMAGEN 
            Y LA GUARDE, AUNQUE QUIZAS ESTA TAMPOCO SEA LA SOLUCION MAS EFICIENTE
            */
            let exists = fs.existsSync(`${urlCatalogo}/${fileImage.name}`);
            if(!exists){
                fileImage.mv(`${urlCatalogo}${fileImage.name}`, function (err) {
                    console.log("Entre MV function");
                    if (err) {
                        console.log("Error");
                        return res.status(500).send(err);
                    }
                    res.json({ saved: 'guardado con exito!', file: `${urlCatalogo}${fileImage.name}` });
                });
            }
            else{
                res.json({msg: 'el archivo ya existe, sobreescribirlo?'});
            }
        });
    });

}
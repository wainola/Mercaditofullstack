const Producto = require('../model/Producto');
const fs = require('fs');
const db = require('../db');
const dbPromise = require('../db_promise');
const config = require('../config/config_db');

const DB_CONFIG = {
    host: 'localhost',
    user: config.username,
    password: config.password,
    database: 'mercadito_de_larmahue'
};

const DB_PRO = new dbPromise(DB_CONFIG);

exports.getAllProducts = function(req, res, next){
    const productos = Producto.find({}, function(err, productos){
        if(err){ return next(err); }
        res.send(productos);
    });

}

exports.saveProduct = function(req, res, next){
    // PARSING DATA TO SAVE TO THE DATABASE
    let data = JSON.parse(req.body.datos);
    // const nombre = data.nombre.toLowerCase();
    // const descripcion = data.descripcion.toLowerCase();
    // const stock = data.stock;
    // const precio = data.precio;
    // const tipo = data.tipo.toLowerCase();
    const categoria = data.categoria.toLowerCase();
    // IMAGE FILE TO SAVE ON PUBLIC DIRECTORY
    // let fileImage = req.files.file;
    // let urlCatalogo = 'client/public/catalogo_imagenes/';

    // console.log(req.files.file.name);

    console.log(DB_CONFIG);

    console.log(data.categoria);
    console.log(categoria);

    // DB_PRO.query('SELECT * FROM INVENTARIO')
    // .then(rows => {
    //     console.log(rows);
    // });

    DB_PRO.query(`INSERT INTO CATEGORIAS (NOMBRE_CATEGORIA) VALUES ('${categoria}');`)
    .then(resultado => {
        console.log('exito en la insercion en categorias');
        //console.log(resultado);
        let id_insertado = resultado.insertId;
        console.log(`el id insertado es ${id_insertado}`);
        

    })
    .catch(err => {
        console.log('error en la insercion');
        console.log(err);
    });

    // MAKING INSERTION ON FILA CATEGORIAS
    // db.query(`INSERT INTO CATEGORIAS (NOMBRE_CATEGORIA) VALUES ('${categoria}');`, (err, resultado) => {
    //     if (err) {
    //         console.log('error en la insercion de categoria');
    //         console.log(err);
    //     }
    //     console.log('exito en la insercion de categoria');
    //     console.log(resultado);
    // });

    // let id_cat = db.query('SELECT ID_CATEGORIAS AS ID FROM CATEGORIAS ORDER BY ID_CATEGORIAS DESC LIMIT 1', (err, resultado) => {
    //     if (err){
    //         console.log('error en la obtencion del id de la categoria');
    //         console.log(err);
    //     }
    //     console.log(`el id obtenido de la categoria es: ${JSON.stringify(resultado)}`);
    //     return resultado.id;
    // });
    // console.log('id categoria obtenido es');
    // console.log(id_cat);

    // SETTING THE OBJECT THAT SAVES TO THE MYSQL DATABASE
    // let producto_mysql = {
    //     nombre_producto: nombre,
    //     cantidad: stock,
    //     precio: precio,
    //     tipo: tipo,
    //     descripcion: descripcion,
    //     id_categoria: null
    // };

    //console.log('PRODUCTO A ENVIAR A MYSQL => ', producto_mysql);

    // db.query('INSERT INTO INVENTARIO SET ?', producto_mysql, (err, resultado) => {
    //     if(err) {
    //         console.log('error en la insercion en mysql');
    //         console.log(err);
    //         return
    //     }
    //     console.log('datos insertados correctamente en mysql');
    // });

    // // console.log(fileImage);
    // // console.log(JSON.parse(req.body.datos));
    // // console.log(`precio es ${precio}`);

    // // //SEARCHING IF THE PRODUCT ALREADY EXISTS
    // Producto.findOne({nombre:nombre}, function(err, existingProduct){
    //     if(err) { return next(err); }
    //     if(existingProduct){
    //         return res.status(422).send({error: 'Producto ya existe'});
    //     }
    //     const producto = new Producto({
    //         nombre: nombre,
    //         urlImagen: `/catalogo_imagenes/${fileImage.name}`,
    //         descripcion: descripcion,
    //         stock: stock,
    //         precio: precio,
    //         tipo: tipo
    //     });

    //     producto.save(function(err){
    //         if(err){
    //             return next(err);
    //         }
    //         // PROCESSING IMAGE FILE, MOVING TO THE PUBLIC DIRECTORY
    //         // CHECKING IF THE IMAGE ALREADY EXISTS

    //         /*
    //         ACTUALMENTE SI LA IMAGEN EXISTE, ENVIA ESTE MENSAJE PERO PERSISTE EN GUARDAR EL ARCHIVO CON LA MISMA IMAGEN.
    //         BUSCAR UNA SOLUCION MAS MODULAR QUE ANTE LA CARGA DE UNA IMAGEN SIMILAR SIMPLEMENTE GENERE UNA NUEVA IMAGEN 
    //         Y LA GUARDE, AUNQUE QUIZAS ESTA TAMPOCO SEA LA SOLUCION MAS EFICIENTE
    //         */
    //         let exists = fs.existsSync(`${urlCatalogo}/${fileImage.name}`);
    //         if(!exists){
    //             fileImage.mv(`${urlCatalogo}${fileImage.name}`, function (err) {
    //                 console.log("Entre MV function");
    //                 if (err) {
    //                     console.log("Error");
    //                     return res.status(500).send(err);
    //                 }
    //                 res.json({ saved: 'guardado con exito!', file: `${urlCatalogo}${fileImage.name}` });
    //             });
    //         }
    //         else{
    //             res.json({msg: 'el archivo ya existe, sobreescribirlo?'});
    //         }
    //     });
    // });

}
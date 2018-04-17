const nodemailer = require('nodemailer');
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

exports.recieveOrder = function(req, res, next){
    //res.json({msg: 'orden recibida!'});
    console.log(req.body);
    fs.readFile('./config/config.json', function(err, data) {
        if(err){ res.json({error: 'error al abrir el archivo'}); }
        data = JSON.parse(data);
        let stmpConfig = {
            service: 'gmail',
            auth: {
                user: data.user,
                pass: data.pass
            }
        }
        let nameFormat = req.body.nombre.split(' ');
        let nombre = nameFormat[0].toLowerCase();
        let apellidos = `${nameFormat.length > 2 ? `${nameFormat[1].toLowerCase()} ${nameFormat[2].toLowerCase()}` : nameFormat[1].toLowerCase() }`;
        let email = req.body.email.toLowerCase();
        let direccion = req.body.direccion.toLowerCase();
        let carro_de_compra = req.body.carro_de_compra;

        console.log('PROCEDIMIENTO EXISTS_CLIENTE');
        // PROCEDURE CALL_EXISTS_CLIENTE => CHECK IF CLIENT EXISTS

        let flag = false;

        DB_PRO.query(`call exists_cliente('${nombre}', '${apellidos}', '${email}', '${direccion}', @exito);`)
        .then(resultado => {
            console.log('PROCEDIMIENTO EXIST SCLIENTE EJECUTADO EXISTOSAMENTE');

            console.log('PROCEDIMIENTO INSERT_PRODUCTO_ORDEN A EJECUTAR');

            carro_de_compra.forEach((e) => {

                return DB_PRO.query(`call insert_producto_orden('${e.cantidad}','${e.cantidad * e.precio}', (select id_orden from orden order by id_orden desc limit 1), '${e.nombre_producto.toLowerCase()}', @success);`)
                .then(resultado => {
                    console.log('PROCEDIMIENTO INSERT_PRODUCTO_ORDEN EJECUTADO EXITOSAMENTE');
                })
                .catch(err => {
                    console.log('ERROR EN EL PROCEDIMIENTO INSERT_PRODUCTO_ORDEN');
                    console.log(err);
                });
            });
            console.log('PROCEDIMIENTO INSERT_VENTA A EJECUTAR');
            return DB_PRO.query(`call insert_venta((select id_orden from orden order by id_orden desc limit 1))`)
                .then(resultado => {
                    console.log('PROCEDIMIENTO INSERT_VENTA EJECUTADO EXITOSAMENTE');
                    flag = true;
                })
                .catch(err => {
                    console.log('ERROR EN EL PROCEDIMIENTO INSERT_VENTA');
                    console.log(err);
                });
            
        })
        .catch(err => {
            console.log('ERROR EN EL PROCEDIMIENTO EXISTS CLIENTE');
            console.log(err);
        });

        let mensaje_inserciones = 'procedimientos ejecutados correctamente';
        
        //let orden = req.body.carro_de_compra;

        let transporter = nodemailer.createTransport(stmpConfig);
        let mailOptions = {
            from: 'Mercadito de Larmahue <mercaditodelarmahue@gmail.com',
            to: `${email}`,
            subject: 'Su pedido de productos fue enviado con exito!',
            text: `Sus productos comprados son: \n${carro_de_compra.map(item => `item: ${item.nombre_producto} | Cantidad: ${JSON.stringify(item.cantidad)}\nValor a pagar: ${JSON.stringify(item.valor_a_pagar)}\n`)}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) { res.json({ error: 'no enviado' }); }
            console.log('Exito en el envio del correo');
            res.send({ data_recibida: req.body, success: true, msg_procedimientos: mensaje_inserciones});
        });
    });
}

exports.OrdersOfTheWeek = function(req, res, next){
    DB_PRO.query(`select
                c.id_cliente, concat(c.nombre, ' ', c.apellido) as 'nombre_cliente', c.email, c.direccion_cliente,
                date_format(hist.fecha_orden, '%d/%m/%y %h:%i:%s') as 'fecha_orden',
                li.nombre as 'nombre_producto',
                po.cantidad_llevada, po.monto 
                from cliente c
                join orden o on c.id_cliente = o.id_cliente
                join historial_ordenes hist on o.id_historial_orden = hist.id_historial
                join producto_orden po on o.id_orden = po.id_orden
                join producto prod on po.id_producto = prod.producto_id
                join listado_productos li on prod.listado_producto_id = li.listado_producto_id;`)
    .then(resultado => {
        let r = resultado.map(item => {
            return {id_cliente: item.id_cliente, nombre: item.nombre_cliente, email: item.email, direccion: item.direccion_cliente, fecha_orden: item.fecha_orden, producto_pedido: item.nombre_producto, cantidad: item.cantidad_llevada, monto: item.monto }
        });
        // QUERY FOR THE PURCHASE TOTAL AMOUNT
        return DB_PRO.query(`select
                            concat(c.nombre, ' ', c.apellido) as 'cliente',
                            monto_venta as 'monto'
                            from venta
                            join orden o on venta.id_orden = o.id_orden
                            join cliente c on c.id_cliente = o.id_cliente;`)
        .then(resultado => {
            let r2 = resultado.map(item => {
                return { cliente: item.cliente, monto: item.monto }
            });
            res.json({ data: r, montos: r2 });
        })
        .catch(err => {
            res.json({error: err});
        })
    })
    .catch(err => {
        res.json({error: err});
    });
}

exports.dummyOrder = function(req, res, next){
    db.query('SELECT * FROM CLIENTE', (err, r) => {
        if(err) { res.json({err: err}); }
        res.json({data: r});
    });
    //res.json({msg: 'Dummy Cliente'});
}
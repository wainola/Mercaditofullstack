const nodemailer = require('nodemailer');
const fs = require('fs');
const db = require('../db');

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
        let nombre = nameFormat[0];
        let apellidos = `${nameFormat.length > 2 ? `${nameFormat[1]} ${nameFormat[2]}` : nameFormat[1] }`;
        console.log('name format', nameFormat);
        // FOR INSERTING THE ORDEN I NEED THE ID OF THE INSERTED CLIENT.
        let insertIdCliente = null;
        let last_insert_id = null;

        // CLIENTE AND ORDER HISTORY INSERTION
        db.query('INSERT INTO HISTORIAL_ORDENES () VALUES ()', {}, (err, resultado) => {
            if(err){
                console.log('error insercion en historial ordenes', err);
                return;
            }
            last_insert_id = resultado.insertId;
            console.log('las id insertado', resultado.insertId);
            console.log('insertado en historial ordenes con exito');
            const cliente = {
                id_historial_orden: last_insert_id,
                nombre: nombre,
                apellido: apellidos,
                email: req.body.email,
                direccion_cliente: req.body.direccion
            };
            db.query('INSERT INTO CLIENTE SET ?', cliente, (err, resultado) => {
                if (err) {
                    console.log(err);
                    return;
                }
                insertIdCliente = resultado.insertId;
                console.log('datos insertados exitosamente')
                console.log('Id insertado del cliente es', insertIdCliente);
            });
        });
        
        let orden = req.body.carro_de_compra;

        // let transporter = nodemailer.createTransport(stmpConfig);
        // let mailOptions = {
        //     from: 'Mercadito de Larmahue <mercaditodelarmahue@gmail.com',
        //     to: 'nrriquelme@gmail.com',
        //     subject: 'Enviando correos desde Node.js',
        //     text: 'Correos desde el Backend'
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) { res.json({ error: 'no enviado' }); }
        //     console.log('Exito en el envio del correo');
        //     res.send({ data_recibida: req.body, success: true });
        // });
    });
}

exports.dummyOrder = function(req, res, next){
    db.query('SELECT * FROM CLIENTE', (err, r) => {
        if(err) { res.json({err: err}); }
        res.json({data: r});
    });
    //res.json({msg: 'Dummy Cliente'});
}
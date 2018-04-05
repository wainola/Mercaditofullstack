const nodemailer = require('nodemailer');
const fs = require('fs');
const db = require('../db');

exports.recieveOrder = function(req, res, next){
    //res.json({msg: 'orden recibida!'});
    console.log(req.body);
    // fs.readFile('./config/config.json', function(err, data) {
    //     if(err){ res.json({error: 'error al abrir el archivo'}); }
    //     data = JSON.parse(data);
    //     let stmpConfig = {
    //         service: 'gmail',
    //         auth: {
    //             user: data.user,
    //             pass: data.pass
    //         }
    //     }

    //     let transporter = nodemailer.createTransport(stmpConfig);
    //     let mailOptions = {
    //         from: 'Mercadito de Larmahue <mercaditodelarmahue@gmail.com',
    //         to: 'nrriquelme@gmail.com',
    //         subject: 'Enviando correos desde Node.js',
    //         text: 'Correos desde el Backend'
    //     };

    //     transporter.sendMail(mailOptions, function (error, info) {
    //         if (error) { res.json({ error: 'no enviado' }); }
    //         console.log('Exito en el envio del correo');
    //         res.send({ msg: 'exito en el envio del correo' });
    //     });
    // });
    res.send({ data_recibida: req.body, success: true });
}

exports.dummyOrder = function(req, res, next){
    db.query('SELECT * FROM CLIENTE', (err, r) => {
        if(err) { res.json({err: err}); }
        res.json({data: r});
    });
    //res.json({msg: 'Dummy Cliente'});
}
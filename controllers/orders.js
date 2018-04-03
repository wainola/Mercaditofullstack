const nodemailer = require('nodemailer');
const fs = require('fs');

exports.recieveOrder = function(req, res, next){
    //res.json({msg: 'orden recibida!'});
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

        let transporter = nodemailer.createTransport(stmpConfig);
        let mailOptions = {
            from: 'Mercadito de Larmahue <mercaditodelarmahue@gmail.com',
            to: 'nrriquelme@gmail.com',
            subject: 'Enviando correos desde Node.js',
            text: 'Correos desde el Backend'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) { res.json({ error: 'no enviado' }); }
            console.log('Exito en el envio del correo');
            res.send({ msg: 'exito en el envio del correo' });
        });
    });
}
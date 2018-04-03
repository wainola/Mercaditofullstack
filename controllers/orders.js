const nodemailer = require('nodemailer');

exports.recieveOrder = function(req, res, next){
    //res.json({msg: 'orden recibida!'});
    let stmpConfig = {
        service: 'gmail',
        auth: {
            user: 'nicolasriquelmeguzman@gmail.com',
            pass: 'sqrt(-2)notReal!=sqrt(2)==Real'
        }
    }

    let transporter = nodemailer.createTransport(stmpConfig);
    let mailOptions = {
        from: 'Mercadito de Larmahue <mercaditodelarmahue@gmail.com',
        to: 'olmue2@gmail.com',
        subject: 'Enviando correos desde Node.js',
        text: 'Hola mama, este es un correo que se envia desde el mismo servidor del software para probar el envio de correos. Ahora voy a juntarlo con el procesamiento de las ordenes!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){ res.json({error: 'no enviado'});}
        console.log('Exito en el envio del correo');
        res.send({msg: 'exito en el envio del correo'});
    });
}
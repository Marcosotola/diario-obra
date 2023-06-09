const nodemailer = require('nodemailer');

const enviarContacto = async (req, res) => {
    const { nombre, email, mensaje } = req.body;

    // Validar campos
    if (!nombre || !email || !mensaje) {
        return res.render('formulario', { error: 'Todos los campos son obligatorios' });
    }

    // Configurar transportador SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'shana.kuhn22@ethereal.email',
            pass: '1G9fAhDg4Xjrsz2Ctt'
        }
    });

    // Configurar correo electrónico
    const mailOptions = {
        from: email,
        to: 'marcosotola@gmail.com',
        subject: 'Formulario de contacto',
        text: `
        Nombre: ${nombre}\n
        Email:${email}\n 
        Mensaje:${mensaje}`
    };

    try {
        // Enviar correo electrónico
        await transporter.sendMail(mailOptions);
        res.render('confirmacion', {
            nombre: req.body.nombre
        });
    } catch (error) {
        console.log(error);
        res.render('formulario', { error: 'Error al enviar mensaje' });
    }
};

module.exports = {
    enviarContacto
};

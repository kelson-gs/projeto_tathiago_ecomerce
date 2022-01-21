const nodemailer = require('nodemailer');
const { host, port, user } = require('../config/mail.json');

const Transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: user,
        clientId: 'clienteId',
        clientSecret: 'clientSecret',
        refreshToken: 'refreshToken',
        accessToken: 'accessToken',
    },
    tls: {
        rejectUnauthorized: false
    }
});


module.exports = Transporter;
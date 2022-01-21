const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const { Transporter } = require('../mailer/mailer');
const User = require('../models/user');
const router = express.Router();

const saveCode = [];
const texte = 'sec';

function gerarCodigo(){
    const salRounds = 5
    bcrypt.hash( texte, salRounds, (err, hash) => {
        try {
            console.log(hash);
            saveCode.push(hash);
        } catch {
            console.log(err);
        }
    })   
};


//enviar email
router.post('/gerarcode', (req, res) => {
    gerarCodigo();

    const { email } = req.body;

    Transporter.sendMail({
        from: '"tathiago Digital" <tathiagoadm@gmail.com>',
        to: `<${email}>`,
        subject: 'Código para reculperação de senha',
        text: `Seu código para reculperação de senha: ${saveCode[0]}`,
        html: `<b>Seu código para reculperação de senha: ${saveCode[0]}</b>`
    }, (error, response) => {
        error ? console.log(error) : console.log(response);
    });
});


// verififcando o código
router.post('/verificandoCode', (req, res) => {
    const { code } = req.body;

    bcrypt.compare(texte, code, (err, result) => {
        try {
            console.log('comparação confirmada: ' + result);
        } catch {
            console.log('algo errado: ' + err);
        }
    })

    res.redirect('http://localhost:3000/altsenha');
    saveCode.pop()
});


// alterando senha
router.put('/altpass', (req, res, next) => {
    const {newPassword, email} = req.body;

    bcrypt.hash(newPassword, 10, (err, hash) => {
        try {
            newPassword = hash;
        } catch {
            console.log(err);
        }
    });

    User.update({
        password: newPassword
    }, {
        where: {
            email: email
        }
    }).then(() => console.log('Password Update !!'))
    .catch(next);

    res.redirect('http:localhost:3000/');
});

module.exports = app => app.use('/recpass', router);
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const authConfig = require('../config/auth.json');
const Transporter = require('../mailer/mailer');



// gerando token
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

// express rotas

router.post('/register', async (req, res)=>{
    try {
        const { email, name, password, birth_year } = req.body;

        if(!await User.findOne( { where: { email } } )) {


            await User.create({
                name: name,
                email: email,
                password: password,
                birth_year: birth_year
            });

            Transporter.sendMail({
                from: '"tathiago Digital" <tathiagoadm@gmail.com>',
                to: `<${email}>`,
                subject: 'Cadstro confirmado',
                text: 'Seu cadastro na Tathiago Digital foi efetuado com sucesso. Boas compras!!',
                html: '<b>Seu cadastro na Tathiago Digital foi efetuado com sucesso. Boas compras!!</b>'
            }, (error, response) => {
                error ? console.log(error) : console.log(response);
            });
            
        } else {
            res.status(400).send('Usuário existente!!');
        }

        res.send({
            name,
            password
        });

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Não pôde ser registrado o usuário!' });
    }

});


router.post('/authenticate', async (req, res) => {
    try {
        const { email, password } = req.body;
        
    
        const user = await User.findOne({ where: {
            email: email,
        } });
    
        if( user === null) {
            console.log('Não existe usuario')
            return res.status(400).send({ error: 'User not found!' });
        } else {
            const hash_password = user.password;
    
            if(!await bcrypt.compare(password, hash_password)){
                console.log('não existe para comparar!')
                return res.status(400).send({ error: 'Invalid password' });
            }  
            
        }

        user.password = undefined;
        
        return res.send({
            id: user.id,
            email,
            token: generateToken({ id: user.id })
        });
        
    } catch (err) {
        console.log('erro aqui pvt: '+ err);
        console.log(req.body);
    }
        
});

router.get('/allusuarios', (req, res) => {
    User.findAll().then( (usuarios) => {
        console.log(usuarios)
        res.send({allusuarios: usuarios});
    }).catch(err => console.log(err));
});

router.get('/anlyusuario/:id', (req, res) => {
    const { id } = req.params;
    console.log('nome params: ', id);
    User.findOne({
        where: {
            id: id
        }
    }).then( (user) => {
        console.log('id params',user);
        res.send({onlyusuario: user})
    } ).catch( (err) => console.log(err) );
});



module.exports = app => app.use('/auth', router);
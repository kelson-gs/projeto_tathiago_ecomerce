const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('../models/user');

router.get('/findUser/:elemento', async (req, res) => {
    try {
        const { email } = req.params;

        await User.findOne({ 
            where: { 
                email: email 
            } 
        }).then( (usuario) => {
            console.log(usuario);
            res.send({usuario: usuario});
        })
    } catch (err) {
        res.status(400).send('Usuário não encontrado')
    }
})

router.delete('/deleteUser/:id', (req, res) => {
    const { id } = req.params;
    User.findByPk(id).then((el) => {
        User.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('Usuário deletado!');
        res.send('Usuário deletado!!');
    }).catch(err => console.log(err));

});

router.put('/putPasswordUser/:id' , (req, res, next) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    User.update({
        password: newPassword
    }, {
        where: {
            id: id
        }
    }).then(() => console.log('Password Update !!'))
    .catch(next);
} );

module.exports = app => app.use('/user', router);
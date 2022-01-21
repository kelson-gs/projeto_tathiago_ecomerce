const express = require('express');
const path = require('path');
const router = express.Router();

const Transacao = require('../models/transacao');

router.post('/createTransacao', async (req, res) => {
    try {
        const { nome, id_externo, 
            email, cidade, 
            tipo, item, 
            quantidade, telefone, valor
        } = req.body;

        if(!await Transacao.findOne({ where: { nome } })) {
           await Transacao.create({
               nome: nome,
               id_externo: id_externo,
               email: email,
               cidade: cidade,
               tipo: tipo,
               item: item,
               quantidade: quantidade,
               telefone: telefone,
               valor: valor
           }); 
           
        } else {
            res.status(400).send('Produto existente!');;

        }

        res.send(
           'Transação adicionada no banco!!'
         );

    } catch ( err ) {
        console.log(err);
        res.status(400).send('Transação não pode ser adicionada no banco!!');
    }
});

router.get('/Alltransacao', (req, res) => {
    Transacao.findAll().then( (items) => {
        console.log(items)
        res.send({alltransacao: items});
    }).catch(err => console.log(err));
});

router.get('/onlytransacao/:nome', (req, res) => {
    const nome = req.params;

    Transacao.findOne({
        where: {
            nome: nome
        }
    }).then( (item) => {
        console.log(item);
        res.send({onlytransacao: item})
    } ).catch( (err) => console.log(err) );
});

module.exports = app => app.use('/transacaoDb', router);
const express = require('express');
const path = require('path');
const router = express.Router();


const Antena = require('../models/antena');
const Bateria = require('../models/bateria');
const Cabo = require('../models/cabo');
const Caixasom = require('../models/caixasom');
const Carregador = require('../models/carregador');
const Controle = require('../models/controle');
const Conversor = require('../models/conversor');
const Extensao = require('../models/extensao');
const Fone = require('../models/fone');
const Fonte = require('../models/fonte');
const Pilha = require('../models/pilha');
const Promocao = require('../models/promocao');
const ProdutoHome = require('../models/produtohome');
const Receptor = require('../models/receptor');
const Roteador = require('../models/roteador');
const Transformador = require('../models/transformador');


// post 
router.post('/produto/antenas',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, 
            quantidade, avista, cartao 
        } = req.body;

        if(!await Antena.findOne({ where: { nome } })) {
           await Antena.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao
           }); 
           
        } else {
            res.status(400).send('Produto existente!');;

        }

        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });

    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

router.post('/produto/baterias',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, 
            quantidade, avista, cartao 
        } = req.body;

        if(!await Bateria.findOne({ where: { nome } })) {
           await Bateria.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao
           }); 
        } else {
            res.status(400).send('Produto existente!');;

        }

        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });

    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

router.post('/produto/cabos',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, 
            quantidade, avista, cartao 
        } = req.body;

        if(!await Cabo.findOne({ where: { nome } })) {
           await Cabo.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao
           }); 
        } else {
            res.status(400).send('Produto existente!');;

           
        }

        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });

    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

router.post('/produto/caixas_de_som',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, 
            quantidade, avista, cartao 
        } = req.body;

        if(!await Caixasom.findOne({ where: { nome } })) {
           await Caixasom.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao
           }); 
        } else {
            res.status(400).send('Produto existente!');;

        
        }

        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });

    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

router.post('/produto/carregadores',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, 
            quantidade, avista, cartao 
        } = req.body;

        if(!await Carregador.findOne({ where: { nome } })) {
           await Carregador.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao
           }); 
        } else {
            res.status(400).send('Produto existente!');;

           
        }

        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });

    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

router.post('/produto/controles',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, 
            quantidade, avista, cartao 
        } = req.body;

        if(!await Controle.findOne({ where: { nome } })) {
           await Controle.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao
           }); 
        } else {
            res.status(400).send('Produto existente!');;

           
        }

        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });

    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

router.post('/produto/conversores',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, 
            quantidade, avista, cartao 
        } = req.body;

        if(!await Conversor.findOne({ where: { nome } })) {
           await Conversor.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao
           }); 
        } else {
            res.status(400).send('Produto existente!');;

        }

        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });


    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

router.post('/produto/extensoes',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, 
            quantidade, avista, cartao 
        } = req.body;

        if(!await Extensao.findOne({ where: { nome } })) {
           await Extensao.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao
           }); 
        } else {
            res.status(400).send('Produto existente!');;

        }

        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });


    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

router.post('/produto/fontes',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, 
            quantidade, avista, cartao 
        } = req.body;

        if(!await Fonte.findOne({ where: { nome } })) {
           await Fonte.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao
           }); 
        } else {
            res.status(400).send('Produto existente!');;

           
        }

        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });

    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

router.post('/produto/fones',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, 
            quantidade, avista, cartao 
        } = req.body;

        if(!await Fone.findOne({ where: { nome } })) {
           await Fone.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao
           }); 
        } else {
            res.status(400).send('Produto existente!');;

           
        }

        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });

    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

router.post('/produto/pilhas',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, 
            quantidade, avista, cartao 
        } = req.body;

        if(!await Pilha.findOne({ where: { nome } })) {
           await Pilha.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao
           }); 
        } else {
            res.status(400).send('Produto existente!');;

        }

        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });


    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

router.post('/produto/receptores',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, 
            quantidade, avista, cartao 
        } = req.body;

        if(!await Receptor.findOne({ where: { nome } })) {
           await Receptor.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao
           }); 
        } else {
            res.status(400).send('Produto existente!');;

           
        }

        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });

    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

router.post('/produto/roteadores',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, 
            quantidade, avista, cartao 
        } = req.body;

        if(!await Roteador.findOne({ where: { nome } })) {
           await Roteador.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao
           }); 
        } else {
            res.status(400).send('Produto existente!');;

        }
        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });

    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

router.post('/produto/transformadores',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, 
            quantidade, avista, cartao 
        } = req.body;

        if(!await Transformador.findOne({ where: { nome } })) {
           await Transformador.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao
           }); 
        } else {
            res.status(400).send('Produto existente!');;

          
        }

        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });

    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

router.post('/produto/promocao',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, 
            quantidade, avista, cartao 
        } = req.body;

        if(!await Promocao.findOne({ where: { nome } })) {
           await Promocao.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao
           }); 
        } else {
            res.status(400).send('Produto existente!');;

        }

        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });

    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

router.post('/produto/produtohome',  async (req, res) => {
    try {
        const { nome, img, 
            info1, info2, 
            info3, info4, url,
            quantidade, avista, cartao 
        } = req.body;

        if(!await ProdutoHome.findOne({ where: { nome } })) {
           await ProdutoHome.create({
               nome: nome,
               img: img,
               info1: info1,
               info2: info2,
               info3: info3,
               info4: info4,
               quantidade: quantidade,
               avista: avista,
               cartao: cartao,
               url: url
           }); 
        } else {
            res.status(400).send('Produto existente!');;

        }

        res.send({
            nome,
            quantidade,
            avista,
            cartao
         });

    } catch ( err ) {
        console.log(err);
        res.status(400).send('Produto não pôde ser registrado!');
    }
});

module.exports = app => app.use('/private', router);
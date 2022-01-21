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


// atualização e deletação de item Antena
router.get('/antena', (req, res) => {
    Antena.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));
});

router.get('/produtoAntena/:id', (req, res) => {
    const { id } = req.params;
    
    Antena.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.get('/antena/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpAntena/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    Antena.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelAntena/:id', (req, res, next) => {
    const { id } = req.params;
    Antena.findByPk(id).then((el) => {
        Antena.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})



// atualização e deletação de item Bateria
router.get('/bateria', (req, res) => {
    Bateria.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));

});

router.get('/bateria/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.get('/produtoBateria/:id', (req, res) => {
    const { id } = req.params;
    
    Bateria.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpBateria/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    Bateria.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelBateria/:id', (req, res, next) => {
    const { id } = req.params;
    Bateria.findByPk(id).then((el) => {
        Bateria.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})



// atualização e deletação de item Cabo
router.get('/cabo', (req, res) => {
    Cabo.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));
});

router.get('/cabo/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.get('/produtoCabo/:id', (req, res) => {
    const { id } = req.params;
    
    Cabo.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpCabo/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    Cabo.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelCabo/:id', (req, res, next) => {
    const { id } = req.params;
    Cabo.findByPk(id).then((el) => {
        Cabo.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})



// atualização e deletação de item Caixasom
router.get('/caixasom', (req, res) => {
    Caixasom.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));
});

router.get('/caixasom/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.get('/produtoCaixasom/:id', (req, res) => {
    const { id } = req.params;
    
    Caixasom.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpCaixasom/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    Caixasom.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelCaixasom/:id', (req, res, next) => {
    const { id } = req.params;
    Caixasom.findByPk(id).then((el) => {
        Caixasom.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})



// atualização e deletação de item Carregador
router.get('/carregador', (req, res) => {
    Carregador.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));
});

router.get('/carregador/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.get('/produtoCarregador/:id', (req, res) => {
    const { id } = req.params;
    
    Carregador.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpCarregador/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    Carregador.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelCarregador/:id', (req, res, next) => {
    const { id } = req.params;
    Carregador.findByPk(id).then((el) => {
        Carregador.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})



// atualização e deletação de item Controle
router.get('/controle', (req, res) => {
    Controle.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));
});

router.get('/controle/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.get('/produtoControle/:id', (req, res) => {
    const { id } = req.params;
    
    Controle.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpControle/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    Controle.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelControle/:id', (req, res, next) => {
    const { id } = req.params;
    Controle.findByPk(id).then((el) => {
        Controle.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})



// atualização e deletação de item Conversor
router.get('/conversor', (req, res) => {
    Conversor.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));
});

router.get('/conversor/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.get('/produtoConversor/:id', (req, res) => {
    const { id } = req.params;
    
    Conversor.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpConversor/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    Conversor.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelConversor/:id', (req, res, next) => {
    const { id } = req.params;
    Conversor.findByPk(id).then((el) => {
        Conversor.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})



// atualização e deletação de item Extensao
router.get('/extensao', (req, res) => {
    Extensao.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));
});

router.get('/extensao/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});


router.get('/produtoExtensao/:id', (req, res) => {
    const { id } = req.params;
    
    Extensao.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpExtensao/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    Extensao.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelExtensao/:id', (req, res, next) => {
    const { id } = req.params;
    Extensao.findByPk(id).then((el) => {
        Extensao.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})



// atualização e deletação de item Fone
router.get('/fone', (req, res) => {
    Fone.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));
});

router.get('/fone/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.get('/produtoFone/:id', (req, res) => {
    const { id } = req.params;
    
    Fone.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpFone/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    Fone.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelFone/:id', (req, res, next) => {
    const { id } = req.params;
    Fone.findByPk(id).then((el) => {
        Fone.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})



// atualização e deletação de item Fonte
router.get('/fonte', (req, res) => {
    Fonte.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));
});

router.get('/fonte/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.get('/produtoFonte/:id', (req, res) => {
    const { id } = req.params;
    
    Fonte.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpFonte/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    Fonte.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelFonte/:id', (req, res, next) => {
    const { id } = req.params;
    Fonte.findByPk(id).then((el) => {
        Fonte.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})



// atualização e deletação de item Pilha
router.get('/pilha', (req, res) => {
    Pilha.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));
});

router.get('/pilha/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.get('/produtoPilha/:id', (req, res) => {
    const { id } = req.params;
    
    Pilha.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpPilha/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    Pilha.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelPilha/:id', (req, res, next) => {
    const { id } = req.params;
    Pilha.findByPk(id).then((el) => {
        Pilha.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})



// atualização e deletação de item Promoçao
router.get('/promocao', (req, res) => {
    Promocao.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));
});

router.get('/promocao/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.get('/produtoPromocao/:id', (req, res) => {
    const { id } = req.params;
    
    Promocao.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpPromocao/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    Promocao.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelPromocao/:id', (req, res, next) => {
    const { id } = req.params;
    Promocao.findByPk(id).then((el) => {
        Promocao.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})



// atualização e deletação de item Produto Home
router.get('/produtohome', (req, res) => {
    ProdutoHome.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));
});

router.get('/produtohome/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.get('/produtoProdutohome/:id', (req, res) => {
    const { id } = req.params;
    
    ProdutoHome.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpProdutohome/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    ProdutoHome.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelProdutohome/:id', (req, res, next) => {
    const { id } = req.params;
    ProdutoHome.findByPk(id).then((el) => {
        ProdutoHome.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})



// atualização e deletação de item Receptor
router.get('/receptor', (req, res) => {
    Receptor.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));
});

router.get('/receptor/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.get('/produtoReceptor/:id', (req, res) => {
    const { id } = req.params;
    
    Receptor.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpReceptor/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    Receptor.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelReceptor/:id', (req, res, next) => {
    const { id } = req.params;
    Receptor.findByPk(id).then((el) => {
        Receptor.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})



// atualização e deletação de item Roteador
router.get('/roteador', (req, res) => {
    Roteador.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));
});

router.get('/roteador/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.get('/produtoRoteador/:id', (req, res) => {
    const { id } = req.params;
    
    Roteador.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpRoteador/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    Roteador.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelRoteador/:id', (req, res, next) => {
    const { id } = req.params;
    Roteador.findByPk(id).then((el) => {
        Roteador.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})



// atualização e deletação de item Transformador
router.get('/transformador', (req, res) => {
    Transformador.findAll().then( (items) => {
        console.log(items)
        res.send({items: items});
    }).catch(err => console.log(err));
});

router.get('/transformador/:elemento', (req, res) => {
    const { elemento } = req.params;
    console.log(elemento);
    
    Antena.findOne({ where: { nome: elemento } }).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.get('/produtoTransformador/:id', (req, res) => {
    const { id } = req.params;
    
    Transformador.findByPk(id).then( (item) => {
        console.log(item)
        res.send({item: item});
    }).catch(err => console.log(err));
});

router.put('/produtoUpTransformador/:id', (req, res, next) => {
    const {id} = req.params;
    const { newCartao, newAvista, newQuantidade } = req.body;

    Transformador.update({
        cartao: newCartao,
        avista: newAvista,
        quantidade: newQuantidade
    }, {
        where: { 
            id: id
        }
    }).then((rowsUpdate) => {
        console.log(rowsUpdate);
    }).catch(next)
});

router.delete('/produtoDelTransformador/:id', (req, res, next) => {
    const { id } = req.params;
    Transformador.findByPk(id).then((el) => {
        Transformador.destroy({
            where: {
                id: el.id
            }
        })
    }).then(() => {
        console.log('elemento destruido!');
    }).catch(err => console.log(err))
})

module.exports = app => app.use('/item', router);
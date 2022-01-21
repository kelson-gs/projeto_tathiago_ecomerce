const express = require('express');
const router = express.Router();
const Correios = require('node-correios');
const correios = new Correios();

// calcula o preço do frete
router.post('/calcPrecoCorreios', (req, res) => {
    const { kg, cep, servico, comprimento, 
    altura, largura, diametro } = req.body;

    let code = '';

    if(servico === 'sedex'){
        code = '04014';
    } else if(servico === 'pac'){
        code = '04510';
    }

    console.log('kg:', kg);

    correios.calcPreco({
        nCdServico: code,
        sCepOrigem: '47500000',
        sCepDestino: `${cep}`,
        nVlPeso: kg,
        nCdFormato: 1,
        nVlComprimento: comprimento,
        nVlAltura: altura,
        nVlLargura: largura,
        nVlDiametro: diametro
    })
    .then(result => {
        console.log('correios: ', result);
        res.send(result);
    })
    .catch(error => {
        console.log(error);
    });
})


// calcula o preço e o prazo do frete e entrega
router.get('/calcPrecoPrazo', (req, res) => {
    let args = {
        nCdServico: '40010',
        sCepOrigem: '22270010',
        sCepDestino: '89010000',
        nVlPeso: 1,
        nCdFormato: 1,
        nVlComprimento: 27,
        nVlAltura: 8,
        nVlLargura: 10,
        nVlDiametro: 18
    }

    correios.calcPrecoPrazo(args)
    .then( result => {
        console.log(result);
        res.send(result);
    } )
    .catch( error => {
        console.log(error);
    } );
})


// consulta o cep
router.get('consultaCep', (req, res) => {

    let cep = '';

    correios.consultaCEP({ cep: '00000000' })
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    });
})



module.exports = app => app.use('/correios', router);
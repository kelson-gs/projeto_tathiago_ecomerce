const express = require('express');
const router = express.Router();
const pagarme = require('pagarme');
const secret = require('./../config/pagme.json');
const Transporter = require('./../mailer/mailer');

// calculando pagamentos parcelados
router.get('/:preco_cartao/calculate_installments_amount/:num', (req, res) => {
    const { preco_cartao, num } = req.params;

    console.log(num);

    pagarme.client.connect({
        api_key: secret.api_key
    })
    .then( client => client.transactions.calculateInstallmentsAmount({
        max_installments: 12,
        free_installments: num,
        interest_rate: 13,
        amount: preco_cartao
    }) )
    .then( installments => {
        res.send(installments);
        console.log(installments);
    } )
    .catch(err => console.log(err.response));

});

// transações pagarme
    // transação cartao de crédito
    router.post('/transactions', (req, res) => {
        const { card_hash, customer, 
            shipping, billing, valor, 
            installment , item} = req.body;
    
        let payload = {
            "amount": valor,
            "card_hash": card_hash,
            "payment_method": "credit_card",
            "installment": installment,
            "customer": {
                "external_id": `${customer.external_id}`,
                "name": `${customer.name}`,
                "email": `${customer.email}`,
                "country": `${customer.country}`,
                "type": `${customer.type}`,
                "documents": [
                    {
                        "type": `${customer.documents[0].type}`,
                        "number": `${customer.documents[0].number}`
                    }
                ],
                "phone_numbers": [
                    `${customer.phone_numbers}`,
                ],
                "birthday": `${customer.birthday}`
            },
            "billing": {
                "name": `${billing.name}`,
                'address': {
                    "country": `${billing.address.country}`,
                    "state": `${billing.address.state}`,
                    "city": `${billing.address.city}`,
                    "neighborhood": `${billing.address.neighborhood}`,
                    "street": `${billing.address.street}`,
                    "street_number": `${billing.address.street_number}`,
                    "zipcode": `${billing.address.zipcode}`
                }
            },
            "shipping": {
                "name": `${shipping.name}`,
                "fee": shipping.fee,
                "expedited": false,
                "address": {
                    "country": `${shipping.address.country}`,
                    "state": `${shipping.address.state}`,
                    "city": `${shipping.address.city}`,
                    "neighborhood": `${shipping.address.neighborhood}`,
                    "street": `${shipping.address.street}`,
                    'street_number': `${shipping.address.street_number}`,
                    "zipcode": `${shipping.address.zipcode}`
                }
            },
            "items": [
                {
                    "id": `${item.id}`,
                    "title": `${item.title}`,
                    "unit_price": `${item.unit_price}`,
                    "quantity": `${item.quantity}`,
                    "tangible": true
                }
            ]
        }
        
    
        pagarme.client.connect({
            api_key: secret.api_key
        })
        .then( async client => {
           try {
              await client.transactions.create(payload)
              .then( resp => {
                    Transporter.sendMail({
                        from: '"tathiago Digital" <tathiagoadm@gmail.com>',
                        to: `<${email}>`,
                        subject: 'Compra realizada em Tathiago Digital',
                        text: 'Compra realizada em Tathiago Digital!! Você receberá um email com a nota fiscal do produto, e informações de entrega. Agradecemos a preferência.',
                        html: '<p>Compra realizada em Tathiago Digital!!</p> <p> Você receberá um email com a nota fiscal do produto, e informações de entrega.</p> <p>Agradecemos a preferência.</p>'
                    }, (error, response) => {
                        error ? console.log(error) : console.log(response);
                    });
                })
            } catch (e) {
                console.log(e.response);
            }
        })
        .catch(err => console.log(err))
    
        pagarme.transactions.create(payload).catch(e => console.log(e.response));
    
    });

    // boleto
    router.post('/transactions/boleto', (req, res) => {
        const {
             amount, external_id, nome, email,
             cpf, estado, bairro, numero_casa,
             cep, shippingBoleto ,pais, cidade, rua ,item
         } = req.body;

        let payloadBoleto = {
            "amount": amount,
            "payment_method": "boleto",
            "postback_url": "http://requestb.in/pkt7pgpk",
            "capture": true,
            "customer": {
                "external_id": `${external_id}`,
                "type": "individual",
                "country": 'br',
                "name": `${nome}`,
                "email": `${email}`,
                "documents": [
                    {
                        "type": "cpf",
                        "number": `${cpf}`
                    }
                ] 
            },
            "shipping": {
                "name": `${shippingBoleto.nomeS}`,
                "fee": shippingBoleto.fee,
                "expedited": false,
                "address": {
                    "country": "br",
                    "state": `${shippingBoleto.estadoS}`,
                    "city": `${shippingBoleto.cidadeS}`,
                    "neighborhood": `${shippingBoleto.bairroS}`,
                    "street": `${shippingBoleto.ruaS}`,
                    "street_number": `${shippingBoleto.numero_casaS}`,
                    "zipcode": `${shippingBoleto.cepS}`
                }
            },
            "items": [
                {
                    "id": `${item.id}`,
                    "title": `${item.title}`,
                    "unit_price": `${item.unit_price}`,
                    "quantity": `${item.quantity}`,
                    "tangible": true
                }
            ]
        }

        pagarme.client.connect({
            api_key: secret.api_key
        })
        .then( async client => {
           try {
              await client.transactions.create(payloadBoleto)
              .then( resp => {
                  let id = resp.id;
                  res.json({ id: id });
                })
            } catch (e) {
                console.log(e.response);
            }
        })
        .catch(err => console.log(err))
    
        /*
        pagarme.client.connect({ 
            api_key: secret.api_key
         })
         .then( client => client.transactions.create() )
        .then( transtation => {
             console.log(transtation)
             res.send(transtation);
            } ).catch( err => {
                console.log(err.response);
                res.send(err);
            })
        */
            
    });



// retornos 
    // retornando uma transação
    router.get('/transactions/:id/returnOne', (req, res) => {
        const { id } = req.params;
    
        pagarme.client.connect({
            api_key: secret.api_key
        })
        .then( client => client.transactions.find({
            id: id
        }) )
        .then( transation => {
            res.send(transation)
            console.log(transation)
        } ).catch(err => console.log(err))
    
    
    });

    // retornando transações
    router.get('/transation/return', (req, res) => {
        pagarme.client.connect({
            api_key: secret.api_key
        })
        .then( client => client.transactions.all() )
        .then( transactions => {
            console.log(transactions);
            res.send(transactions);
        }).catch(err => console.log(err));
    });

    // retorna histórico de uma transação
    router.get('/transation/:transation_id/operations', (req, res) => {
        const { transation_id } = req.params;

        pagarme.client.connect({
            api_key: secret.api_key
        })
        .then( client => client.gatewayOperations.find({
            transactionId: transation_id
        }) )
        .then( gatewayOperations => {
            res.send(gatewayOperations);
            console.log(gatewayOperations);
        } ).catch(err => console.log(err))
    });

    // retorna eventos de uma transação
    router.get('/transation/:transation_id/events', (req, res) => {
        const { transation_id } = req.params;

        pagarme.client.connect({
            api_key: secret.api_key
        })
        .then( client => client.events.find({
            transactionId: transation_id
        }) )
        .then( events => {
            res.send(events)
            console.log(events)
        } )
    });



// estornos 
    // estorno boleto
    router.post('/transation/boleto/refund', (req, res) => {
        const {id, codeB, ag, agdv, type,
            conta, contadv, legaln, docnumber} = req.body;

        pagarme.client.connect({
            api_key: secret.api_key
        })
        .then( client => client.transactions.refund({
            id: `${id}`,
            bank_code: `${codeB}`,
            agencia: `${ag}`,
            agencia_dv: `${agdv}`,
            conta: `${conta}`,
            conta_dv: `${contadv}`,
            legal_name: `${legaln}`,
            document_number: `${docnumber}`,
            type: `${type}`
        }) )
    });

    // estorno cartão de crédito
    router.post('/transation/:id/refund', (req, res) => {
        const { client_id } = req.params;

        pagarme.client.connect({
            api_key: secret.api_key
        })
        .then( client => client.transactions.refund({
            id: client_id
        }) )
        .catch(err => console.log(err));

        res.send('refund complet with success!');

    });



// recebíveis 
    // retornando um array de objetos com todos os recebedores criados pela companhia.
    router.get('/recipients', (req, res) => {
        pagarme.client.connect({
            api_key: secret.api_key
        })
        .then( client => client.recipients.all() )
        .then( recipients => {
            console.log(recipients);
            res.send(recipients);
        } );
    });


    
// saldo
    // Consultar saldo do recebedor principal da empresa
    router.get('/saldo/principalReceb', (req, res) => {
        pagarme.client.connect({
            api_key: secret.api_key
        })
        .then( client => client.balance.primary() )
        .then( balance => {
            console.log(balance);
            res.send(balance);
        });
    });


// conta do banco 
    // conta bancára
    router.post('/contaBank', (req, res) => {

        const { bankCode, agencia, agenciaDv, 
            conta, contaDv, legalName, 
            documentNumber } = req.body;
                
        pagarme.client.connect({
            api_key: secret.api_key
        })
        .then( client => client.bankAccounts.create({
            bank_code: bankCode,
            agencia: agencia,
            agencia_dv: agenciaDv,
            conta: conta,
            conta_dv: contaDv,
            legal_name: legalName,
            document_number: documentNumber
        }) )
        .then(bankAccount => {
            console.log(bankAccount);
            res.send(bankAccount);
        });
    });


// saque
    // realizar saque
    router.post('/saque/transfers', (req, res) => {

        const { amount, bank_account_id, recipient_id } = req.body;

        pagarme.client.connect({
            api_key: secret.api_key
        })
        .then(client => client.transfers.create({
            amount: amount,
            bank_account_id: bank_account_id,
            recipient_id: recipient_id
        }))
        .then(transfer => console.log(transfer))
    });
    
module.exports = app => app.use('/pagarme', router);
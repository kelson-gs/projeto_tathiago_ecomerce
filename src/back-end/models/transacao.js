const db = require('../database/db');

const Transacao = db.sequelize.define('transacao', {
    nome: {
        type: db.Sequelize.STRING
    },
    id_externo: {
        type: db.Sequelize.INTEGER
    },
    email: {
        type: db.Sequelize.TEXT
    },
    cidade: {
        type: db.Sequelize.TEXT
    },
    tipo: {
        type: db.Sequelize.TEXT
    },
    item: {
        type: db.Sequelize.TEXT
    },
    telefone: {
        type: db.Sequelize.INTEGER
    },
    quantidade: {
        type: db.Sequelize.INTEGER
    },
    valor: {
        type: db.Sequelize.INTEGER
    }
})


//Transacao.sync({force: true})
module.exports = Transacao;
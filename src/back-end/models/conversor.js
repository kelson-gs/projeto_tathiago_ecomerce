const db = require('../database/db');

const Conversor = db.sequelize.define('conversores', {
    nome: {
        type: db.Sequelize.STRING
    },
    img: {
        type: db.Sequelize.STRING
    },
    info1: {
        type: db.Sequelize.TEXT
    },
    info2: {
        type: db.Sequelize.TEXT
    },
    info3: {
        type: db.Sequelize.TEXT
    },
    info4: {
        type: db.Sequelize.TEXT
    },
    quantidade: {
        type: db.Sequelize.INTEGER
    },
    avista: {
        type: db.Sequelize.DECIMAL(10, 2)
    },
    cartao: {
        type: db.Sequelize.DECIMAL(10, 2)
    }
})

//Conversor.sync({force: true})
module.exports = Conversor;
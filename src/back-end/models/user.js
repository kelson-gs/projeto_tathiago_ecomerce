const db = require('../database/db.js');
const bcrypt = require('bcryptjs');




// criando um model para usuários
const User = db.sequelize.define('users', {
    name: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    password: {
        type: db.Sequelize.STRING
    },
    birth_year: {
        type: db.Sequelize.STRING
    } 
}, {
    hooks: {
        async beforeSave(user) {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
        }
    }
});


//User.sync({force: true})
module.exports = User;
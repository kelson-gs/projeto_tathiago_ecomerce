const Sequelize = require("sequelize");
const sequelize = new Sequelize('projetotati', 'root', 'senhadatabase', {
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(()=>{
    console.log("Banco de dados conectado!");
})


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
const express = require("express");
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');


// habilitando o cors na aplicação
app.use(cors());


// configurando body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//chamando as rotas do controllers
require('./controllers/authController')(app);
require('./controllers/dashboardController')(app);
require('./controllers/produtoController')(app);
require('./controllers/usercontroller')(app);
require('./controllers/recpassword')(app);
require('./controllers/pagamento')(app);
require('./controllers/correios')(app);
require('./controllers/transacaoDbController')(app);


// express listen server
app.listen(8081, () => {
    console.log('Servidor conectado!');
});
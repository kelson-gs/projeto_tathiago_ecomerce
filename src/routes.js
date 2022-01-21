import React, { Component } from 'react';
import {BrowserRouter , Switch, Route} from 'react-router-dom';

import Header from './componentes/Header';
import Home from './pages/Home';
import Contatos from './pages/Contatos';

import Dashboard from './pages/Dashboard';
import Adc from './pages/Dashboard/Adicionando';
import Transacoes from './pages/Dashboard/Transacoes';
import Banco from './pages/Dashboard/Banco';
import Extrato from './pages/Dashboard/Extrato';
import Cliente from './pages/Dashboard/Cliente';
import FormEstornoBoleto from './pages/Dashboard/Form_estono_boleto';
import ContaBank from './pages/Dashboard/Form_adc_conta';

import Alltransacao from './pages/Dashboard/Banco/transacao';
import Unitransacao from './pages/Dashboard/Banco/unitransacao';
import Allusuario from './pages/Dashboard/Banco/usuarios';
import Uniusuario from './pages/Dashboard/Banco/uniusuario';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Pass from './pages/Password';
import Altpassword from './pages/Altpassword';

import Cartao from './pages/Cartao';
import CardConfirm from './pages/Cartao_confirmacao';
import Boleto from './pages/Boleto';
import BoletoConfirm from './pages/Boleto_confirm';

import Aplicativo from './pages/Aplicativo';
import Antenas from './pages/Antenas';
import Baterias from './pages/Baterias';
import Cabos from './pages/Cabos';
import Caixas from './pages/Caixa_de_Som';
import Carregadores from './pages/Carregadores';
import Controles from './pages/Controles';
import Conversores from './pages/Conversores';
import Extensoes from './pages/Extensoes';
import Fones from './pages/Fones';
import Fontes from './pages/Fontes';
import Pilhas from './pages/Pilhas';
import Receptores from './pages/Receptores';
import Roteadores from './pages/Roteadores';
import Transformadores from './pages/Transformadores';
import User from './pages/User';

import ProdutoHome from './pages/Home_produto';
import ProdutoPromocao from './pages/Promocao_produto';
import ProdutoAntena from './pages/Antenas_produto';
import ProdutoBateria from './pages/Baterias_produto';
import ProdutoCabo from './pages/Cabos_produto';
import ProdutoCaixa from './pages/Caixa_de_som_produto';
import ProdutoCarregador from './pages/Carregadores_produto';
import ProdutoControle from './pages/Controles_produto';
import ProdutoConversor from './pages/Conversores_produto';
import ProdutoExtensao from './pages/Extensoes_produto';
import ProdutoFone from './pages/Fones_produto';
import ProdutoFonte from './pages/Fontes_produto';
import ProdutoPilha from './pages/Pilhas_produto';
import ProdutoReceptor from './pages/Receptores_produto';
import ProdutoRoteador from './pages/Roteadores_produto';
import ProdutoTransformador from './pages/Transformadores_produto';




class Routes extends Component{

    render(){
        return(
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="produtoProdutohome/item/:id" component={ProdutoHome}/>
                    <Route path="produtoPromocao/item/:id" component={ProdutoPromocao}/>

                    <Route path="/formulario/cartao_de_credito" component={Cartao}/>
                    <Route path="/card/confirmacao" component={CardConfirm} />
                    <Route path="/formulario/boleto" component={Boleto}/>
                    <Route path="/boleto/:id/confirmacao" component={BoletoConfirm} />

                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route path="/dashboard/adc" component={Adc}/>
                    <Route path="/dashboard/transacoes" component={Transacoes}/>
                    <Route path="/dashboard/extrato" component={Extrato} />
                    <Route path="/dashboard/transacao/:client_id/client" component={Cliente} />
                    <Route path="/dashboard/:id/estorno/boleto" component={FormEstornoBoleto} />
                    <Route path="/dashboard/conta_bank" component={ContaBank} />
                    <Route path="/dashboard/banco" component={Banco} />
                    <Route path="/dashboard/alltransacoes" component={Alltransacao}/>
                    <Route path="/dashboard/unitransacao" component={Unitransacao}/>
                    <Route path="/dashboard/allusuario" component={Allusuario}/>
                    <Route path="/dashboard/uniusuario" component={Uniusuario}/>

                    <Route path="/contatos" component={Contatos}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/cadastro" component={Cadastro}/>
                    <Route path="/reculperarSenhaPage" component={Pass}/>
                    <Route path="/altsenha" component={Altpassword}/>

                    <Route path="/antenas" component={Antenas}/>
                    <Route path="/produtoAntena/item/:id" component={ProdutoAntena}/>

                    <Route path="/baterias" component={Baterias}/>
                    <Route path="/produtoBateria/item/:id" component={ProdutoBateria}/>

                    <Route path="/cabos" component={Cabos}/>
                    <Route path="/produtoCabo/item/:id" component={ProdutoCabo}/>

                    <Route path="/caixas" component={Caixas}/>
                    <Route path="/produtoCaixa/item/:id" component={ProdutoCaixa}/>

                    <Route path="/carregadores" component={Carregadores}/>
                    <Route path="/produtoCarregador/item/:id" component={ProdutoCarregador}/>

                    <Route path="/controles" component={Controles}/>
                    <Route path="/produtoControle/item/:id" component={ProdutoControle}/>

                    <Route path="/conversores" component={Conversores}/>
                    <Route path="/produtoConversor/item/:id" component={ProdutoConversor}/>

                    <Route path="/extensoes" component={Extensoes}/>
                    <Route path="/produtoExtensao/item/:id" component={ProdutoExtensao}/>

                    <Route path="/fones" component={Fones}/>
                    <Route path="/produtoFone/item/:id" component={ProdutoFone}/>

                    <Route path="/fontes" component={Fontes}/>
                    <Route path="/produtoFonte/item/:id" component={ProdutoFonte}/>

                    <Route path="/pilhas" component={Pilhas}/>
                    <Route path="/produtoPilha/item/:id" component={ProdutoPilha}/>

                    <Route path="/receptores" component={Receptores}/>
                    <Route path="/produtoReceptor/item/:id" component={ProdutoReceptor}/>

                    <Route path="/roteadores" component={Roteadores}/>
                    <Route path="/produtoRoteador/item/:id" component={ProdutoRoteador}/>

                    <Route path="/transformadores" component={Transformadores}/>
                    <Route path="/produtoTransformador/item/:id" component={ProdutoTransformador}/>

                    <Route path="/usuario" component={User}/>
                    

                    <Route path="/aplicativo" component={Aplicativo}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Routes;
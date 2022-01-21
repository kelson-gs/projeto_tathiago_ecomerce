import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './banco.css';

class Banco extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <div>
                <div id='container-title'>
                    <h1 id="title-banco-h1"> Banco de dados </h1>
                </div>
                
                <h2 id="sub-title-h2" >O que deseja fazer ?</h2>

                <div id="container-menu-banco">
                    <Link to="/dashboard/alltransacoes" className="link-banco">Buscar toda transação realizada no sistema</Link>
                    <Link to="/dashboard/unitransacao" className="link-banco">Buscar uma unica transação</Link>
                    <Link to="/dashboard/allusuario" className="link-banco">Buscar todos usuários cadastrados</Link>
                    <Link to="/dashboard/uniusuario" className="link-banco">Buscar um único usuário cadastrado</Link>
                </div>
            </div>
        );
    }
}

export default Banco;
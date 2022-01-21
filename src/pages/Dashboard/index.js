import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import NavHsc from '../../componentes/Nav_hsc';


export default class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            adm: 'admin'
        }

    }

    componentDidMount(){
        const data = localStorage.getItem('myData');
        if( data ){
            this.setState({adm: data})
        } else {
            this.setState({adm: ''})
        }
    }

    render(){
        return(
            <div>
                <NavHsc/>
                {this.state.adm === '' ? (
                    <div id="container_dashboard_menu">
                        <div id="menu_transacoes" className="dashboard_menu" >
                            <Link to="/dashboard/transacoes" className="lnk-menu">Transação</Link>
                        </div>

                        <div id="menu_adicionar" className="dashboard_menu">
                            <Link to="/dashboard/adc" className="lnk-menu">Adicionar items a loja</Link>
                        </div>

                        <div id="menu_extrato" className="dashboard_menu">
                            <Link to="/dashboard/extrato" className="lnk-menu">Extrato</Link>
                        </div>

                        <div id="menu_banco_de_dados" className="dashboard_menu">
                            <Link to="/dashboard/banco" className="lnk-menu">Banco de dados</Link>
                        </div>
                    </div>
                ):(
                    <div id="container_dashboard_menu">
                        <h2>Você não é adminstrador do sistema, por favor, logue com a conta admin !</h2>
                    </div>
                )}
                
            </div>

        );
    }
}

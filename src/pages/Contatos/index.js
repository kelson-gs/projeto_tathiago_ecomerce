import React, { Component } from 'react';
import './sobre.css';
import NavHsc from '../../componentes/Nav_hsc';

export default class Contatos extends Component{
    constructor(props){
        super(props);
        this.state = {
            missao: false,
            visao: false,
            valor: false
        }
    }
    render(){
        return(
            <div>
                <NavHsc/>
                <div id="container-sobre">
                    <div id="container-img-sobre">
                        <img id='img-sobre' src="./image/logo/foto_tat.jpg" />
                    </div>

                    <div id="container-missao" onMouseEnter={ () => this.setState({ missao: true, visao: false, valor: false }) }
                     onMouseOut={ () => this.setState({ missao: false }) }>
                        <h2 className="sub-title-h2"  >Missão</h2>
                        {this.state.missao === true ? (
                            <div  >
                                <p>Oferecer preço, prazo e qualidade</p>
                                <p>Oferecer produto de qualidade, bom atendimento</p>
                                <p>Servir a comunidade com bom atendmento ofertando preço, prezo e qualidade a seus clientes</p>
                            </div>
                        ):( null )}
                    </div>

                    <div id="container-visao" onMouseEnter={ () => this.setState({ visao: true, missao: false, valor: false }) } >
                        <h2 className="sub-title-h2" >Visão</h2>
                        {this.state.visao === true ? (
                            <div >
                                <p>Ser referência na venda de produtos e componentes eletrônicos de boa qualidade</p>
                            </div>
                        ):( null )}
                    </div>

                    <div id="container-valor" onMouseEnter={ () => this.setState({ valor: true, missao: false, visao: false }) } >
                        <h2  className="sub-title-h2" >Valores</h2>
                        {this.state.valor === true ? (
                            <div>
                                <p>Respeito</p>
                                <p>Transparência</p>
                                <p>Integridade</p>
                                <p>Sustentabilidade</p>
                                <p>Inovação</p>
                            </div>
                        ):( null )}
                    </div>
                </div>
            </div>
        );
    }
}
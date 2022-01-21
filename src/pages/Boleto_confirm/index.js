import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ax from '../../service/ax';
import './boletoCon.css';

class BoletoConfirm extends Component{
    constructor(props){
        super(props);
        this.state = {
            click: false,
            link: '',
            id: this.props.match.params.id,
            
        }

        this.gerador = this.gerador.bind(this);
    }

    gerador(){
        const { id } = this.state;

        ax.get(`http://localhost:8081/pagarme/transactions/${id}/returnOne`)
        .then( transacao => {
            console.log(transacao.data.boleto_url);
            this.setState({
                link: transacao.data.boleto_url,
                click: true
            });
        } ).catch(err => console.log(err));
    }

    render(){
        const { link } = this.state;

        return(
            <div>
                <div id="container_confirm">
                    <img id="img_logo_confirm" src="/image/logo/logo_tathiago_modificado.jpg" alt="logo_img" />
                    <div id="container_detals">
                        <h1 id="text_confirma_boleto" className="text">Clique no botão abaixo para gerar o link do boleto !!</h1>
                        <h2 id="text_agradecimento_boleto" className="text">Obrigado pela preferência.</h2>
                        { this.state.click === false ? (
                            <Link id="link_gera_boleto" className="text" onClick={this.gerador}>Gerar link</Link>
                        ) : (
                            <div id="container_link_boleto"> 
                                <label id="label_boleto" className="text">{link}</label>
                                <Link id="link_back_home" to="/" className="text">Voltar para página principal</Link>
                            </div>
                        ) }
                    </div>
                </div>
            </div>
        )
    }
}

export default BoletoConfirm;
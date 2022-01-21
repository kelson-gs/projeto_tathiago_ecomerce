import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './confirmacaoc.css';

class CardConfirm extends Component{
    render(){
        return(
            <div>
                <div id="container_confirm">
                    <img id="img_logo_confirm" src="/image/logo/logo_tathiago_modificado.jpg" alt="logo_img" />
                    <div id="container_detals">
                        <h1 id="text_confirma" className="text">Compra efetuada com sucesso !!</h1>
                        <h2 id="text_agradecimento" className="text">Obrigado pela preferência.</h2>
                        <Link id="link_back" to="/" className="text">Voltar para página principal</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardConfirm;
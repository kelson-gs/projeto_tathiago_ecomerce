import React, {Component} from 'react';
import './informacoes.css';
class Aplicativo extends Component{
    render(){
        return(
            <div>
                <h1 id='title-info-h1'>Sessão informativo</h1>
                <div id="container-info-pag" className="container-information">
                    <h2 id="title-info-pag" className="title-h2-informs">Plataforma de pagamento:</h2>
                    <p className="paragrafo">Para efetuarmos as transações realizadas pelo cartão de crédito e boleto, utilizamos a plataforma de pagamentos "pagar.me".</p>
                    <p className="paragrafo">Aos interessados, acesse o site da "pagar.me" para conhecer mais da plataforma.</p>
                    <p className="paragrafo">Acesse o site clicando na imagem abaixo: </p>
                    <a id='link-pagarme' className="paragrafo" href="https://pagar.me/" ><img src="./logo_pagarme.svg" /></a>
                    
                </div>

                <div id="container-info-seg" className="container-information">
                    <h2 id="title-info-seg" className="title-h2-informs">Segurança:</h2>
                    <p className="paragrafo">Ultilizamos do certificado SSL para uma maior proteção de seus dados. </p>
                </div>

                <div id="container-info-devo" className="container-information">
                    <h2 className="title-h2-informs">Trocas ou devoluções de produtos:</h2>
                    <p className="paragrafo">Caso ocorra algum problema, e estando dentro da garantia de seu produto, entre em contato conosco por este email: </p>
                    <p id="email-info" className="paragrafo">tathiagoadm@gmail.com</p>
                </div>
            </div>
        );
    }
}

export default Aplicativo;
import React, { Component } from 'react';
import './password.css';
import ax from '../../service/ax';

class Pass extends Component{
    constructor(props){
        super(props);
        this.state = {
            gerarCodigo: false,
            code: ''
        }
        this.gerar = this.gerar.bind(this);
        this.seguir = this.seguir.bind(this);
    }

    gerar(){
        const email = localStorage.getItem('myData');
        this.setState({ gerarCodigo: true });
        
        ax.post('http:localhost:8081/recpass/gerarcode', {
             email: email
             }).then( () => {
                 console.log('Gerando código')
             }).catch((err) => {
                 console.log(err);
             });
    };

    seguir(){
        const { code } = this.state;

        ax.post('http://localhost:8081/recpass/verificandoCode', {
            code: code
        })
        .then(() => {
            console.log('seguindo para page de reculperação de senha...');
        }).catch((err) => {
            console.log('algo deu errado ao seguir para a pagina de alteração de senha: ' + err);
        })
    };

    render(){
        const { gerarCodigo } = this.state;  

        return(
            <div id="container_recpassword">
                <h1 id="rec_title">Reculpere sua conta</h1>
                <p id="rec_text">Para reculperar sua senha, clique no botão abaixo que enviará para seu email um código. 
                    Copie e cole este código no campo que aparecerá logo depois, e siga com o processo.</p>

                <button id="btn_gerar" onClick={this.gerar}>Clique aqui para gerar código !</button>
                {gerarCodigo ?
                    <div id="div_seguir">
                        <input type="text" id="campo_codigo" placeholder="cole o código aqui..." 
                            onChange={ (e) => this.setState({ code: e.target.value }) }/>
                        <button id="btn_seguir" onClick={this.seguir}>Seguir...</button>
                    </div>
                    :
                    null
                } 
                
            </div>
        );
    }
}

export default Pass;
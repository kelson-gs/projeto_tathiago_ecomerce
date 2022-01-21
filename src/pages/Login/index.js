import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './login.css';
import ax from '../../service/ax';
import NavHsc from '../../componentes/Nav_hsc';


export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            redirect: false,
            erros: [],
            accerts: []
        }
        this.login = this.login.bind(this);
        this.redirection = this.redirection.bind(this);
    }

    redirection() {
        return(
            <Redirect to="/dashboard"/>
        );
    }

    login(e){
        const { email, password } = this.state;

        let erros = [];
        let acertos = [];

        if(email === '' || password === ''){
            if(email === '' || email === undefined){
                e.preventDefault();
                erros.push('Email indefinido. Tente novamente!');
            }

            if(password === '' || password === undefined){
                e.preventDefault();
                erros.push('Senha indefinida. Tente novamente!');
            }

            this.setState({ erros: erros });
        } else {
            try {
                
                ax.post('http://localhost:8081/auth/authenticate', {
                    email: email,
                    password: password, 
                } ).then( ( id ) => {
                    acertos.push('Logado com sucesso!');
                
                    if(email === 'tathiagoadm@test.com'){
                        
                        localStorage.setItem('myData', `admin`);
                        this.props.history.push('/dashboard');
                        window.location.reload();
                    } else {
                        localStorage.setItem('myData', `${id.data.id}`);
                        this.props.history.push('/'); 
                        window.location.reload();
                    }
                }).catch( (err) => {
                    console.log("Erro ao fazer login: " + err);
                    erros.push('houve um erro ao fazer login. Tente novamente!');
                } )
                this.setState({ accerts: acertos, erros: erros });
            } catch (err) {
                console.log(err);
            }
        }
    }
    
    render(){
        const {erros, accerts} = this.state;
        return (
            <div>
                <NavHsc/>
                <div id="container_items">
                
                    <h1 id="title_login">Faça seu login</h1>
                    {erros.length !== 0 ? (
                        <div className="container_view_errors_and_accerts">
                            {erros.map( erro => {
                                return(
                                    <div key={erro} id="container_erros_login">
                                        <label id="paragrafo_error" > {erro}</label>
                                    </div>
                                )
                            } )}
                        </div>
                    ):(
                        null
                    )}

                    {accerts.length !== 0 ? (
                        <div className="container_view_errors_and_accerts">
                            {accerts.map( accert => {
                                return(
                                    <div key={accert} id="container_accert_login">
                                        <label id="paragrafo_accert" > {accert}</label>
                                    </div>
                                )
                            } )}
                        </div>
                    ):(
                        null
                    )}

                    <form id="form_container">

                        <h2 className="title_forms">Login:</h2>
                        <input type='email' name='login' placeholder="Digite seu email..." className="inputs_forms" id='log' 
                            onChange={(e) => this.setState({email: e.target.value})}/>
                        <br/>
                        

                        <h2 className="title_forms">Senha:</h2>
                        <input type='password' name='senha' className="inputs_forms" id='senha'
                            onChange={(e) => this.setState({password: e.target.value})}/>

                        <button id="btn_logar" onClick={this.login} >Logar</button>
                        <button type='submit' id="btn_cad"><Link to="/cadastro" id="btn_link">Criar conta...</Link></button>

                    </form>

                    <Link to='/reculperarSenhaPage' id="link_remb_pass" >Esqueceu a senha?</Link>
                </div>

            </div>
            
        );
        
    }
}

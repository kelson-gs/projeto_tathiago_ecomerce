import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import ax from '../../service/ax';
import NavHsc from '../../componentes/Nav_hsc';
import './cadastro.css';


class Cadastro extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            password: '',
            confirmPassword: '',
            email: '',
            birth_year: ''
        }
        this.registerVerifcation = this.registerVerifcation.bind(this);
        this.register = this.register.bind(this);
    }

    // Envia o formulário de cadastro para o back-end
    register(){
        const { name, password, email, birth_year } = this.state;

        ax.post('http://localhost:8081/auth/register', {
                name: name,
                password: password,
                email: email,
                birth_year: birth_year
            }).then(()=>{
                alert('Cadastro criado com sucesso!')
            }).catch(()=>{
                alert('Houve um erro ao cadastrar!!')
            })
    }

    // faz a verificação das states
    registerVerifcation(e){
        const { name, password, confirmPassword, email, birth_year } = this.state;
        const lengthPassword = password.length;

        for( let states in this.state ){
            if( this.state[ states ] === '' ){
                alert(`${ states } inválido ou indefinido`);
                e.preventDefault();
                break               
            };
        };

        if( lengthPassword < 8){
            alert('Sua senha deve ter no mínimo 8 digitos!');

        };

        if(password !== confirmPassword){
            alert('confirmação de senha incorreta!');
        };

        if(password === confirmPassword ){
            if( name !== '' && email !== '' && birth_year !== '' ){
                this.register();
            }
        };
    };

    render(){
        return(
            <div>
                <NavHsc/>
                <form id="form_register">
                    <div id="head_title_form">
                        <h1>Cadastro</h1>
                    </div>
                    
                    <label className="label_title">Nome:</label>
                    <input type="text" className="inputs" id="name" onChange={ e => this.setState({ name: e.target.value })}/>

                    <label className="label_title">Email:</label>
                    <input type="email" className="inputs" id="email" onChange={ e => this.setState({ email: e.target.value }) }/>

                    <label className="label_title">Data de nascimento:</label>
                    <MaskedInput className="inputs" mask={[/[1-9]/,  /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]} placeholder="dia/mês/ano" id="date" onChange={ e => this.setState({ birth_year: e.target.value })} />
        
                    <label className="label_title">Senha:</label>
                    <input type="password" className="inputs" id="password" placeholder="Senha exclusiva para este site." onChange={ e => this.setState({ password: e.target.value }) } />

                    <label className="label_title">Digite novamente a senha:</label>
                    <input type= "password" className="inputs" id="confirmPassword" onChange={ e => this.setState({ confirmPassword: e.target.value })}/>

                    <button onClick={ this.registerVerifcation } id="btn_register">Cadastrar...</button>

                </form>
            </div>
        );
    }
}

export default Cadastro; 
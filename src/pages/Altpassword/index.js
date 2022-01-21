import React, { Component } from 'react';
import ax from '../../service/ax';
import './alt.css';

class Altpassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            newPassword: '',
            confirmPassword: '',
            email: localStorage.getItem('myData')
        }
        this.putsenha = this.putsenha.bind(this);
    }

    putsenha(){
        const { email, newPassword, confirmPassword } = this.state;

        if( newPassword === confirmPassword ){
            ax.put('http://localhost:8081/recpass/altpass', {
                newPassword: newPassword,
                email: email
            })
            .then( () => {
                console.log('senha alterada');
            }).catch((err) => console.log(err))
        } else {
            if(newPassword === '' && confirmPassword === '' ){
                alert('Por favor, preencha os campos para efetuar a alteração de senha !');
            } else if( confirmPassword === '' ){
                alert('O campo de confirmação de senha é obrigatório, por favor, preencha !');
            } else if (newPassword === ''){
                alert('Preencha o campo de senha para seguir com a alteração !');
            }

        }
    }

    render(){
        return(
            <div id="container_putsenha">
                <label id="label_1" className='label_s'>Digite nova senha :</label>
                <input type="text" id="input_senha" className='input_s' placeholder="digite senha..." 
                onChange={ (e) => this.setState({ newPassword: e.target.value }) }/>

                <label id="label_2" className='label_s'>Digite novamente :</label>
                <input type="text" id="input_confirm" className='input_s' placeholder="digite novamente..." 
                onChange={ (e) => this.setState({ confirmPassword: e.target.value }) }/>

                <button id='btn_s' onClick={this.putsenha} >Alterar/Salvar</button>
            </div>
        );
    }
}

export default Altpassword;
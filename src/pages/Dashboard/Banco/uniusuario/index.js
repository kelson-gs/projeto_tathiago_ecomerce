import React, { Component } from 'react';
import ax from '../../../../service/ax';
import './uniuser.css';

class Uniusuario extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            id: ''
        }
        this.getUser = this.getUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(){
        const { id } = this.state;

        ax.delete(`http://localhost:8081/user/deleteUser/${id}`)
        .then( () =>{
            console.log('usuário deletado com sucesso !');
            alert('usuário deletado com sucesso !');
        } )
        .catch( (err)=>{
            console.log(`Houve um erro ao deletar o usuário: ${err}`);
            alert('Houve um erro ao deletar o usuário. Verifique se o ID corresponde com usuário existente !');
        })
    }

    getUser(){
        const { id } = this.state;

        ax.get(`http://localhost:8081/auth/anlyusuario/${id}`)
        .then( response => {

            console.log(response)
            this.setState({ user: {
                nome: `${response.data.onlyusuario.name}`,
                email: `${response.data.onlyusuario.email}`,
                id: `${response.data.onlyusuario.id}`
            } })
        }).catch( err => console.log(err) );
    }
    render(){
        return(
            <div>
                <h1>Único Usuário</h1>

                <div>
                    <label id="label-unitransation">Insira o ID de quem procura no banco de dados:</label>
                    <input id="input-name-banco" type="text" placeholder="insira o id aqui..." 
                        onChange={ (e) => this.setState({ id: e.target.value }) }/>
                    <button id="btn-banco-buscar" onClick={ () => this.getUser()} >Buscar</button>
                </div>

                { this.state.user !== '' ? 
                (
                    <div>
                        <div id='container-unitransacao' >
                            <div className="container-label-unitran">
                                <label className="label-unitransacao">ID</label>
                                <label className="label-result-unitransacao">{this.state.user.id}</label>
                            </div>

                            <div className="container-label-unitran">
                                <label className="label-unitransacao">Nome</label>
                                <label className="label-result-unitransacao">{this.state.user.nome}</label>
                            </div>

                            <div className="container-label-unitran">
                                <label className="label-unitransacao">Email</label>
                                <label className="label-result-unitransacao">{this.state.user.email}</label>
                            </div>

                            
                            
                        </div>
                    
                        <button id="btn-delete-user" onClick={ () => this.deleteUser() } >Deletar Usuário</button>
                    </div>
                ):(
                    null
                ) }

            </div>
        );
    }
}

export default Uniusuario;
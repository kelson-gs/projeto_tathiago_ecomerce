import React, { Component } from 'react';
import ax from '../../../../service/ax';

class Allusuario extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            isLoading: true
        }
        this.pegarUsuarios = this.pegarUsuarios.bind(this);
    }

    async pegarUsuarios(){
        await ax.get('http://localhost:8081/auth/allusuarios')
        .then( users => 
            users.data.allusuarios.map( item => ({
                id: item.id,
                nome: item.name,
                email: item.email,
            }) ) 
        ).then( coisa => {
            console.log(coisa);
            this.setState({
                users: coisa
            })
        } ).catch( err => console.log(err) );
    }

    componentDidMount(){
        this.pegarUsuarios();
    }

    render(){
        const { users, isLoading } = this.state;

        return(
            <div>
                <h1 id="title-transacao-h1">Todos os usuarios</h1>

                <div>
                    <table id="container_table_users">
                            <thead>
                                <tr>
                                    <th className="th_form_transation"><label>id</label></th>
                                    <th className="th_form_transation"><label>Nome</label></th>
                                    <th className="th_form_transation"><label>Email</label></th> 
                                </tr>
                            </thead>
                            <tbody >
                            {isLoading === true ? (
                                users.map(coisa => {
                                    const {
                                        nome, id,
                                        email
                                    } = coisa;

                                    
                                    return(
                                        
                                            <tr key={id} >
                                                <td className="td_form_transation"><label>{id}</label></td>
                                                <td className="td_form_transation"><label>{nome}</label></td>
                                                <td className="td_form_transation"><label>{email}</label></td>
                                            </tr>
                                    
                                    );
                                
                                })
                            ):(
                                null
                            )}
                            </tbody>
                            
                    </table>
                </div>
            </div>
        );
    }
}

export default Allusuario;
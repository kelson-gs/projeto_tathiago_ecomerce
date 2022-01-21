import React, { Component } from 'react';
import ax from '../../../../service/ax';
import './transacao.css';

class Alltransacao extends Component{
    constructor(props){
        super(props);
        this.state = {
            transacoes: [],
            isLoading: true
        }
        this.pegarTransacoes = this.pegarTransacoes.bind(this);
    }

    async pegarTransacoes(){
        await ax.get('http://localhost:8081/transacaoDb/createTransacao')
        .then( transacoes => 
            transacoes.data.alltransacao.map( item => ({
                id: item.id,
                externo_id: item.id_externo,
                nome: item.nome,
                email: item.email,
                cidade: item.cidade,
                tipo: item.tipo,
                item: item.item,
                quantidade: item.quantidade,
                telefone: item.telefone,
                valor: item.valor
            }) ) 
        ).then( coisa => {
            console.log(coisa);
            this.setState({
                transacoes: coisa
            })
        } ).catch( err => console.log(err) );
    }

    componentDidMount(){
        this.pegarTransacoes();
    }

    render(){
        const { transacoes, isLoading } = this.state;

        return(
            <div>
                <h1 id="title-transacao-h1" >Todas as transações</h1>

                <div>
                    <table id="container_table_transation">
                            <thead>
                                <tr>
                                        <th className="th_form_transation"><label>id</label></th>
                                        <th className="th_form_transation"><label>Externo_id</label></th>
                                        <th className="th_form_transation"><label>Nome</label></th>
                                        <th className="th_form_transation"><label>Email</label></th>
                                        <th className="th_form_transation"><label>Tipo</label></th>
                                        <th className="th_form_transation"><label>Telefone</label></th>
                                        <th className="th_form_transation"><label>Cidade</label></th>
                                        <th className="th_form_transation"><label>Item</label></th>
                                        <th className="th_form_transation"><label>Valor</label></th>
                                        <th className="th_form_transation"><label>Quantidade</label></th>
                                        
                                </tr>
                            </thead>
                            <tbody >
                            {isLoading === true ? (
                                transacoes.map(coisa => {
                                    const {
                                        nome, id, externo_id,
                                        email, cidade, tipo,
                                        item, quantidade, telefone,
                                        valor
                                    } = coisa;

                                    
                                    return(
                                        
                                            <tr key={id} >

                                                <td className="td_form_transation"><label>{id}</label></td>
                                                <td className="td_form_transation"><label>{externo_id}</label></td>
                                                <td className="td_form_transation"><label>{nome}</label></td>
                                                <td className="td_form_transation"><label>{email}</label></td>
                                                <td className="td_form_transation"><label>{tipo}</label></td>
                                                <td className="td_form_transation"><label>{telefone}</label></td>
                                                <td className="td_form_transation"><label>{cidade}</label></td>
                                                <td className="td_form_transation"><label>{item}</label></td>
                                                <td className="td_form_transation"><label>{valor}</label></td>
                                                <td className="td_form_transation"><label>{quantidade}</label></td>
                                                
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

export default Alltransacao;
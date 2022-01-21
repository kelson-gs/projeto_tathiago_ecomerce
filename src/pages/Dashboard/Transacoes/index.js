import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ax from '../../../service/ax';
import './transacao.css';

class Transacoes extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            transacao: [],
            saldo: [],
            client_id: '',
            payment: '',
            click: 1
        }
        this.getTransaction = this.getTransaction.bind(this);
        this.estornoCartão = this.estornoCartão.bind(this);
    }

    estornoCartão(){
        const { client_id } = this.state;

        ax.post(`http://localhost:8081/transation/${client_id}/refund`)
        .then( success => console.log('Estorno realizado com sucesso: ', success) )
        .catch( err => console.log('Houve um erro ao realizar o estorno: ', err) )
        
    }

    async getTransaction(){
        await ax.get('http://localhost:8081/pagarme/transation/return')
        .then(transacoes => 
            transacoes.data.map( item => ({
                id: item.id,
                amount: item.amount,
                paid_amount: item.paid_amount,
                status: `${item.status}`,
                card_band: `${item.card_band}`,
                card_first_digits: `${item.card_first_digits}`,
                card_holder_name: `${item.card_holder_name}`,
                card_last_digits: `${item.card_last_digits}`,
                card: item.card,
                items: item.items,
                shipping: item.shipping,
                billing: item.billing,
                customer: item.customer,
                payment_method: `${item.payment_method}`,
                date_created: `${item.date_created}`,
                date_updated: `${item.date_updated}`,
                installments: `${item.installments}`,
                risk_level: `${item.risk_level}`,
                refunded_amount: `${item.refunded_amount}`
            }))
        ).then( item => {
            console.log(item)
            this.setState({
                transacao: item
            })
        }) 
        
    }

    componentDidMount(){
        this.getTransaction();
        
    }

    render(){
        const { transacao, isLoading, client_id} = this.state;
        return(
            <div>
                <h1>Transação</h1>
                <div>
                    
                    <div>
                        <table id="container_table_transation">
                            <thead>
                                <tr>
                                        <th className="th_form_transation"><input type="checkbox" /></th>
                                        <th className="th_form_transation"><label>Status</label></th>
                                        <th className="th_form_transation"><label>ID</label></th>
                                        <th className="th_form_transation"><label>Data</label></th>
                                        <th className="th_form_transation"><label>Nome</label></th>
                                        <th className="th_form_transation"><label>Forma de Pagamento</label></th>
                                        <th className="th_form_transation"><label>Número do Cartão</label></th>
                                        <th className="th_form_transation"><label>Documento</label></th>
                                        <th className="th_form_transation"><label>Email</label></th>
                                        <th className="th_form_transation"><label>Telefone</label></th>
                                        <th className="th_form_transation"><label>Operadora de Cartão</label></th>
                                        <th className="th_form_transation"><label>Bandeira do Cartão</label></th>
                                        <th className="th_form_transation"><label>Valor</label></th>
                                        <th className="th_form_transation"><label>Valor Capturado</label></th>
                                        <th className="th_form_transation"><label>Valor Estornado</label></th>
                                        <th className="th_form_transation"><label>Score Pagar.me</label></th>
                                </tr>
                            </thead>
                            <tbody >
                            {isLoading === true ? (
                                transacao.map(item => {
                                    const {
                                        amount,  card, 
                                        card_first_digits, card_holder_name,
                                        card_last_digits, date_created ,customer ,
                                        id, payment_method, refunded_amount,
                                         risk_level
                                    } = item;

                                    let statos = item.status;
                                    if(statos === 'waiting_payment'){
                                        statos = 'esperando pagamento';
                                    } else if(statos === 'paid'){
                                        statos = 'pago';
                                    }
                                    
                                    console.log('documents: ', customer.documents[0].number)
                                    console.log('phone: ', customer )

                                    let newValor = amount / 100;
                                    
                                    const trStyle = {
                                        cursor: 'pointer'
                                    }
                                    return(
                                        
                                            <tr key={id} style={trStyle}>
                                                <td className="td_form_transation"><input value={id} type="checkbox" onChange={ () => {
                                                    const {click} = this.state;

                                                    if(click === 1){
                                                        const client = id;
                                                        const payment = payment_method;

                                                        this.setState({ client_id: client,
                                                            payment: payment,
                                                            click: 2
                                                        });
                                                    } else {
                                                        this.setState({ 
                                                            client_id: '',
                                                            click: 1
                                                        });
                                                    }
                                                } } /></td>

                                                <td className="td_form_transation"><label>{statos}</label></td> 
                                                <td className="td_form_transation"><label>{id}</label></td>
                                                <td className="td_form_transation"><label>{date_created}</label></td>
                                                {payment_method === 'boleto' ? (
                                                    <td className="td_form_transation"><label>{customer.name}</label></td>
                                                ):(
                                                    <td className="td_form_transation"><label>{card_holder_name}</label></td>
                                                )}
                                                <td className="td_form_transation"><label>{payment_method}</label></td>
                                                <td className="td_form_transation"><label>{card_first_digits + card_last_digits}</label></td>
                                                <td className="td_form_transation"><label>{customer.documents[0].number}</label></td>
                                                <td className="td_form_transation"><label>{customer.email}</label></td>

                                                {customer.phone_numbers === null ? (
                                                <td className="td_form_transation"><label>sem numero</label> </td>
                                                                ):(
                                                <td className="td_form_transation"><label>{customer.phone_numbers[0]}</label></td>
                                                )}

                                                <td className="td_form_transation"><label>{'pagar.me'}</label></td>
                                                {card === null ? (
                                                <td className="td_form_transation"><label>sem bandeira</label> </td>
                                                                ):(
                                                <td className="td_form_transation"><label>{card.brand}</label></td>
                                                )}
                                                <td className="td_form_transation"><label>{newValor.toFixed(2)}</label></td>
                                                <td className="td_form_transation"><label>{newValor.toFixed(2)}</label></td>
                                                <td className="td_form_transation"><label>{refunded_amount}</label></td>
                                                <td className="td_form_transation"><label>{risk_level}</label></td>
                                                
                                            </tr>
                                    
                                    );
                                
                                })
                            ):(
                                null
                            )}
                            </tbody>
                            
                        </table>
                        <div id="container_btn_transation">
                            <Link to={`/dashboard/transacao/${client_id}/client`} ><button className="btn_transacao">avaliar cliente</button></Link>
                            {this.state.payment === 'credit_card' ? (
                                <button onClick={this.estornoCartão} className="btn_transacao">Extornar</button>
                            ): (
                                <Link to={`/dashboard/${client_id}/estorno/boleto`}><button className="btn_transacao">Extornar</button></Link>
                            )}
                        </div>
                        
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Transacoes;
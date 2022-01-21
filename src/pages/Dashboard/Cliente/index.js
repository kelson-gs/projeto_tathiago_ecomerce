import React, { Component } from 'react';
import ax from '../../../service/ax';
import './cliente.css';

class Cliente extends Component{
    constructor(props){
        super(props);
        this.state = {
            id_transation: this.props.match.params.client_id,
            client: [],
            customer: [],
            billing: [],
            shipping: [],
            items: [],
            history_transation: [],
            events_transition: []
        }
    
    } 

    componentDidMount(){
        const { id_transation } = this.state;

        

        // pegando uma transação
        ax.get(`http://localhost:8081/pagarme/transactions/${id_transation}/returnOne`)
        .then( item => {
            console.log(item.data);
            this.setState({ client: item.data,
                            customer: {
                                name_customer: item.data.customer.name,
                                birthday: item.data.customer.birthday, 
                                external_id: item.data.customer.external_id,
                                document_number: item.data.customer.documents[0].number,
                                document_type: item.data.customer.document_type,
                                email: item.data.customer.email, 
                                type: item.data.customer.type, 
                                phone_number: item.data.customer.phone_numbers,
                                

                            },

                            shipping: {
                                name_shipping: item.data.shipping.name,
                                delivery_date: item.data.shipping.delivery_date,
                                fee: item.data.shipping.fee,
                                city_shipping: item.data.shipping.address.city,
                                country_shipping: item.data.shipping.address.country,
                                complementary_shipping: item.data.shipping.address.complementary,
                                neighborhood_shipping: item.data.shipping.address.neighborhood,
                                state_shipping: item.data.shipping.address.state,
                                street_shipping: item.data.shipping.address.street,
                                street_number_shipping: item.data.shipping.address.street_number,
                                zipcode_shipping: item.data.shipping.address.zipcode

                                },
                            items: item.data.items
            });
            
        } )

        ax.get(`http://localhost:8081/pagarme/transactions/${id_transation}/returnOne`)
        .then( item => {
            console.log(item.data);
            if(item.data.billing){
                this.setState({ 
                    billing: {
                    city: `${item.data.billing.address.city}`,
                    name_billing: `${item.data.billing.name}`,
                    country: `${item.data.billing.address.country}`,
                    neighborhood: `${item.data.billing.address.neighborhood}`,
                    state: `${item.data.billing.address.state}`,
                    street: `${item.data.billing.address.street}`,
                    street_number: `${item.data.billing.address.street_number}`,
                    zipcode: `${item.data.billing.address.zipcode}`,
                    complementary: `${item.data.billing.address.complementary}`
                    } 
                });
            } else {
                this.setState({ 
                    billing: {
                    city: `vazio`,
                    name_billing: `vazio`,
                    country: `vazio`,
                    neighborhood: `vazio`,
                    state: `vazio`,
                    street: `vazio`,
                    street_number: `vazio`,
                    zipcode: `vazio`,
                    complementary: `vazio`
                    } 
                });
            }
            
            
        } )
        
        // pegando um histórico de transação 
        ax.get(`http://localhost:8081/pagarme/transation/${id_transation}/operations`)
        .then( history => {
            this.setState({ 
                history_transation: history.data,
            });
            
        } )
        
        // pegando o evento de uma transação
        ax.get(`http://localhost:8081/pagarme/transation/${id_transation}/events`)
        .then( events => {
            this.setState({ events_transition: events.data });
            
        } )
    }

    render(){
        const { history_transation, items } = this.state;

        const { acquirer_name, acquirer_response_code,
                amount, authorization_code, 
                card_first_digits, card_last_digits, 
                card_holder_name, card_brand, tid, 
                installments, nsu, 
                payment_method, boleto_expiration_date, boleto_barcode,
                boleto_url
            } = this.state.client;
        
        const { birthday, name_customer, external_id,
                document_number, document_type, email, type, phone_number    
                } = this.state.customer;
        
        const { city, complementary, country, neighborhood,
                state, street, street_number, name_billing ,zipcode
                } = this.state.billing;

        const { city_shipping, name_shipping, fee, delivery_date,
                country_shipping, complementary_shipping, neighborhood_shipping,
                state_shipping, street_shipping, street_number_shipping, zipcode_shipping
                } = this.state.shipping;
        
        const colorGreen = {
            color: 'green'
        }

        const newFee = fee / 100;
        
        return(
            <div>
                
                <div id="conteiner_events" >
                    <div id="events">
                        <h1 id="timeline">Timeline de eventos</h1>
                        {history_transation.map( item => (
                            <div key={item.id} id="box_events" >
                                {item.type === 'authorize' ? (
                                    <label className="title_event">Autorização</label>
                                ):(
                                    <label className="title_event">{ item.type }</label>
                                )}
                                
                                {item.status === "success" ? (
                                    <label className="status_event" style={colorGreen} >sucesso</label>
                                ):(
                                    <label className="status_event">{ item.status }</label>
                                )}
                                
                            </div>
                        ) )}
                    </div>

                    { payment_method === "boleto" ? (
                        <div id="boleto_view">
                            <h1 id="title_boleto_view" >Boleto</h1>
                            <label className="label_boleto_view_title">Vencimento: </label>
                            <label className="label_boleto_respos">{boleto_expiration_date}</label>
                            
                            <br/>
                            <label className="label_boleto_view_title">Código de barras: </label>
                            <label className="label_boleto_respos">{boleto_barcode}</label>

                            <br/>
                            <label className="label_boleto_view_title">URL do boleto: </label>
                            <a className="label_boleto_respos" href={boleto_url}>{boleto_url}</a>
                        </div>
                    ) : (
                        <div id="card_view">
                            <h1 id="title_cartao_view">card View</h1>
                            <label className="label_cartao_view_title">Número: </label>
                            <label className="label_cartao_respos">{card_first_digits + card_last_digits}</label>
                            
                            <br/>
                            <label className="label_cartao_view_title">Portador informado: </label>
                            <label className="label_cartao_respos">{card_holder_name}</label>

                            <br/>
                            <label className="label_cartao_view_title">Número de parcela: </label>
                            <label className="label_cartao_respos">{installments}</label>

                            <br/>
                            <label className="label_cartao_view_title">Bandeira: </label>
                            <label className="label_cartao_respos">{card_brand}</label>
                        </div>
                    )}
                </div>

                <div id="transaction_view">
                    <h1 id="transacao_view" >Detalhes da transação</h1>
                    <label className="label_transacao_view_title">Operadora de cartão: </label>
                    <label className="label_transacao_respos">{acquirer_name}</label>

                    <br/>
                    <label className="label_transacao_view_title">Resposta da operadora: </label>
                    <label className="label_transacao_respos">{acquirer_response_code}</label>

                    <br/>
                    <label className="label_transacao_view_title">Código de autorização: </label>
                    <label className="label_transacao_respos">{authorization_code}</label>

                    <br/>
                    <label className="label_transacao_view_title">TID: </label>
                    <label className="label_transacao_respos">{tid}</label>

                    <br/>
                    <label className="label_transacao_view_title">NSU: </label>
                    <label className="label_transacao_respos">{nsu}</label>
                </div>

                <div id="client_view"> 
                    <h1 id="client_title_view">Detalhes do cliente</h1>
                    <label className="label_client_view_title">Nome do cliente: </label>
                    <label className="label_client_respos">{name_customer}</label>

                    <br/>
                    <label className="label_client_view_title">Email: </label>
                    <label className="label_client_respos">{email}</label>

                    <br/>
                    <label className="label_client_view_title">Telefone: </label>
                    <label className="label_client_respos">{phone_number}</label>

                    <br/>
                    <label className="label_client_view_title">Documentos: </label>
                    <label className="label_client_respos">{document_type}</label>
                    <label className="label_client_respos">{document_number}</label>

                    <br/>
                    <label className="label_client_view_title">Data de nascimento: </label>
                    <label className="label_client_respos">{birthday}</label>

                    <br/>
                    <label className="label_client_view_title">Id do cliente na loja: </label>
                    <label className="label_client_respos">{external_id}</label>

                    <br/>
                    <label className="label_client_view_title">Tipo de documento: </label>
                    <label className="label_client_respos">{type}</label>
                </div>

                <div id="billing_view">
                    <h1 id="title_cobranca_h1">Detalhes de cobrança</h1>
                    <label className="label_cobranca_view_title">Nome do pagador: </label>
                    <label className="label_cobranca_respos">{name_billing}</label>

                    <br/>
                    <h2 id="title_cobranca_h2">Endereço</h2>
                    <label className="label_cobranca_view_title">Rua: </label>
                    <label className="label_cobranca_respos">{street}</label>

                    <br/>
                    <label className="label_cobranca_view_title">Complemento: </label>
                    <label className="label_cobranca_respos">{complementary}</label>

                    <br/>
                    <label className="label_cobranca_view_title">Cidade: </label>
                    <label className="label_cobranca_respos">{city}</label>

                    <br/>
                    <label className="label_cobranca_view_title">País: </label>
                    <label className="label_cobranca_respos">{country}</label>

                    <br/>
                    <label className="label_cobranca_view_title">Número: </label>
                    <label className="label_cobranca_respos">{street_number}</label>

                    <br/>
                    <label className="label_cobranca_view_title">Bairro: </label>
                    <label className="label_cobranca_respos">{neighborhood}</label>

                    <br/>
                    <label className="label_cobranca_view_title">Estado: </label>
                    <label className="label_cobranca_respos">{state}</label>

                    <br/>
                    <label className="label_cobranca_view_title">CEP: </label>
                    <label className="label_cobranca_respos">{zipcode}</label>
                </div>

                <div id="shipping_view">
                    <h1 id="title_entrega_h1">Detalhes de entrega</h1>
                    <label className="label_cobranca_view_title">Nome do recebedor: </label>
                    <label className="label_cobranca_respos">{name_shipping}</label>

                    <br/>
                    <label className="label_cobranca_view_title">Data de entrega: </label>
                    <label className="label_cobranca_respos">{delivery_date}</label>

                    <br/>
                    <label className="label_cobranca_view_title">Taxa de entrega: </label>
                    <label className="label_cobranca_respos">R$ { newFee.toFixed(2) }</label>
                    
                    <br/>
                    <h2 id="title_entrega_h2">Endereço</h2>
                    <label className="label_cobranca_view_title">Rua: </label>
                    <label className="label_cobranca_respos">{street_shipping}</label>

                    <br/>
                    <label className="label_cobranca_view_title">Complemento: </label>
                    <label className="label_cobranca_respos">{complementary_shipping}</label>

                    <br/>
                    <label className="label_cobranca_view_title">Cidade: </label>
                    <label className="label_cobranca_respos">{city_shipping}</label>

                    <br/>
                    <label className="label_cobranca_view_title">País: </label>
                    <label className="label_cobranca_respos">{country_shipping}</label>

                    <br/>
                    <label className="label_cobranca_view_title">Número: </label>
                    <label className="label_cobranca_respos">{street_number_shipping}</label>

                    <br/>
                    <label className="label_cobranca_view_title">Bairro: </label>
                    <label className="label_cobranca_respos">{neighborhood_shipping}</label>

                    <br/>
                    <label className="label_cobranca_view_title">Estado: </label>
                    <label className="label_cobranca_respos">{state_shipping}</label>

                    <br/>
                    <label className="label_cobranca_view_title">CEP: </label>
                    <label className="label_cobranca_respos">{zipcode_shipping}</label>
                </div>

                <div id="items_view">
                    <h1 id="title_compra">Detalhes da compra</h1>
                    {items.map( item => (
                        <div key={item.id}>
                            <label className="label_compra_view_title">ID do produto: </label>
                            <label className="label_compra_respos">{item.id}</label>

                            <br/>
                            <label className="label_compra_view_title">Nome do produto: </label>
                            <label className="label_compra_respos">{item.title}</label>

                            <br/>
                            <label className="label_compra_view_title">Preço da unidade: </label>
                            <label className="label_compra_respos">{item.unit_price}</label>

                            <br/>
                            <label className="label_compra_view_title">Quantidade: </label>
                            <label className="label_compra_respos">{item.quantity}</label>

                            <br/>
                            <label className="label_compra_view_title">Bem fisico: </label>
                            <label className="label_compra_respos">{item.tangible === true ? 'Sim' : 'Não'}</label>
                            <br/>
                            <br/>
                        </div>
                    ))}
                </div>

                <div id="valor_view">
                    <h1 id="title_parcela">Parcelas</h1>
                    <table id="table_parcela">
                       <tbody>
                            <tr>
                                <td className="td_parcela_view">{installments}</td>
                                <td className="td_parcela_view"> R$ {amount/100}</td>
                                <td className="td_parcela_view">{10.50}</td>
                                <td id='td_formated' className="td_parcela_view">{amount - 1050}</td>
                            </tr>
                       </tbody>
                    </table>
                </div>

            </div>
        );
    }
}


export default Cliente;
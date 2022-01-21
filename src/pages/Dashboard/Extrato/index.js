import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ax from '../../../service/ax';
import './extrato.css'

class Extrato extends Component{
    constructor(props){
        super(props);
        this.state = {
            saldo: [],
            recebivel: [],
            bank_account_id: '',
            recipient_id: '',
            click: 0,
            title_recebedor: 'Selecione o recebedor'
        };

        this.saque = this.saque.bind(this);
        this.consultaSaldo = this.consultaSaldo.bind(this);
        this.recebiveis = this.recebiveis.bind(this);
    }

    recebiveis(){
        ax.get('http://localhost:8081/pagarme/recipients')
        .then( success => 
            
           success.data.map( item => ({
                bank_account_id: item.bank_account.id,
                recipient_id: item.id,
                legal_name: item.bank_account.legal_name
            }))
         )
        .then( items => {
            this.setState({
                recebivel: items
            })
        } );
    }

    consultaSaldo(){
        ax.get('http://localhost:8081/pagarme/saldo/principalReceb')
        .then( client => {
            console.log('saldo: ', client.data)
            // formatação numero de saldo disponivel
            let num_available = client.data.available.amount
            let a = (num_available/100);
            let new_num_available = a.toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });

            // formatação numero de saldo tranferido
            let num_transferred = client.data.available.amount;
            let an = (num_transferred/100);
            let new_num_transferred = an.toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });

            // formatação numero de saldo em espera
            let num_waiting = client.data.waiting_funds.amount;
            let cont = (num_waiting/100);
            let new_num_wating = cont.toLocaleString('pt-br', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
        
            this.setState({ saldo: {
                waiting_funds: new_num_wating,
                transferred: new_num_transferred,
                available: new_num_available
            } })
            
        } )

    }

    

    saque(){
        const { bank_account_id, recipient_id } = this.state;
        const { available } = this.state.saldo;

        ax.post('http://localhost:8081/pagarme/saque/transfers', {
            amount: available,
            bank_account_id: bank_account_id,
            recipient_id: recipient_id
        })
        .then( success => console.log(' Saque realzado ', success) )
        .catch( err => console.log('Houve um erro ao realizar o saque: ', err) );
    }

    componentDidMount(){
        this.consultaSaldo();
        this.recebiveis();
    }

    render(){
        const { waiting_funds, available } = this.state.saldo;
        const { recebivel, click } = this.state;

        return(
            <div>
                <h1 id="extrato_title_h1">Extrato</h1>
                <div id="container_geral_recebedores" >
                    <div>
                        
                        
                        <div id="container_recebedores" >
                            <div id="container_recebedores_selecao">
                                <h3 id="title_h3_selecao" onClick={ e => this.setState({ click: 1 }) } >{this.state.title_recebedor}</h3>

                                { click === 1 ?  recebivel.map( recebiveis => (
                                    <label id="p_recebiveis" key={recebiveis.recipient_id} onClick={() => {
                                        this.setState({
                                            bank_account_id: recebiveis.bank_account_id,
                                            recipient_id: recebiveis.recipient_id,
                                            click: 0,
                                            title_recebedor: recebiveis.legal_name
                                        })
                                    }}> {recebiveis.legal_name} </label>
                                ) ): (
                                    null
                                ) }
                            </div>

                            <Link to="/dashboard/conta_bank" ><button id="btn_adc_conta">adicionar conta bancária</button></Link>
                            <button id="btn_saque" onClick={this.saque}>Realizar saque</button>
                            
                        </div>  

                        <div id="container_saque">
                            <div id="container_saldo_disponivel">
                                <h3 className="title_h3_saldo">Saldo disponível</h3>
                                <label id="label_saldo_disponivel"> {`${available}`}</label>
                            </div>
                            
                            <div id="container_saldo_pendente">
                                <h3 className="title_h3_saldo">Saldo a receber</h3>
                                <label id="label_saldo_pendente"> {`${waiting_funds}`}</label>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Extrato;
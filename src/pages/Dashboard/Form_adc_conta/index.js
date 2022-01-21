import React, { Component } from 'react';
import ax from '../../../service/ax';
import './conta.css';

class ContaBank extends Component{
    constructor(props){
        super(props);
        this.state={
            bankCode: '',
            agencia: '',
            agenciaDv: '',
            conta: '',
            contaDv: '',
            legalName: '',
            documentNumber: '',
            click: 0,
            verificar: false,
            errors: [],
        }
        this.verificate = this.verificate.bind(this);
    }

    verificate(){
        const { bankCode, agencia, agenciaDv, 
            conta, contaDv, legalName, 
            documentNumber } = this.state;

        let erros = [];
        let verificado = false;

        if(bankCode === ''){
            erros.push('codigo do banco não inserido !');
            verificado = false;
        } else {
            verificado = true;
        }

        if(agencia === ''){
            erros.push('Agência não inserida !');
            verificado = false;
        } else {
            verificado = true;
        }

        if( agenciaDv === '' ){
            erros.push('Digito de verificação de agência não inserido !');
            verificado = false;
        } else {
            verificado = true;
        }

        if( conta === '' ){
            erros.push('Conta não inserida !');
            verificado = false;
        } else {
            verificado = true;
        }

        if( contaDv === '' ){
            erros.push('Digito verificador da conta não inserido !');
            verificado = false;
        } else {
            verificado = true;
        }

        if( legalName === '' ){
            erros.push('Nome não inserido !');
            verificado = false;
        }

        if( documentNumber === '' ){
            erros.push('documento não inserido');
            verificado = false;
        } else {
            verificado = true;
        }

        this.setState({
             errors: erros,
             verificar: verificado
         });
    }

    bank(){
        const { bankCode, agencia, agenciaDv, 
            conta, contaDv, legalName, 
            documentNumber } = this.state;

        ax.post('http://localhost:8081/pagarme/contaBank', {
            bankCode: bankCode,
            agencia: agencia,
            agenciaDv: agenciaDv,
            conta: conta,
            contaDv: contaDv,
            legalName: legalName,
            documentNumber: documentNumber
        })
        .then( success => console.log('conta criada: ', success) )
        .catch( err => console.log('Houve um erro ao criar banco: ', err) );
    }

    render(){
        return(
            <div>
                <div id="container_forms_bank">
                    <h1 id="title_formulario_bank" >Conta bancária</h1>

                    <div id="field_errors">
                        {this.state.errors !== '' || this.state.errors !== [] ? (
                            <div >
                                {this.state.errors.map( item => {
                                    return(
                                        <div id="container_erros">
                                            <label id="paragrafo item" > {item}</label>
                                        </div>
                                    );
                                } )}
                            </div>
                        ):(
                            null
                        ) }
                    </div>

                    <form id="formulario_bank">
                            <label className="label_bank_form">Código bancário</label>
                            <input type="number" id="bank_code" className="input_bank_forms"
                                placeholder="Dígitos que identificam cada banco"    onChange={ e => this.setState({ bankCode: e.target.value }) }/>

                            <label className="label_bank_form">Agência</label>
                            <input type="number" id="agencia" className="input_bank_forms"
                                placeholder="Número da agência bancária"    onChange={ e => this.setState({ agencia: e.target.value }) }/>

                            <label className="label_bank_form">Verificador da agência</label>
                            <input type="number" id="agencia_v" className="input_bank_forms"
                                placeholder="Dígito verificador da agência"    onChange={ e => this.setState({ agenciaDv: e.target.value }) }/>
                            
                            <label className="label_bank_form">Conta</label>
                            <input type="number" id="conta" className="input_bank_forms"
                                placeholder="Número da conta"    onChange={ e => this.setState({ conta: e.target.value }) }/>

                            <label className="label_bank_form">Digito verificador da conta</label>
                            <input type="number" id="conta_V" className="input_bank_forms"
                                placeholder="Dígito verificador da conta"    onChange={ e => this.setState({ contaDv: e.target.value }) }/>

                            <label className="label_bank_form">Número de documento</label>
                            <input type="number" id="documento" className="input_bank_forms"
                                placeholder="CPF ou CNPJ do favorecido"    onChange={ e => this.setState({ documentNumber: e.target.value }) }/>

                            <label className="label_bank_form">Nome</label>
                            <input type="number" id="nome_legal" className="input_bank_forms"
                                placeholder="Nome/razão social do favorecido"    onChange={ e => this.setState({ legalName: e.target.value }) }/>
                            
                        </form>

                        {this.state.verificar === false ? (
                            <button id="btn_criar_bank" onClick={this.verificate}>verificar</button>
                        ):(
                            <button id="btn_criar_bank" onClick={this.bank}>Extornar boleto</button>
                        )}  
                </div> 
            </div>
        );
    }
}

export default ContaBank;
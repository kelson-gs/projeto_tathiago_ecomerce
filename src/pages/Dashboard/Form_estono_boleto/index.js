import React, { Component } from 'react';
import ax from '../../../service/ax';
import './form_boleto.css';

class FormEstornoBoleto extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            codeb: '',
            ag: '',
            agdv: '',
            conta: '',
            contadv: '',
            legaln: '',
            docnumber: '',
            type: 'Selecione o tipo de conta...',
            click: 0,
            tipos: [
                'conta corrente', 'conta poupanca',
                'conta corrente conjunta', 'conta poupanca conjunta'
            ],
            errors: [],
            verificar: false
        }
        this.estornoBoleto = this.estornoBoleto.bind(this);
        this.verificate = this.verificate.bind(this);
    }

    verificate(){
        const { codeb, ag, agdv, 
            conta, contadv, legaln, 
            docnumber, type 
        } = this.state;

        let erros = [];
        let verificado = false;

        if(codeb === ''){
            erros.push('codigo do banco não inserido !');
            verificado = false;
        } else {
            verificado = true;
        }

        if(ag === ''){
            erros.push('Agência não inserida !');
            verificado = false;
        } else {
            verificado = true;
        }

        if( agdv === '' ){
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

        if( contadv === '' ){
            erros.push('Digito verificador da conta não inserido !');
            verificado = false;
        } else {
            verificado = true;
        }

        if( legaln === '' ){
            erros.push('Nome não inserido !');
            verificado = false;
        }

        if( docnumber === '' ){
            erros.push('documento não inserido');
            verificado = false;
        } else {
            verificado = true;
        }

        if( type === '' ){
            erros.push('tipo não especificado !');
            verificado = false;
        } else {
            verificado = true;
        }

        this.setState({
             errors: erros,
             verificar: verificado
         });
    }

    estornoBoleto(){
        const { id, codeb, ag, agdv, 
            conta, contadv, legaln, 
            docnumber, type 
        } = this.state;


        ax.post(`http://localhost:8081/pagarme/transation/boleto/refund`, {
            id: id,
            codeb: codeb,
            ag: ag,
            agdv: agdv,
            conta: conta,
            contadv: contadv,
            legaln: legaln,
            docnumber: docnumber,
            type: type,
           
        })
        .then( success => console.log('Estorno de boleto realizado com sucesso: ', success) )
        .catch( err => console.log( 'Houve um erro ao estornar o boleto: ', err ) );
    }


    render(){
        const { type, click } = this.state;

        return(
            <div id="container_forms_boleto">
                <div id="sub_container_boleto">
                    <h1 id="title_formulario_boleto">Formulário de estorno do boleto</h1>
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
                    <form id="formulario_boleto">
                        <label className="label_boleto_form">Código bancário</label>
                        <input type="number" id="bank_code" className="input_boleto_forms"
                            placeholder="Dígitos que identificam cada banco"    onChange={ e => this.setState({ codeb: e.target.value }) }/>

                        <label className="label_boleto_form">Agência</label>
                        <input type="number" id="agencia" className="input_boleto_forms"
                            placeholder="Número da agência bancária"    onChange={ e => this.setState({ ag: e.target.value }) }/>

                        <label className="label_boleto_form">Verificador da agência</label>
                        <input type="number" id="agencia_v" className="input_boleto_forms"
                            placeholder="Dígito verificador da agência"    onChange={ e => this.setState({ agdv: e.target.value }) }/>
                        
                        <label className="label_boleto_form">Conta</label>
                        <input type="number" id="conta" className="input_boleto_forms"
                            placeholder="Número da conta"    onChange={ e => this.setState({ conta: e.target.value }) }/>

                        <label className="label_boleto_form">Digito verificador da conta</label>
                        <input type="number" id="conta_V" className="input_boleto_forms"
                            placeholder="Dígito verificador da conta"    onChange={ e => this.setState({ contadv: e.target.value }) }/>

                        <label className="label_boleto_form">Número de documento</label>
                        <input type="number" id="documento" className="input_boleto_forms"
                            placeholder="CPF ou CNPJ do favorecido"    onChange={ e => this.setState({ docnumber: e.target.value }) }/>

                        <label className="label_boleto_form">Nome</label>
                        <input type="number" id="nome_legal" className="input_boleto_forms"
                            placeholder="Nome/razão social do favorecido"    onChange={ e => this.setState({ legaln: e.target.value }) }/>

                        <label className="label_boleto_form">tipo</label>
                        <div id="container_type_selected">
                            <label id="label_type_item" onClick={() => this.setState({ click: 1 })} >{type}</label>
                            { click === 1 ? this.state.tipos.map( item => (
                                <label key={item} id="label_items_tipos" onClick={ () => {
                                    this.setState({
                                        type: item,
                                        click: 0
                                    })
                                } } >{item}</label>
                            ) ): (
                                null
                            ) }
                        </div>
                    </form>
                    {this.state.verificar === false ? (
                        <button id="btn_extornar_boleto" onClick={this.verificate}>verificar</button>
                    ):(
                        <button id="btn_extornar_boleto" onClick={this.estornoBoleto}>Extornar boleto</button>
                    )}            
                    
                </div>
                
            </div>
        );
    }
}

export default FormEstornoBoleto;
import React, { Component } from 'react';

import "./boleto.css";
import ax from '../../service/ax';

class Boleto extends Component{
    constructor(props){
        super(props);
        this.state = {
            item: '',
            erros: [],
            validacao: false,
            logado: '',

            external_id: `${localStorage.getItem('myData')}`,
            nome: '',
            email: '',
            cpf: '',
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero_casa: '',
            cep: '',

            freteHabilited: false,
            correios: 0,
            pegar: 0 ,
            frete: 0,
            getCep: false,
            error_frete: [],

            new_metodoCorreio: '',
            new_kg: '',
            new_cep: '',
            msg_frete: ''

        }
        this.verificate = this.verificate.bind(this);
        this.confirm = this.confirm.bind(this);
        this.getNewFrete = this.getNewFrete.bind(this);
       
    }

    getNewFrete(){
        const { getCep, new_metodoCorreio, new_kg, new_cep, item } = this.state;
        let newValueFrete = '';
        let correiosReformError = [];
        let  message = '';
        let validacao = false;

        if(getCep === true ){
            if( new_kg === '' ){
                correiosReformError.push('Kg não inserido!');
                validacao = false;
            } else {
                validacao = true;
            }
        
            if( new_cep === '' ){
                correiosReformError.push('cep não inserido!');
                validacao = false;
            } else {
                validacao = true;
            }
                
            if( new_cep.toString().length < 8 ){
                correiosReformError.push('cep inválido !');
                validacao = false;
            } else {
                validacao = true;
            }
            
            if(validacao === true){
                try {
                        ax.post(`http://localhost:8081/correios/calcPrecoCorreios`,{
                            kg: Number(new_kg),
                            cep: new_cep,
                            servico: new_metodoCorreio,
                            comprimento: item.comprimento,
                            altura: item.altura,
                            largura: item.largura,
                            diametro: item.diametro
                        }).then( (result) => {
                            console.log(result.data[0].Valor);
                            let newVal = result.data[0].Valor;

                            let precoPrazo = `${newVal}`;
                            let precoPrazoModif = precoPrazo.replace(',', '.');

                            if(new_cep !== '45700000'){
                                newValueFrete = Number(precoPrazoModif) * 100;
                            } else {
                                newValueFrete = 0;
                                message = 'frete gratuito'
                            }
                            
                            
                            this.setState({
                                correiosError: correiosReformError,
                                frete: newValueFrete,
                                msg_frete: message
                            })
                            
                        }).catch(error => console.log(error));
                    
                }
                catch(err){
                    console.log(err)
                };
                
            } else {
                validacao = false;
                this.setState({
                    correiosError: [],
                    frete: 0,
                })
                
            }
        }

    }


    confirm(){
        const { 
            nome, email, cpf, external_id,
            estado, cidade,
            bairro, rua, numero_casa, cep,
            item, correios,
         } = this.state;
        
        if(correios === 1){
            var shippingBoleto = {
                nomeS: nome,
                fee: '',
                estadoS: estado,
                cidadeS: cidade,
                bairroS: bairro,
                ruaS: rua,
                numero_casaS: numero_casa,
                cepS: cep
             }
        } else {
            var shippingBoleto = {
                nomeS: '',
                fee: '',
                estadoS: '',
                cidadeS: '',
                bairroS: '',
                ruaS: '',
                numero_casaS: '',
                cepS: ''
             }
        }
        

        ax.post(`http://localhost:8081/pagarme/transactions/boleto`, {
            amount: item.new_preco_avista * item.quant,
            external_id: external_id,
            nome: nome, email: email,
            cpf: cpf,  
            estado: estado, cidade: cidade,
            bairro: bairro, rua: rua,
            numero_casa: numero_casa,
            cep: cep, item: item, shippingBoleto: shippingBoleto
        }).then( (e) => {
            let ident = e.data.id;
            this.props.history.push(`/boleto/${ident}/confirmacao`);
        } ).catch((e) => console.log(e));

        ax.put(`http://localhost:8081/item/${'produtoUp' + item.produtCategory}/${item.id}`, {
            newAvista: `${item.new_preco_avista}`,
            newCartao: `${item.new_preco_cartao}`,
            newQuantidade: `${item.quantidadeExistente - item.quant}`
        }).then((accert) => {
            console.log(accert);
        }).catch((err) => {
            console.log(err);
        })

    }

    verificate(){
        const { 
            nome, email, cpf,
            estado, cidade,
            bairro, rua, numero_casa, cep, correios, pegar
         } = this.state;

        let boletoErrors = [];
        let valido = false;

        function freteVerificateCheck(){
            let freteCheckError = [];

            console.log('correio code: ', correios);
            console.log('pegar code: ', pegar);

            if (correios === 0 && pegar === 0){
                freteCheckError.push('Escolha um método !');
                valido= false;

            } else if( correios === 1 && pegar === 1 ){
                freteCheckError.push('Escolha um único método !');
                valido= false;

            }

            return freteCheckError;
        }

         if(nome === ''){
            boletoErrors.push('Nome não inserido !');
            valido = false;
            
         } else {
            valido = true;
         }

         if(email === ''){
            boletoErrors.push('Email não inserido !');
            valido = false;
            
        } else {
            valido = true;
        }

        if(cpf === ''){
            boletoErrors.push('CPF não inserido !');
            valido = false;
            
        } else {
            valido = true;
        }

        if(estado === ''){
            boletoErrors.push('Estado não inserido !');
            valido = false;
        
        } else {
            valido = true;
        }

        if(cidade === ''){
            boletoErrors.push('Cidade não inserido !');
            valido = false;
            
        } else {
            valido = true;
        }

        if(bairro === ''){
            boletoErrors.push('Bairro não inserido !');
            valido = false;
            
        } else {
            valido = true;
        }

        if(rua === ''){
            boletoErrors.push('Rua não inserido !');
            valido = false;
            
        } else {
            valido = true;
        }

        if(numero_casa === ''){
            boletoErrors.push('Numero da casa não inserido !');
            valido = false;
            
        } else {
            valido = true;
        }

        if(cep === ''){
            boletoErrors.push('CEP não inserido !');
            valido = false;
            
        } else if(cep < 8){
            boletoErrors.push('CEP inválido !');
            valido = false;
            
        } else {
            valido = true;
        }

        if(valido === false){
            valido = false;
            console.log(valido);
            this.setState({
                erros: boletoErrors,
                error_frete: freteVerificateCheck(),
                validacao: valido,
                logado: ''
            });
        } else {
            this.setState({
                erros: boletoErrors,
                error_frete: freteVerificateCheck(),
                validacao: valido,
                logado: localStorage.getItem('myData')
            });
        }
    }

    componentDidMount(){
        this.setState({ item: JSON.parse(localStorage.getItem('items_compras')) })
      
    }
    
    render(){
        const { item, erros, frete } = this.state;
        const valor = (item.new_preco_avista / 100) * item.quant + (frete / 100);

        return(
            <div>
                <div id="container_reprise_produto">
                    <img id="img_reprise" src={item.img} alt="img_produto_compra"/>
                    <p id="name_reprise">{item.name}</p>
                    <label id="preco_reprise" >R$ {valor.toFixed(2)}</label>
                    <label id="quant_reprise">{item.quant}</label>
                </div>

                <div id="container_frete_or_get">
                    <label className="label_frete_checkbox">Correio</label>
                    <input type='checkbox' 
                        onChange={ () => {
                                const {correios} = this.state;

                                if(correios === 1){

                                    this.setState({ 
                                        freteHabilited: true,
                                        correios: 0,
                                        frete: 0
                                    });
                                } else {
                                    console.log(item.cepId)
                                    this.setState({ 
                                        freteHabilited: true,
                                        correios: 1,
                                        frete: item.valorFrete,
                                        getCep: item.cepId
                                    });
                                }
                        } } className="input_frete_checkbox" name="checkbox_frete"/>

                    <label className="label_frete_checkbox" id="label_pegar_na_loja">Pegar na loja</label>
                    <input type='checkbox' 
                        onChange={ () => {
                                const {pegar} = this.state;

                                if(pegar === 1){

                                    this.setState({ 
                                        freteHabilited: true,
                                        pegar: 0
                                    });
                                } else {
                                    this.setState({ 
                                        freteHabilited: true,
                                        pegar: 1,
                                        getCep: false
                                    });
                                }
                        } } className="input_frete_checkbox" name="checkbox_frete"/>
                </div>

                { this.state.msg_frete !== '' ? <label id="title_msg_frete" >{this.state.msg_frete}</label>:null}

                { this.state.getCep === true ? (
                    <div id='container_correios_card'>
                        <label id="label_calcular_prazo_p2" >Por Favor, insire as informações</label>

                        <div id="container_pazo_calc">
                            <select onChange={ (e) => this.setState({ new_metodoCorreio: e.target.value }) } className="item_prazo_correios">
                                <option>
                                    escolha o metodo de envio dos correios
                                </option>
                                <option value="sedex" >
                                    sedex
                                </option>
                                <option value="pac">
                                    pac
                                </option>
                            </select>

                            <input type="number" id="input_peso_correios" className="item_prazo_correios" placeholder="valor do kg ao lado" 
                                    onChange={ (e) => this.setState({ new_kg: e.target.value }) }/>
                            <input type="number" id="input_peso_correios" className="item_prazo_correios" placeholder="cep"
                                    onChange={ (e) => this.setState({ new_cep: e.target.value }) } />
                                            
                            <button onClick={this.getNewFrete} id="btn_calc_correio" className="item_prazo_correios">Calcular</button>

                        </div>
                        
                                    
                    </div>
                ) : (
                    null
                ) }

                <div id="errors_frete_show">
                        {this.state.error_frete !== '' || this.state.error_frete !== [] ? (
                            <div >
                                {this.state.error_frete.map( item => {
                                    return(
                                        <div key={item} id="container_erros">
                                            <label id="paragrafo item" > {item}</label>
                                        </div>
                                    );
                                } )}
                            </div>
                        ):(
                            null
                        ) }
                </div>

                <h2 id="title_explicated" >Preencha todos os campos para realizar a compra. Verifique cada campo com atenção !!</h2>

                <div>
                    
                    <form id="form_boleto">
                        <h1 id="text_form_boleto">Preencha o formulário para gerar o boleto</h1>

                        <div id="field_errors_boleto">
                        { erros !== '' || erros !== [] ? (
                            <div >
                                { erros.map( item => {
                                    return(
                                        <div key={item} id="container_erros_boleto">
                                            <label id="paragrafo item" > {item}</label>
                                        </div>
                                    );
                                } )}
                            </div>
                        ):(
                            null
                        ) }
                        </div>

                        <input type="Text" placeholder="Nome completo" className="input_boleto_form" 
                            onChange={( e => this.setState({ nome: e.target.value }))}/>
                      
                        <input type="email" placeholder="Email" className="input_boleto_form"
                            onChange={( e => this.setState({ email: e.target.value }))}/>

                        <input type="number" placeholder="CPF" className="input_boleto_form"
                            onChange={( e => this.setState({ cpf: e.target.value }))}/>

                        <label id="text_endereço">Endereço de entrega</label>                       

                        <input type="text" placeholder="Estado" className="input_boleto_form"
                            onChange={( e => this.setState({ estado: e.target.value }))}/>
                     
                        <input type="text" placeholder="Cidade" className="input_boleto_form"
                            onChange={( e => this.setState({ cidade: e.target.value }))}/>

                        <input type="text" placeholder="bairro" className="input_boleto_form"
                            onChange={( e => this.setState({ bairro: e.target.value }))}/>
                      
                        <input type="text" placeholder="Rua" className="input_boleto_form"
                            onChange={( e => this.setState({ rua: e.target.value }))}/>
          
                        <input type="number" placeholder="Numero da casa" className="input_boleto_form"
                            onChange={( e => this.setState({ numero_casa: e.target.value }))}/>
         
                        <input type="number" placeholder="CEP" className="input_boleto_form"
                            onChange={( e => this.setState({ cep: e.target.value }))}/>
                        
                    </form>              

                    {this.state.validacao === false && this.state.logado === '' ? (
                    
                        <button id="verificade_boleto_btn" className="btn_boleto_pay" onClick={this.verificate}>Verificar...</button>
                    ) : (
                    
                        <button id="buy_boleto_btn" onClick={this.confirm}  className="btn_boleto_pay" >Confirmar</button>
                    )
                    }
                </div>
            </div>
        );
    }
}

export default Boleto;
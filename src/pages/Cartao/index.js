import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import secret from '../../back-end/config/pagme.json';
import MaskedInput from 'react-text-mask';
import pagarme from 'pagarme';
import ax from '../../service/ax';
import './cartao.css';


class Cartao extends Component{
    constructor(props){
        super(props);
        this.state = {
            logado: '',
            item: '',
            card_number: '', 
            card_cvv: '', 
            card_expiration_month: '', 
            card_expiration_year: '',
            card_holder_name: '',
            installment: '',
            
            external_id: `${localStorage.getItem('myData')}`,
            cust_name: '',
            cust_email: '',
            cust_country: '',
            cust_type_person: 'Selecione o tipo de pessoa de compra',
            cust_type_document: 'Selecione o tipo de documento',
            cust_number_document: '', 
            cust_phone_number: '',
            cust_ano: '',
            cust_mes: '',
            cust_dia: '',
            
            shi_name: '',
            shi_country: '',
            shi_state: '',
            shi_city: '',
            shi_neighborhood: '',
            shi_street: '',
            shi_street_number: '',
            shi_zipcode: '',
          
            bill_name: '',
            bill_country: '',
            bill_state: '',
            bill_city: '',
            bill_neighborhood: '',
            bill_street: '',
            bill_street_number: '',
            bill_zipcode: '',

            text_type: '',
            click: '',
            text_type_document: '',
            click_d: '',

            card_errors: [],
            customer_errors: [],
            shipping_errors: [],
            billing_errors: [],
            correiosError: [],

            verificado: false,
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

        this.formSubmit = this.formSubmit.bind(this);
        this.verification = this.verification.bind(this);
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

    

    verification(){
        const { card_number, card_cvv, 
            card_expiration_month, card_expiration_year,
            card_holder_name, freteHabilited } = this.state;

        const {shi_name, shi_country, shi_state, shi_city,
            shi_neighborhood, shi_street,
            shi_street_number, shi_zipcode,} = this.state;

        const {bill_name, bill_country, bill_state, bill_city,
            bill_neighborhood, bill_street,
            bill_street_number, bill_zipcode,} = this.state;

        const {cust_name, cust_email,
            cust_country, cust_type_person, cust_type_document,
            cust_number_document, cust_phone_number,cust_ano,
            cust_mes, cust_dia, installment} = this.state;
        
        const { correios, pegar, frete } = this.state;

        
            if(cust_phone_number !== ''){
                
                let numbe1 = cust_phone_number.replace('(', '');
                let numbe2 = numbe1.replace(')', '');
                let numbe3 = numbe2.replace('-', '');
        
                this.setState({
                    cust_phone_number: numbe3
                });
        
                console.log(numbe3);


            }
            
        let validade = false;
        let valueCep = false;

        function freteVerificateCheck(){
            let freteCheckError = [];

            console.log('correio code: ', correios);
            console.log('pegar code: ', pegar);

            if (correios === 0 && pegar === 0){
                freteCheckError.push('Escolha um método !');
                validade= false;

            } else if( correios === 1 && pegar === 1 ){
                freteCheckError.push('Escolha um único método !');
                validade= false;

            }

            if(correios === 1 ){
                if(frete === 0){
                    valueCep = true; 
                }
            }

            return freteCheckError;
        }

        console.log('correios erros check: ',freteVerificateCheck())
    
        function card(){
            let cardError = [];
            

            if(card_number === ''){
                cardError.push('Numero do cartão não inserido!');

                validade = false; 
               
            } else {
                
                validade = true; 
                
            }

            if(card_holder_name === ''){
                cardError.push('Nome não inserido!');
                
                validade = false;
               
            } else {
                validade = true;
            }

            if(card_expiration_month === ''){
                cardError.push('Mês de expiração do cartão não inserido!');
                
                validade = false;
            } else {
                validade = true;
            }

            if(card_expiration_year === ''){
                cardError.push('Ano de expiração do cartão não inserido!');
                
                validade = false;
            } else {
                validade = true;
            }

            if(card_cvv === ''){
                cardError.push('Código de segurança do cartão não inserido!');
                
                validade = false;
            } else {
                validade = true;
            }

            if(installment === ''){
                cardError.push(' Quantidade de parcelas não inserida! ');
                
                validade = false;
            } else {
                validade = true;
            }

            return cardError;

        }

        function customer(){
            let customerError = [];
           

            if(cust_name === ''){
                customerError.push(' Nome não inserido ! ');

                validade = false;
            } else {
                validade = true;
            }

            if(cust_email === ''){
                customerError.push(' Email não inserido ! ');

                validade = false;
                
            } else {
                validade = true;
            }

            if(cust_country === ''){
                customerError.push(' País não inserido ! ');

                validade = false;
                
            } else {
                validade = true;
            }

            if(cust_country === ''){
                customerError.push(' País não inserido ! ');

                validade = false;
               
            } else {
                validade = true;
            }

            if(cust_type_person === ''){
                customerError.push(' Tipo de pessoa não inserido ! ');

                validade = false;
             
            } else {
                validade = true;
            }

            if(cust_type_document === ''){
                customerError.push(' Tipo de documento não inserido ! ');

                validade = false;
               
            } else {
                validade = true;
            }

            if(cust_number_document === ''){
                customerError.push(' Documento não inserido ! ');

                validade = false;
              
            } else {
                validade = true;
            }

            if(cust_phone_number === ''){
                customerError.push(' Telefone não inserido ! ');

                validade = false;
                
            } else {
                validade = true;
            }

            if(cust_dia === ''){
                customerError.push(' Dia de aniversário não inserido ! ');

                validade = false;
                
            } else {
                validade = true;
            }

            if(cust_mes === ''){
                customerError.push(' Mes de aniversário não inserido ! ');

                validade = false;
                
            } else {
                validade = true;
            }

            if(cust_ano === ''){
                customerError.push(' Ano de aniversário não inserido ! ');

                validade = false;
               
            } else {
                validade = true;
            }
            return customerError;
        }

        function shipping(){
            let shippingError = [];
            
            if(freteHabilited === true){
                if( shi_name === '' ){
                    shippingError.push('Nome do recebedor não inserido !');
    
                    validade = false;
                    
                } else {
                    validade = true;
                }
    
                if( shi_country === '' ){
                    shippingError.push('País não inserido !');
    
                    validade = false;
                   
                } else {
                    validade = true;
                }
    
                if( shi_state === '' ){
                    shippingError.push('Estado não inserido !');
    
                    validade = false;
                } else {
                    validade = true;
                }
    
    
                if( shi_city=== '' ){
                    shippingError.push('Cidade não inserido !');
    
                    validade = false;
                   
                } else {
                    validade = true;
                }
    
                if( shi_neighborhood === '' ){
                    shippingError.push('Bairro não inserido !');
    
                    validade = false;
                
                } else {
                    validade = true;
                }
    
                if( shi_street === '' ){
                    shippingError.push('Rua não inserido !');
    
                    validade = false;
                    
                } else {
                    validade = true;
                }
    
                if( shi_street_number === '' ){
                    shippingError.push('Número da casa não inserido !');
    
                    validade = false;
                  
                } else {
                    validade = true;
                }
    
                if( shi_zipcode === '' ){
                    shippingError.push('CEP não inserido !');
    
                    validade = false;
                
                } else if (shi_zipcode.toString().length < 8){
                    shippingError.push('CEP inválido !');
    
                    validade = false;
                    
                } else {
                    validade = true;
                }
    
                return shippingError;
            } else {
                return shippingError;
            }
            
        }

        function billing(){
            let billingError = [];
            

            if( bill_name === '' ){
                billingError.push('Nome do pagador não inserido !');

                validade = false;
                
            } else {
                validade = true;
            }

            if( bill_country === '' ){
                billingError.push('País não inserido !');

                validade = false;
                
            } else {
                validade = true;
            }

            if( bill_state === '' ){
                billingError.push('Estado não inserido !');

                validade = false;
            } else {
                validade = true;
            }

            if( bill_city=== '' ){
                billingError.push('Cidade não inserido !');

                validade = false;
              
            } else {
                validade = true;
            }

            if( bill_neighborhood === '' ){
                billingError.push('Bairro não inserido !');

                validade = false;
              
            } else {
                validade = true;
            }

            if( bill_street === '' ){
                billingError.push('Rua não inserido !');

                validade = false;
           
            } else {
                validade = true;
            }

            if( bill_street_number === '' ){
                billingError.push('Número da casa não inserido !');

                validade = false;
                
            } else {
                validade = true;
            }

            if( bill_zipcode === '' ){
                billingError.push('CEP não inserido !');

                validade = false;
               
            } else if (bill_zipcode.toString().length < 8){
                billingError.push('CEP inválido !');

                validade = false;
            } else {
                validade = true;
            }

            return billingError;
        }

        if(validade === false){
            
            validade = false;

            if(freteHabilited === false){
                this.setState({
                    card_errors: card(),
                    customer_errors: customer(),
                    shipping_errors: shipping(),
                    billing_errors: billing(),
                    error_frete: freteVerificateCheck(),
                    verificado: validade,
                    getCep: valueCep,
                    logado: ''
        
                });
            } else {
                this.setState({
                    card_errors: card(),
                    customer_errors: customer(),
                    billing_errors: billing(),
                    error_frete: freteVerificateCheck(),
                    verificado: validade,
                    logado: ''
        
                });
            }
            
        } else {
            if(freteHabilited === false){
                this.setState({
                    card_errors: card(),
                    customer_errors: customer(),
                    shipping_errors: shipping(),
                    billing_errors: billing(),
                    error_frete: freteVerificateCheck(),
                    verificado: validade,
                    logado: localStorage.getItem('myData')
        
                });
            } else {
                this.setState({
                    card_errors: card(),
                    customer_errors: customer(),
                    billing_errors: billing(),
                    error_frete: freteVerificateCheck(),
                    verificado: validade,
                    logado: localStorage.getItem('myData')
        
                });
            }
        }

    }

    

    formSubmit(event){
        event.preventDefault();

        const {shi_name, shi_country, shi_state, shi_city,
            shi_neighborhood, shi_street,
            shi_street_number, shi_zipcode,} = this.state;

        const {bill_name, bill_country, bill_state, bill_city,
            bill_neighborhood, bill_street,
            bill_street_number, bill_zipcode,} = this.state;

        const {external_id, cust_name, cust_email,
            cust_country, cust_type_person, cust_type_document,
            cust_number_document, cust_phone_number,cust_ano,
            cust_mes, cust_dia, installment, item} = this.state;

        const billing = {
            name: bill_name,
            adress: {
                country: bill_country,
                state: bill_state,
                city: bill_city,
                neighborhood: bill_neighborhood,
                street: bill_street,
                street_number: bill_street_number,
                zipcode: bill_zipcode
            }
        }

        const customer = {
            external_id: external_id,
            name: cust_name,
            email: cust_email,
            country: cust_country,
            type: cust_type_person,
            documents: [
                {
                    type: cust_type_document,
                    number: cust_number_document
                }
            ],
            phone_number: cust_phone_number,
            birthday: `${cust_ano}-${cust_mes}-${cust_dia}`
        }



        const shipping = {
            name: shi_name,
            fee: item.valorFrete,
            adress: {
                country: shi_country,
                state: shi_state,
                city: shi_city,
                neighborhood: shi_neighborhood,
                street: shi_street,
                street_number: shi_street_number,
                zipcode: shi_zipcode
            }
        }

        const itens = {
            id: item.id,
            title: item.name,
            quantity: item.quant,
            unit_price: item.new_preco_cartao
        }

        let transacao = {
            id_externo: external_id,
            nome: cust_name,
            email: cust_email,
            cidade: shi_city,
            tipo: cust_type_person,
            telefone: cust_phone_number,
            item: item.name,
            quantidade: item.quant,
            valor: item.new_preco_cartao
        }

        let { 
            card_number, 
            card_cvv, 
            card_expiration_month, 
            card_expiration_year,
            card_holder_name 
         } = this.state;

        let card = {};
        card.card_holder_name = card_holder_name;
        card.card_expiration_date = `${card_expiration_month}${card_expiration_year}`;
        card.card_number = card_number;
        card.card_cvv = card_cvv;
        
         
        // pegar os erros de validação nos campos do form e a bandeira do cartão
        let cardValidations = pagarme.validate({card: card});

        // Então você pode verificar se algum campo não é válido
        if( !cardValidations.card.card_number ){
            alert('número de cartão incorreto');
            console.log('Oops, número de cartão incorreto');

        }

        // Mas caso esteja tudo certo, você pode seguir o fluxo
        pagarme.client.connect({ encryption_key: secret.cryted_key })
        .then( client => client.security.encrypt(card) )
        .then( card_hash => { 
            console.log(card_hash);
            // o próximo passo aqui é enviar o card_hash para seu servidor, e 
            // em seguida criar a transação/assinatura
            ax.post('http://localhost:8081/pagarme/transactions', {
                card_hash: card_hash,
                customer: customer,
                shipping: shipping,
                billing: billing,
                installment: installment,
                valor: item.new_preco_cartao * item.quant,
                item: itens
            }).then(()=>{
                console.log('card_hash process successfull');
            }).catch( err => console.log(err) )

            ax.put(`http://localhost:8081/item/${'produtoUp' + item.produtCategory}/${item.id}`, {
                newAvista: `${item.new_preco_avista}`,
                newCartao: `${item.new_preco_cartao}`,
                newQuantidade: `${item.quantidadeExistente - item.quant}`
            }).then((accert) => {
                console.log(accert);
            }).catch((err) => {
                console.log(err);
            });

            ax.post('http://localhost:8081/transacaoDb/createTransacao', {
                nome: transacao.nome,
                id_externo: transacao.id_externo,
                email: transacao.email,
                tipo: transacao.tipo,
                cidade: transacao.cidade,
                item: transacao.item,
                quantidade: transacao.quantidade,
                telefone: transacao.telefone,
                valor: transacao.valor
            }).then( (success) => {
                console.log('Transação gravada com sucesso!!')
            } ).catch( (err) => {
                console.log('houve um erro ao gravar a transação !!')
            } )

        } )
        
        this.props.history.push("/card/confirmacao");
        return false;
    }

    componentDidMount(){
        this.setState({ 
            item: JSON.parse(localStorage.getItem('items_compras')) 
        })
    }
    render(){
        const { item, freteHabilited, frete } = this.state;
        const valor = (item.new_preco_cartao / 100) * item.quant + (frete / 100);


        return(
            <div>
               
                <div id="container_reprise_produto">
                    <img id="img_reprise" src={item.img} alt="img_produto_compra"/>
                    <p id="name_reprise">{item.name}</p>
                    <label id="preco_reprise" >R$ {valor.toFixed(2)}</label>
                    <label id="quant_reprise" >{item.quant}</label>
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

                <div id="form_card">
                    <h1 id="text_form_card">Insire os dados do seu cartão de crédito</h1>
                    
                    <div id="field_errors">
                        {this.state.card_errors !== '' || this.state.card_errors !== [] ? (
                            <div >
                                {this.state.card_errors.map( item => {
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
                     
                    <input type="text" placeholder="Número do cartão. EX: 4111111111111111" id="card_number" className="input_card_form"
                        onChange={ (e) => this.setState({ card_number: e.target.value }) }/>
                    
                   
                    <input type="text" placeholder="Nome (como escrito no cartão)" id="card_holder_name" className="input_card_form"
                        onChange={ (e) => this.setState({ card_holder_name: e.target.value }) }/>
                    
                    
                    <input type="text" placeholder="Mês de expiração" id="card_expiration_month" className="input_card_form"
                        onChange={ (e) => this.setState({ card_expiration_month: e.target.value }) }/>
                
                    
                    <input type="text" placeholder="Ano de expiração ( os dois últimos números )" id="card_expiration_year" className="input_card_form"
                        onChange={ (e) => this.setState({ card_expiration_year: e.target.value }) }/>
                    
                    
                    <input type="text" placeholder="Código de segurança" id="card_cvv" className="input_card_form"
                        onChange={ (e) => this.setState({ card_cvv: e.target.value }) }/>
                    
                    <label id="text_quant_card">Quantas vezes quer divirdir ? </label>
                    <input type="number" className="input_card_form" id="input_quant"
                        onChange={ (e) => this.setState({ installment: e.target.value }) } />

                    
                    <br/>
                </div>

                <div id="form_customer">
                    
                    <h1 id='text_form_customer'>Insere os dados do cliente</h1>
                    <div id="field_errors">
                        {this.state.customer_errors !== '' || this.state.customer_errors !== [] ? (
                            <div >
                                {this.state.customer_errors.map( item => {
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
                    <input type="text" placeholder="Nome" className="input_customer"
                        onChange={ (e) => this.setState({ cust_name: e.target.value }) }/>

                    <input type="email" placeholder="Email" className="input_customer"
                        onChange={ (e) => this.setState({ cust_email: e.target.value }) }/>

                    <input type="text" placeholder="País" className="input_customer"
                        onChange={ (e) => this.setState({ cust_country: e.target.value }) } />

                    <label id="text_type_person">Tipo de pessoa: </label>
                    <div id="container_type_person">
                        <h3 id="text_h3_person" onClick={() => this.setState({ click: true })}>{this.state.cust_type_person}</h3>
                        { this.state.click === true ? (
                            <div id="container-person"> 
                                <p className="person_p" onClick={ () => this.setState({ cust_type_person: 'individual', click: false }) }>Individual</p>
                                <p className="person_p" onClick={ () => this.setState({ cust_type_person: 'corporation', click: false }) }>Corporação</p>
                            </div>
                        ):(
                            null
                        )}    
                    </div>
                    

                    <label id="text_type_doc" >Tipo de documento: </label>
                    <div id="container_type_doc">
                        <h3 id="text_h3_doc" onClick={() => this.setState({ click_d: true })}>{this.state.cust_type_document}</h3>
                            { this.state.click_d === true ? (  
                                <div id="container-doc">
                                    <p className="doc_p" onClick={ () => this.setState({ cust_type_document: 'cpf', click_d: false }) }>CPF</p>
                                    <p className="doc_p" onClick={ () => this.setState({ cust_type_document: 'cnpj', click_d: false }) }>CNPJ</p>
                                </div>      
                            ):(
                                null
                            )}
                    </div>
                    

                    <label id="text_doc_label" >documento: </label>
                    <input type="number" placeholder="Número de CPF / CNPJ" className="input_customer"
                        onChange={ (e) => this.setState({ cust_number_document: e.target.value }) }/>
                    
                    <MaskedInput className="input_customer" 
                        mask={['(',/[1-9]/,  /\d/, ')', /\d/, /\d/,/\d/, /\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/]} placeholder="(ddd)98888-8888" id="date" 
                        onChange={ (e) => this.setState({ cust_phone_number: e.target.value }) } />
                    
                    <label id="text_birthday">data de aniversário: </label>
                    <div id="container_birthday">
                        <input type="number" placeholder="Dia" id="input_dia" className="input_customer"
                            onChange={ (e) => this.setState({ cust_dia: e.target.value })}/>
                        <label  className="barra"> /</label>
                        <input type="number" placeholder="mês" id="input_mes" className="input_customer"
                            onChange={ (e) => this.setState({ cust_mes: e.target.value })}/>
                        <label className="barra" > /</label>
                        <input type="number" placeholder="Ano" id="input_ano" className="input_customer"
                            onChange={ (e) => this.setState({ cust_ano: e.target.value })}/>
                    </div>
                   
                </div>


                <div id="form_billing" >
                    <h1 id='text_form_billing' >Insire os dados de cobrança / billing ( dados de onde é cobrado ou cobrará a fatura ) </h1>
                    <div id="field_errors">
                        {this.state.billing_errors !== '' || this.state.billing_errors !== [] ? (
                            <div >
                                {this.state.billing_errors.map( item => {
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
                    <input type="text" placeholder="Nome do pagador" className="input_billing"
                        onChange={ (e) => this.setState({ bill_name: e.target.value }) }/>

                    <label id="text_type_address" >Endereço </label>
                    
                    <input type="text" placeholder="País" className="input_billing"
                        onChange={ (e) => this.setState({ bill_country:  e.target.value }) } />

                    
                    <input type="text" placeholder="Estado" className="input_billing"
                        onChange={ (e) => this.setState({ bill_state: e.target.value }) }/>

                    
                    <input type="text" placeholder="Cidade" className="input_billing"
                        onChange={ (e) => this.setState({ bill_city: e.target.value }) }/>

                    
                    <input type="text" placeholder="Bairro" className="input_billing"
                        onChange={ (e) => this.setState({ bill_neighborhood: e.target.value }) }/>

                   
                    <input type="text" placeholder="Rua"className="input_billing"
                        onChange={ (e) => this.setState({ bill_street: e.target.value }) }/>

                   
                    <input type="number" placeholder="Numero" className="input_billing"
                        onChange={ (e) => this.setState({ bill_street_number: e.target.value }) }/>

                   
                    <input type="number" placeholder="CEP" className="input_billing"
                        onChange={ (e) => this.setState({ bill_zipcode: e.target.value }) }/>
                </div>

                {freteHabilited === true ? (
                    <div id="form_shipping" >
                        <h1 id='text_form_shipping' >Insire dados de entrega / shipping</h1>
                        <div id="field_errors">
                            {this.state.shipping_errors !== '' || this.state.shipping_errors !== [] ? (
                                <div >
                                    {this.state.shipping_errors.map( item => {
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
                        
                        <input type="text" placeholder="Nome do recebedor" className="input_shipping"
                            onChange={ (e) => this.setState({ shi_name: e.target.value }) }/>

                        <label id="text_type_address" >Endereço </label>
                        
                        <input type="text" placeholder="País" className="input_shipping"
                            onChange={ (e) => this.setState({ shi_country: e.target.value }) } />

                        <input type="text" placeholder="Estado" className="input_shipping"
                            onChange={ (e) => this.setState({ shi_state: e.target.value }) }/>

                        <input type="text" placeholder="Cidade" className="input_shipping"
                            onChange={ (e) => this.setState({ shi_city: e.target.value }) }/>

                        <input type="text" placeholder="Bairro" className="input_shipping"
                            onChange={ (e) => this.setState({ shi_neighborhood: e.target.value }) }/>

                        <input type="text" placeholder="Rua" className="input_shipping"
                            onChange={ (e) => this.setState({ shi_street: e.target.value }) }/>

                        <input type="number" placeholder="Numero" className="input_shipping"
                            onChange={ (e) => this.setState({ shi_street_number: e.target.value }) }/>

                        <input type="number" placeholder="CEP" className="input_shipping"
                            onChange={ (e) => this.setState({ shi_zipcode: e.target.value }) } />
                    </div>
                ):(
                    null
                )}
                
                {this.state.verificado === false && this.state.logado === '' ? (
                    
                    <button id="verificade_btn" className="btn_card_pay" onClick={this.verification}>Verificar...</button>
                ) : (
                    
                    <Link to="/card/confirmacao"  ><button id="buy_btn" onClick={this.formSubmit}  className="btn_card_pay" >Comprar</button></Link>
                )
                }
            </div>
        );
    }
}

export default Cartao;
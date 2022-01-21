import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './controlesProduto.css';
import ax from '../../service/ax';
import NavHsc from '../../componentes/Nav_hsc';

class ProdutoControle extends Component{
    constructor(props){
        super(props);
        this.state = {
            adm: this.admMessage(),
            id: this.props.match.params.id,
            newAvista: '',
            newCartao: '',
            newQuantidade: '',
            newQuantidadeError: '',
            preco_radio_input: '',
            metodo_seleciodado: '',
            image: '',
            comprar: false,
            item: [],
            item_parcela: [],
            parcelas: false,
            prazo: false,
            valorPrazo: '',
            metodoCorreio: '',
            cep: '',
        }
        this.updatePreco = this.updatePrecoEquantidade.bind(this);
        this.getOneItem = this.getOneItem.bind(this);
        this.adccar = this.adccar.bind(this);
        this.cartao = this.cartao.bind(this);
        this.boleto = this.boleto.bind(this);
        this.calculoParcelas = this.calculoParcelas.bind(this);
        this.calculoParcelasComFrete = this.calculoParcelasComFrete.bind(this);
        this.calculoFrete = this.calculoFrete.bind(this);
        this.changeParcela = this.changeParcela.bind(this);
    }

    calculoFrete(){
        const { cep, metodoCorreio, item } = this.state;
        let correiosError = [];
        let validacao = false;
       
    
        if( cep === '' ){
            correiosError.push('cep não inserido!');
            validacao = false;
        } else {
            validacao = true;
        }
            
        if( cep.toString().length < 8 ){
            correiosError.push('cep inválido !');
            validacao = false;
        } else {
            validacao = true;
        }
        
        if(validacao === true){
            try {
                if(cep === '45700000'){
                    this.setState({ valorPrazo: '00' })
                } else {
                    ax.post(`http://localhost:8081/correios/calcPrecoCorreios`,{
                        kg: Number(item.info4),
                        cep: cep,
                        servico: metodoCorreio,
                        comprimento: 18,
                        altura: 9,
                        largura: 27,
                        diametro: 54, 
                    }).then( (result) => {
                        this.setState({ 
                            valorPrazo: result.data[0].Valor,
                         })
                    }).catch(error => console.log(error));
                }
            }
            catch(err){
                console.log(err)
            };
            
        } else {
            validacao = false;
        }
    }

    changeParcela(){
        const { parcelas, valorPrazo } = this.state;

        if( parcelas === true ){
            this.setState({ 
                parcelas: false,
                item_parcela: []
             });
             
        } else {
            this.setState({ parcelas: true });
            if(valorPrazo === ''){
                this.calculoParcelas();
            } else {
                this.calculoParcelasComFrete();
            }
            
        }
    }

    async calculoParcelas(){
        
        const { cartao } = await this.state.item;
        let preco_cartao = cartao * 100;

        if(preco_cartao !== undefined){
            if(cartao < 100){
                ax.get(`http://localhost:8081/pagarme/${preco_cartao}/calculate_installments_amount/${2}`)
                .then( item => {
                    const items = [];
                    for(const propriety in item.data.installments){
                        items.push( item.data.installments[propriety])
                    }
                    this.setState({ item_parcela: items });
                    
                } )
                .catch( err => console.log(err));
            } else if(cartao >= 100){
                ax.get(`http://localhost:8081/pagarme/${preco_cartao}/calculate_installments_amount/${3}`)
                .then( item => {
                    const items = [];
                    for(const propriety in item.data.installments){
                        items.push( item.data.installments[propriety])
                    }
                    this.setState({ item_parcela: items });
                    
                } )
                .catch( err => console.log(err));
            }
            
        }
    }

    async calculoParcelasComFrete(){
        const { valorPrazo } = this.state;
        const { cartao } = await this.state.item;

        let precoPrazo = `${valorPrazo}`;
        let precoPrazoModif = precoPrazo.replace(',', '.');
        let precoCorreio = Number(precoPrazoModif) * 100;

        let preco_cartao = (cartao * 100) + precoCorreio ;

        if(preco_cartao !== undefined){
            if(cartao < 100){
                ax.get(`http://localhost:8081/pagarme/${preco_cartao}/calculate_installments_amount/${2}`)
                .then( item => {
                    const items = [];
                    for(const propriety in item.data.installments){
                        items.push( item.data.installments[propriety])
                    }
                    this.setState({ item_parcela: items });
                    
                } )
                .catch( err => console.log(err));
            } else if(cartao >= 100){
                ax.get(`http://localhost:8081/pagarme/${preco_cartao}/calculate_installments_amount/${3}`)
                .then( item => {
                    const items = [];
                    for(const propriety in item.data.installments){
                        items.push( item.data.installments[propriety])
                    }
                    this.setState({ item_parcela: items });
                    
                } )
                .catch( err => console.log(err));
            }
            
        }
    }

    cartao(){
        const { newQuantidade, id , valorPrazo, cep} = this.state;
        const { cartao, avista, img, nome, quantidade } = this.state.item;

        let numeroQuantidade = Number(newQuantidade);
        let newValorPrazo = valorPrazo.replace(',', '');
        let cepIdentificate = false;

        console.log(newQuantidade);

        if(cep === '45700000'){
            newValorPrazo = '00'
        }

        if(cep === ''){
            cepIdentificate = true;
        } else {
            cepIdentificate = false;
        }


        if(newQuantidade === '0'){
            numeroQuantidade = 1;
        }

        if(newQuantidade === null || newQuantidade === undefined){
            numeroQuantidade = 1;
        }



        let itemCompras = {
            id_produto: id,
            id: localStorage.getItem('myData'),
            new_preco_cartao:  cartao * 100,
            new_preco_avista: avista * 100,
            quantidadeExistente: quantidade,
            quant: numeroQuantidade,
            valorFrete: Number(newValorPrazo),
            img: `/image/controles/${img}`,
            cepId: cepIdentificate,
            comprimento: 27,
            altura: 18,
            largura: 36,
            diametro: 18,
            name: nome,
            produtCategory: 'Controle'
        }

        localStorage.setItem('items_compras', JSON.stringify(itemCompras));

    }

    boleto(){
        const { newQuantidade, id, valorPrazo, cep } = this.state;
        const { cartao, avista, img, nome, quantidade} = this.state.item;

        let quantidades = Number(newQuantidade);
        let cepIdentificate = false;

        let newValorPrazo = valorPrazo.replace(',', '');
        console.log(newValorPrazo);

        if(cep === '45700000'){
            newValorPrazo = '00'
        }

        if(cep === ''){
            cepIdentificate = true;
        } else {
            cepIdentificate = false;
        }

        if(newQuantidade === '0'){
            quantidades = 1;
        }

        if(newQuantidade === null || newQuantidade === undefined){
            quantidades = 1;
        }

        let itemCompras = {
            id_produto: id,
            id: localStorage.getItem('myData'),
            new_preco_cartao:  cartao * 100,
            new_preco_avista: avista * 100,
            quant: quantidades,
            quantidadeExistente: quantidade,
            valorFrete: Number(newValorPrazo),
            img: `/image/controles/${img}`,
            cepId: cepIdentificate,
            comprimento: 27,
            altura: 18,
            largura: 36,
            diametro: 18,
            name: nome,
            produtCategory: 'Controle'
        }

        localStorage.setItem('items_compras', JSON.stringify(itemCompras));
    }


    adccar(){
        const { id } = this.state;
        const {nome, img, avista} = this.state.item;

        const itemCar = {
            id: id,
            nome: nome,
            img: `/image/controles/${img}`,
            preco: avista,
            diretorio: `/produtoControle/item/${id}`
        };


        let lista = JSON.parse(localStorage.getItem('carrinho') || '[]');
    
        lista.push(itemCar);

        localStorage.setItem('carrinho', JSON.stringify(lista));
        console.log('lista storage' + lista);

        alert('item adicionado ao seu carrinho! Verifique a pagina de usuário.')
        
    }

    async admMessage(){
        const data = localStorage.getItem('myData');
        if(await data ){
            this.setState({adm: data})
        } else {
            this.setState({adm: 'user'})
        }
        
    }

    async updatePrecoEquantidade(){
        const { id , newAvista, newQuantidade, newCartao} = this.state;
        window.location.reload();
        await ax.put(`http://localhost:8081/item/produtoUpControle/${id}`, {
            newAvista: `${newAvista}`,
            newCartao: `${newCartao}`,
            newQuantidade: `${newQuantidade}`
        }).then((accert) => {
            console.log(accert);
        }).catch((err) => {
            console.log(err);
        })
    }


    async getOneItem(){
        const { id } = this.state;
        await ax.get(`http://localhost:8081/item/produtoControle/${id}`).then(response => {
            
            this.setState({item: {
                nome: `${response.data.item.nome}`,
                img: `${response.data.item.img}`,
                info1: `${response.data.item.info1}`,
                info2: `${response.data.item.info2}`,
                info3: `${response.data.item.info3}`,
                info4: `${response.data.item.info4}`,
                avista: `${response.data.item.avista}`,
                cartao: `${response.data.item.cartao}`,
                quantidade: `${response.data.item.quantidade}`
            },
              newAvista: `${response.data.item.avista}`,
              newCartao: `${response.data.item.cartao}`,
              newQuantidade: ``
            })
        }).catch(err => console.log(err));
    }

    componentDidMount(){
        this.getOneItem();
        
    }

    render(){
        const {nome, img, info1, info2, info3,  avista, cartao, quantidade} = this.state.item;
        const { adm, comprar, parcelas,
            prazo, valorPrazo } = this.state;
        const sumirParcelas = {
            visibility: 'hidden'
        }

        return(
            <div>
                <NavHsc/>
                {adm === "admin" ? (
                    <div id="container_one_produto">
                        <div>
                            {quantidade === 0 ? (
                                <div>
                                    <img id="img_produto_controle" src={`/image/controles/${img}`} alt="img_produto"/>
                                    <label id="esgotado">ESGOTADO</label>
                                </div>
                            ):(
                                <img id="img_produto_controle" src={`/image/controles/${img}`} alt="img_produto"/>
                            )}   
                            
                            <table id="table_info_produto" >
                                <tbody>
                                    <tr>
                                        <td>{info1}</td>
                                        <td>{info2}</td>
                                    </tr>
                                    <tr>
                                        <td>{info3}</td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div id="container_compra">
                            <h1 id="title_produto_controle">{nome}</h1>
                            <p id="avista" className="preco_produto_controle" step='0.00'>R$ {avista}</p>
                           
                            <div id="container_upavista">
                                <input type="number" id="input_avista" placeholder={`${avista}`} min="00.00" step="00.00" 
                                    onChange={ (e) => this.setState({ newAvista: e.target.value.replace(',', '.') }) }/>
                                <img id="icon_update_avista" onClick={this.updatePrecoEquantidade} src="/image/icons/upload_icon.svg" alt="icon_img"/>
                            </div>
                            
                            
                            <p id="cartao" className="preco_produto_controle">R$ {cartao}</p>
                            
                            <div id="container_upcartao">
                                <input type="number" id="input_cartao" placeholder={`${cartao}`} min="00.00" step="00.00" 
                                    onChange={ (e) => this.setState({ newCartao: e.target.value.replace(',', '.') }) }/>
                                <img id="icon_update_cartao" onClick={this.updatePrecoEquantidade} src="/image/icons/upload_icon.svg" alt="icon_img"/>
                            </div>

                            <label id="label_quantidade_produto">Quantos deseja?</label>
                            
                            <div id="container_upquantidade">
                                
                                <input type="number" id="input_quantidade_produto" placeholder={`Restam ${quantidade}`} 
                                    onChange={ (e) => this.setState({ newQuantidade: e.target.value.replace(',', '.') }) }/>
                                <img id="icon_update_quantidade" onClick={this.updatePrecoEquantidade} src="/image/icons/upload_icon.svg" alt="icon_img"/>
                            </div>

                        </div>
                        
                    </div>

                ) : (

                    // client view produto
                    <div id="container_one_produto">
                        
                        <div id="container_info_img">
                            {quantidade === 0 ? (
                                <div>
                                    <img id="img_produto_controle" src={`/image/controles/${img}`} alt="img_produto"/>
                                    <label id="esgotado">ESGOTADO</label>
                                </div>
                            ):(
                                <img id="img_produto_controle" src={`/image/controles/${img}`} alt="img_produto"/>
                            )}   
                            
                            <table id="table_info_produto" >
                                <tbody>
                                    <tr>
                                        <td className="td_name">{info1}</td>
                                        <td className="td_name">{info2}</td>
                                    </tr>
                                    <tr>
                                        <td className="td_name">{info3}</td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div id="container_compra">
                            <h1 id="title_produto_controle">{nome}</h1>
                            <p id="cartao" className="preco_produto_controle">R$ {cartao}</p>
                            {cartao <= 100 ? <label id="texto_parcela">Em até 2x sem juros no cartão de crédito</label>: null}
                            {cartao > 100 ? <label id="texto_parcela">Em até 3x sem juros no cartão de crédito</label>: null}

                            <div id="container_parcela">
                                <div id="container_simu">
                                    
                                    {valorPrazo === '' ? (
                                        <label id="simulador" onClick={this.changeParcela}> Simulador de parcelas via cartão...</label>
                                    ):(
                                        <label id="simulador" style={{'fontSize': '10pt'}} onClick={this.changeParcela}>clique aqui e calcule com o valor do frete </label>
                                    )}

                                </div>
                                { parcelas === false ? (
                                    <div className="label_parcelas" style={sumirParcelas}></div>
                                ):(
                                    !this.state.item ? (
                                        <h2>carregando...</h2>
                                    ):(
                                        this.state.item_parcela.map( item => {
                                            const { installment, installment_amount } = item;
                                            const numero = installment_amount / 100;
                                            const new_installment_amount = numero.toFixed(2);

                                            return(
                                               <div key={installment} className="label_parcelas">
                                                    <label className="label_install">{`${installment}x -------- R$ ${new_installment_amount}`}</label>
                                               </div>
                                            );

                                        } )
                                    )
                                    
                                )}
                                
                            </div>

                            <p id="avista" className="preco_produto_controle">R$ {avista}</p>
                            <label id="label_avista">Via boleto</label>

                            {prazo === false ? (
                                <div id='container_correios'> 
                                    <label id="label_calcular_prazo" onClick={ () => this.setState({ prazo: true }) }>Calcular frete</label>
                                </div>
                            ):(
                                <div id='container_correios'>
                                    <label id="label_calcular_prazo_p2" >Calcular frete</label>

                                    <div id="container_pazo_calc">
                                        <select onChange={ (e) => this.setState({ metodoCorreio: e.target.value }) } className="item_prazo_correios">
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

                                        <input type="number" id="input_peso_correios" className="item_prazo_correios" placeholder="cep"
                                            onChange={ (e) => this.setState({ cep: e.target.value }) } />
                                        
                                        <button onClick={this.calculoFrete} id="btn_calc_correio" className="item_prazo_correios">Calcular</button>

                                    </div>
                                    <label id="view_prazo_val" className="item_prazo_correios"> {` R$ ${valorPrazo}`}</label>

                                    
                                </div>
                            )}
                            
                            {quantidade === 0 ? (
                                <label id="label_quantidade_produto">Acabou estoque !! </label>
                            ) : (
                                <div id='container_quantidade'>
                                    <label id="label_quantidade_produto">Quantos deseja?</label>
                                    <input type="number" id="input_quantidade_produto" placeholder={`Restam ${quantidade}`} 
                                        onChange={ (e) => this.setState({ newQuantidade: e.target.value }) }/>
                                    <br/>
                                    {this.state.newQuantidadeError === '' ? 
                                        (
                                            null
                                        ):(
                                            <label id="newQuantidadeError" >{this.state.newQuantidadeError}</label>
                                        )
                                    }
                                </div>
                            )}

                            {quantidade === 0 ? (
                                <div id='container_btn'>
                                    <button id="btn_carrinho" className="btn_produto" onClick={this.adccar}><img src="/image/icons/car_add.png" alt="icon_car_add" /></button>
                                </div>
                            ):(
                                <div id='container_btn'>
                                    {this.state.newQuantidade === '' ? (
                                        <button id="btn_comprar" className="btn_produto" onClick={ () => this.setState({ comprar: false, newQuantidadeError: 'selecione a quantidade que deseja !!' }) } >Comprar</button>
                                    ):(
                                        <button id="btn_comprar" className="btn_produto" onClick={ () => this.setState({ comprar: true, newQuantidadeError: ''}) } >Comprar</button>
                                    )}
                                    <button id="btn_carrinho" className="btn_produto" onClick={this.adccar}><img src="/image/icons/car_add.png" alt="icon_car_add" /></button>
                                </div> 
                            )}
                            
                            
                            { comprar === true ? (
                                <div id="conteinerl">
                                    <label id="selecione_pagamento">Selecione sua forma de pagamento: </label>
                                    <div id="container_link_pagamento" >
                                        <Link to="/formulario/cartao_de_credito"  className="link_pagamento" onClick={this.cartao} ><label id="link_cartao">Cartão de crédito</label></Link>
                                        <Link to="/formulario/boleto" id="link_boleto" className="link_pagamento" onClick={this.boleto}><label id="link_boleto">Boleto</label></Link>
                                    </div>
                                </div>
                            ):(
                                null
                            ) }
                            
                        </div>
                    
                    </div>
                )}
            </div>
        );
    }
}

export default ProdutoControle;


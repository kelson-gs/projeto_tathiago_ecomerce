import React, { Component } from 'react';
import ax from '../../../service/ax';
import './adc.css';
import NavHsc from '../../../componentes/Nav_hsc';


export default class Adc extends Component{
    constructor(props){
        super(props);
        this.state = {
            lista: [
                'antenas', 'baterias', 'carregadores',
                'controles', 'cabos', 'caixas_de_som',
                'conversores', 'extensoes', 'fontes',
                'fones', 'pilhas','receptores', 'roteadores',
                'transformadores', 
            ],
            btn_selection: '',
            btn_selection_top: '',
            imgRef: '',
            imgref_oficial: '',
            nome_produto: '',
            info_1: '',
            info_2: '',
            info_3: '',
            info_4: '',
            quantidade_produto: 0,
            avista: 0,
            cartao: 0,
            categoria: ''
        }
        this.filePreview = this.filePreview.bind(this);
        this.envioFormDashboard = this.envioFormDashboard.bind(this);
    }
    
    filePreview(e){
        const file = e.target.files[0];
        const file_oficial = e.target.value.slice(12);
        this.setState({
            imgRef: URL.createObjectURL(file),
            imgref_oficial: file_oficial
        });
        
    }

    envioFormDashboard(){
        const { 
            btn_selection, btn_selection_top, 
            nome_produto, categoria,
            imgref_oficial, info_1, info_2, info_3,
            info_4, avista, cartao, quantidade_produto } = this.state;

        if (btn_selection !== '' && btn_selection_top !== '') {
            if( btn_selection_top !== ''){
                ax.post(`http://localhost:8081/private/produto/${btn_selection_top}`, {
                    nome: nome_produto,
                    img: imgref_oficial,
                    info1: info_1,
                    info2: info_2,
                    info3: info_3,
                    info4: categoria,
                    quantidade: quantidade_produto,
                    avista: avista,
                    cartao: cartao
                });
            }
            
            if(btn_selection !== ''){
                ax.post(`http://localhost:8081/private/produto/${btn_selection}`, {
                    nome: nome_produto,
                    img: imgref_oficial,
                    info1: info_1,
                    info2: info_2,
                    info3: info_3,
                    info4: info_4,
                    quantidade: quantidade_produto,
                    avista: avista,
                    cartao: cartao
                });
            }
        } else {
            if(btn_selection !== '' && btn_selection_top === '') {
                ax.post(`http://localhost:8081/private/produto/${btn_selection}`, {
                    nome: nome_produto,
                    img: imgref_oficial,
                    info1: info_1,
                    info2: info_2,
                    info3: info_3,
                    info4: info_4,
                    quantidade: quantidade_produto,
                    avista: avista,
                    cartao: cartao
                });
            }

            if(btn_selection === '' && btn_selection_top !== '') {
                ax.post(`http://localhost:8081/private/produto/${btn_selection_top}`, {
                    nome: nome_produto,
                    img: imgref_oficial,
                    info1: info_1,
                    info2: info_2,
                    info3: info_3,
                    info4: categoria,
                    quantidade: quantidade_produto,
                    avista: avista,
                    cartao: cartao
                });
            }
        } 
    }

    render(){
        return(
            <div>
                <NavHsc/>
                {/* parte de selecionador radio do topo */} 
                <nav id='directory_top'>
                    <ul id="ul_lav_directory_top">
                        <li className="list_nav"><input className="input_radio" type="radio" name="produto_especial" value="promocao" 
                        onChange={ (e) => this.setState({ btn_selection_top: e.target.value }) }/>Promoção</li>
                        <li className="list_nav"><input className="input_radio" type="radio" name="produto_especial" value="novosProd" 
                        onChange={ (e) => this.setState({ btn_selection_top: e.target.value }) }/>Produtos na Home </li>
                    </ul>
                </nav>

                {/* parte de selecionador radio a esquerda */}
                <nav id='directory_left'>
                    <ul id='ul_nav_dashboard'>
                        {this.state.lista.map((item) => {
                            return(
                                <li key={item} className="list_nav"><input type="radio" className="input_radio"
                                 name="produto" value={item} 
                                 onChange={(e) => this.setState({ btn_selection: e.target.value })}/>{item}</li>
                            );
                        })}
                    </ul>
                </nav>

                {/* parte da imagem do produto - nome do produto - informações do produto */}
                <div id="adm_part">
                    <form onSubmit={this.envioFormDashboard}>

                        {/* container da imagem do produto + input file */}
                        <div id="img_produto_area">

                            {/* parte da imagem do produto */}
                            <div id="area_img">
                                <img src={this.state.imgRef} id="image_produto" alt="imagem_produto"/>
                            </div>

                            <input type="file" 
                            id="image_file" 
                            ref="file"
                            name="produto_img" 
                            onChange={ this.filePreview }/>  
                        </div>
                        
                        {/* nome do produto  */}
                        <div id="area_name_produto">
                            <label id="label_nome_produto">Nome do produto</label>
                            <input type="text" placeholder="Ex: Tp-link" id="input_nome_produto" name="name_produto" 
                                onChange={ (e) => this.setState({ nome_produto: e.target.value }) }/>
                        </div>
                        
                        {/*  informações do produto */}
                        <div id="area_info_produto">
                            <label id='label_info'>Informações do produto</label>
                            {/* tabela com inputs */}
                            <table>
                                <tbody>
                                    <tr>
                                        <td><input type="text" placeholder="Ex: 300mpbs..." id="input_info_1" className="input_tr"
                                            onChange={ (e) => this.setState({ info_1: e.target.value }) }/></td>
                                        <td><input type="text" placeholder="Ex: garantia 3 anos" id="input_info_2" className="input_tr"
                                            onChange={ (e) => this.setState({ info_2: e.target.value })} /></td>
                                    </tr>
                                    <tr>
                                        <td><input type="text" placeholder="Ex: Dual band..." id="input_info_3" className="input_tr"
                                            onChange={ (e) => this.setState({ info_3: e.target.value }) }/></td>
                                        <td><input type="text" placeholder="Ex: bivolt..." id="input_info_4" className="input_tr"
                                            onChange={ (e) => this.setState({ info_4: e.target.value }) }/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        { this.state.btn_selection_top !== '' ? 
                            (
                                <div id="container-category-prod">
                                    <label id="label-category-prod" >Escreva a categoria do produto aqui:</label>
                                    <input id="prod-category" type="text" onChange={(e) => this.setState({ categoria: e.target.value })} placeholder="Ex: antena" />
                                </div>
                            ):
                            (
                                null
                            )
                        }

                        {/* container com preços do produto */}
                        <div id="area_precos_produto">
                            <label id="label_title_precos" className="label_precos">Preços</label>

                            <label id="label_prazo" className="label_precoss">A prazo</label>
                            <input type="number" placeholder="R$ 00,00" min="00.01" step="00.01" id="preco_produto" className="input_preco"
                                onChange={ (e) => this.setState({ cartao: e.target.value.replace(',', '.') }) }/>
                            <label id='label_avist' className="label_precoss">À vista</label>
                            <input type="number" placeholder="R$ 00,00" min="00.01" step="00.01" id="preco_produto2" className="input_preco"
                                onChange={ (e) => this.setState({ avista: e.target.value.replace(',', '.') }) }/>
                                
                        </div>

                        {/* container da quantidade do produto */}
                        <div id="area_quantidade_produto">
                            <label id="label_quantidade">Quantidade</label>
                            <input type="number" id="input_quantidade" placeholder="00"
                                onChange={(e) => this.setState({ quantidade_produto: e.target.value.replace(',', '.') })}/>
                        </div>

                        
                        <button type="submit" id="btn_adc">Adicionar</button>
                    </form>
                    
                </div>
            </div>

        );
    }
}

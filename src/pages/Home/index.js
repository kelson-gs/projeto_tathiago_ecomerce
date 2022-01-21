import React, { Component } from 'react';

import Nav from '../../componentes/Nav';
import NavHsc from '../../componentes/Nav_hsc';
import ax from '../../service/ax';
import './home.css';

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            adm: this.admMessage(),
            items: [],
            items2: [],
            isLoading: true,
            errors: null
        }
        this.deleteItemPromocao = this.deleteItemPromocao.bind(this);
        this.deleteItemHome = this.deleteItemHome.bind(this);
        this.getOneProduto = this.getOneProduto.bind(this);
    }

    getOneProduto(nome, id, info){
        /* função para colocar a primeirla letra em maiúsculo */
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        let categoria = capitalizeFirstLetter(info);
        

        /* pegar o item do banco e mandar pra outra página */
        console.log(nome);
        ax.get(`http://localhost:8081/item/${info}/${nome}`)
        .then( (negocio) => {
            let ide = negocio.data.item.id;
            this.props.history.push(`/${'produto'+ categoria}/item/${ide}`);
        } ).catch((err) => console.log(err));
    }

    async admMessage(){
        const data = localStorage.getItem('myData');
        if(await data ){
            this.setState({adm: data})
        } else {
            this.setState({adm: 'user'})
        }
        
    }

    async deleteItemPromocao(id){
        
        await ax.delete(`http://localhost:8081/item/produtoDelPromocao/${id}`).then(() => {
            console.log('Produto excluído');
            alert('Arquivo excluído com sucesso!')
        }).catch((err) => {
            console.log('Houve um erro ao excluir o item: ' + err);
        });
        
    }

    async deleteItemHome(id){
        
        await ax.delete(`http://localhost:8081/item/produtoDelProdutohome/${id}`).then(() => {
            console.log('Produto excluído');
            alert('Arquivo excluído com sucesso!')
        }).catch((err) => {
            console.log('Houve um erro ao excluir o item: ' + err);
        });
        
    }



    getProduto(){
        ax.get('http://localhost:8081/item/produtohome').then(response => 
            response.data.items.map(item => ({
                id: `${item.id}`,
                nome: `${item.nome}`,
                img: `${item.img}`,
                info1: `${item.info1}`,
                info2: `${item.info2}`,
                info3: `${item.info3}`,
                info4: `${item.info4}`,
                quantidade: `${item.quantidade}`,
                cartao: `${item.cartao}`,
                avista: `${item.avista}`
        }) ))
        .then( item => {
            console.log(item);
            this.setState({
                items: item,
                isLoading: false
            });
        }).catch(error => this.setState({error, isLoading: false}))

        ax.get('http://localhost:8081/item/promocao').then(response => 
            response.data.items.map(item2 => ({
                id: `${item2.id}`,
                nome: `${item2.nome}`,
                img: `${item2.img}`,
                info1: `${item2.info1}`,
                info2: `${item2.info2}`,
                info3: `${item2.info3}`,
                info4: `${item2.info4}`,
                quantidade: `${item2.quantidade}`,
                cartao: `${item2.cartao}`,
                avista: `${item2.avista}`
        }) ))
        .then( item2 => {
            console.log(item2);
            this.setState({
                items2: item2,
                isLoading: false
            });
        }).catch(error => this.setState({error, isLoading: false}))
    
    }

    componentDidMount(){
        this.getProduto()
        console.log(this.state.items)
    }

    render(){
        const { adm, items, items2 } = this.state
        return(
            <div>
                <NavHsc/>
                <Nav/>
                <h1 id="title_h1_novidade">Novidades / Mais procurados</h1>
                <section id="section_container_novidade">
                {adm === 'admin' ? (
                    items.map(produtos => {
                        const { id, nome, img, cartao, info4 } = produtos;
    
                        return(
                                <div key={id} id="container_product_home">
                                    <button id="btn_delete_novidade_home" onClick={() => this.deleteItem(id)}>X</button>
                                    <img id="img_novidade_home" src={`/image/produtohome/${img}`} alt="img_produto"/>
                                    <h1 id="name_product_home">{nome}</h1>

                                    

                                    <div id="container_precos_home">
                                        <p id="preco_cartao">R$ {cartao}</p>
                                    </div>
                                    
                                    <button id="btn_acessar_home" onClick={() => this.getOneProduto(nome, id, info4)}>Acessar</button>         
                                </div>
                        );
                    })
                ) 
                : (
                    items.map(produtos => {
                        const { id, nome, img, cartao, info4 } = produtos;
    
                        return(
                                <div key={id} id="container_product_home">
                            
                                    <img id="img_novidade_home" src={`/image/produtohome/${img}`} alt="img_produto"/>
                                    <h1 id="name_product_home">{nome}</h1>

                                    

                                    <div id="container_precos_home">
                                        <p id="preco_cartao">R$ {cartao}</p>
                                    </div>
                                    
                                    <button id="btn_acessar_home" onClick={() => this.getOneProduto(nome, id, info4)}>Acessar</button>         
                                </div>
                        );
                    })
                )}
                </section>

                <h1 id="title_h1_promocao">Promoção</h1>
                <section id="section_container_promocao">
                {adm === 'admin' ? (
                    items2.map(produtos => {
                        const { id, nome, img, cartao, info4 } = produtos;
    
                        return(
                                <div key={id} id="container_product">
                                    <button id="btn_delete_promocao" onClick={() => this.deleteItem(id)}>X</button>
                                    <img id="img_promocao" src={`/image/promocao/${img}`} alt="img_produto"/>
                                    <h1 id="name_product">{nome}</h1>

                                    

                                    <div id="container_precos">
                                        <p id="preco_cartao">R$ {cartao}</p>
                                    </div>
                                    
                                    <button id="btn_acessar" onClick={() => this.getOneProduto(nome, id, info4)}>Acessar</button>         
                                </div>
                        );
                    })
                ) 
                : (
                    items2.map(produtos => {
                        const { id, nome, img, cartao, info4 } = produtos;
    
                        return(
                                <div key={id} id="container_product">
                            
                                    <img id="img_promocao" src={`/image/promocao/${img}`} alt="img_produto"/>
                                    <h1 id="name_product">{nome}</h1>

                                    

                                    <div id="container_precos">
                                        <p id="preco_cartao">R$ {cartao}</p>
                                    </div>
                                    
                                    <button id="btn_acessar" onClick={ () => this.getOneProduto(nome, id, info4)}>Acessar</button>         
                                </div>
                        );
                    })
                )}
                </section>
            </div>
        );
    }
}

export default Home;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../componentes/Nav';
import NavHsc from '../../componentes/Nav_hsc';
import ax from '../../service/ax';
import './conversores.css';


class Conversores extends Component{
    constructor(props){
        super(props);
        this.state = {
            adm: this.admMessage(),
            items: [],
            isLoading: true,
            errors: null
        }
        this.deleteItem = this.deleteItem.bind(this);
    }

    async admMessage(){
        const data = localStorage.getItem('myData');
        if(await data ){
            this.setState({adm: data})
        } else {
            this.setState({adm: 'user'})
        }
        
    }

   async deleteItem(id){
        
        await ax.delete(`http://localhost:8081/item/produtoDelConversor/${id}`).then(() => {
            console.log('Produto excluído');
            alert('Arquivo excluído com sucesso!')
        }).catch((err) => {
            console.log('Houve um erro ao excluir o item: ' + err);
        });
        
    }

    getProduto(){
        ax.get('http://localhost:8081/item/conversor').then(response => 
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
    }

    componentDidMount(){
        this.getProduto()
        console.log(this.state.items)
    }

    render(){
        const { adm, items } = this.state
        return(
            <div>
                <NavHsc/>
                <Nav/>
                <h1 id="title_h1_conversores">Conversores</h1>
                <section id="section_container">
                {adm === 'admin' ? (
                    items.map(produtos => {
                        const { id, nome, img, cartao } = produtos;
    
                        return(
                                <div key={id} id="container_product">
                                    <button id="btn_delete_conversor" onClick={() => this.deleteItem(id)}>X</button>
                                    <img id="img_conversor" src={`/image/conversores/${img}`} alt="img_produto"/>
                                    <h1 id="name_product">{nome}</h1>

                                    

                                    <div id="container_precos">
                                        <p id="preco_cartao">R$ {cartao}</p>
                                    </div>
                                    
                                    <button id="btn_acessar"><Link to={`/produtoConversor/item/${id}`} id="link_btn" >Acessar</Link></button>         
                                </div>
                        );
                    })
                ) 
                : (
                    items.map(produtos => {
                        const { id, nome, img, cartao } = produtos;
    
                        return(
                                <div key={id} id="container_product">
                            
                                    <img id="img_conversor" src={`/image/conversores/${img}`} alt="img_produto"/>
                                    <h1 id="name_product">{nome}</h1>

                                    

                                    <div id="container_precos">
                                        <p id="preco_cartao">R$ {cartao}</p>
                                    </div>
                                    
                                    <button id="btn_acessar"><Link to={`/produtoConversor/item/${id}`} id="link_btn" >Acessar</Link></button>         
                                </div>
                        );
                    })
                )}
                </section>
            </div>
        );
    }
}

export default Conversores;
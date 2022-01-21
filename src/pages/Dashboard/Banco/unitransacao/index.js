import React, { Component } from 'react';
import ax from '../../../../service/ax';
import './unitransacao.css';

class Unitransacao extends Component{
    constructor(props){
        super(props);
        this.state = {
            unitransacao: '',
            name: ''
        }
        this.getUniTransacao = this.getUniTransacao.bind(this);
    }

    getUniTransacao(){
        const { name } = this.state;

        ax.get(`http://localhost:8081/transacaoDb/onlytransacao/${name}`)
        .then( response => {
            this.setState({ unitransacao: {
                nome: `${response.data.onlytransacao.nome}`,
                email: `${response.data.onlytransacao.email}`,
                item: `${response.data.onlytransacao.item}`,
                valor: `${response.data.onlytransacao.valor}`,
                quantidade: `${response.data.onlytransacao.quantidade}`,
                id_externo: `${response.data.onlytransacao.id_externo}`
            } })
        }).catch( err => console.log(err) );
    }

    render(){
        return(
            <div>
                <h1>Unica transaçao</h1>

                <div>
                    <label id="label-unitransation">Insira o nome de quem procura no banco de dados:</label>
                    <input id="input-name-banco" type="text" placeholder="insira o nome aqui..." 
                        onChange={ (e) => this.setState({ name: e.target.value }) }/>
                    <button id="btn-banco-buscar" onClick={ () => this.getUniTransacao()} >Buscar</button>
                </div>

                { this.state.unitransacao !== '' ? 
                (
                    <div id='container-unitransacao' >
                        <div className="container-label-unitran">
                            <label className="label-unitransacao">Nome</label>
                            <label className="label-result-unitransacao">{this.state.unitransacao.nome}</label>
                        </div>

                        <div className="container-label-unitran">
                            <label className="label-unitransacao">Email</label>
                            <label className="label-result-unitransacao">{this.state.unitransacao.email}</label>
                        </div>

                        <div className="container-label-unitran">
                            <label className="label-unitransacao">Item</label>
                            <label className="label-result-unitransacao">{this.state.unitransacao.item}</label>
                        </div>

                        <div className="container-label-unitran">
                            <label className="label-unitransacao">Valor</label>
                            <label className="label-result-unitransacao">{this.state.unitransacao.valor}</label>
                        </div>

                        <div className="container-label-unitran">
                            <label className="label-unitransacao">Quantidade</label>
                            <label className="label-result-unitransacao">{this.state.unitransacao.quantidade}</label>
                        </div>

                        <div className="container-label-unitran">
                            <label className="label-unitransacao">Id_externo</label>
                            <label className="label-result-unitransacao">{this.state.unitransacao.id_externo}</label>
                        </div>
                        
                    </div>
                ):(
                    null
                ) }
            </div>
        ); 
    }
}

export default Unitransacao;
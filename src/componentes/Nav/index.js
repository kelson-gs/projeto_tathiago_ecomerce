import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './lista.css';

class Nav extends Component{

    constructor(props){
        super(props);
        this.state = {
            lista: [
                'antenas', 'baterias', 'carregadores',
                'controles', 'cabos', 'caixas de som',
                'conversores', 'extensoes', 'fontes',
                'fones', 'pilhas','receptores', 'roteadores','transformadores', 
            ]
        }
    }

    render(){
        return(
            <nav id="nav_box">
                <ul>
                    {this.state.lista.map((item) => {
                        return(
                            <li className="list" key={item}>
                                <Link to={`/${item === 'caixas de som' ? 'caixas' : item}`} className='link_list'> {item === 'extensoes' ? 'extensões' : item} </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}

export default Nav;
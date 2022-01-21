import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './nav_hsc.css';

class NavHsc extends Component{
    render(){
        return(
            <div id='navegacao_btn'>
                <div id="direction_items">
                    <Link id="btn_home" to='/' className='btn_nav'>Home</Link>
                    <Link id="btn_stk" to='/aplicativo' className='btn_nav'>Informações</Link>
                    <Link id="btn_contato" to='/contatos' className='btn_nav'>Sobre</Link>
                </div>  
            </div>
        );
    }
}

export default NavHsc;
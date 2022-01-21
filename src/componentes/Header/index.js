import React , { Component } from 'react';
import "./estilo.css";
import { Link } from 'react-router-dom';
import isAuthenticated from '../../auth.js';



class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            adm: this.admMessage()
        }
        this.logout = this.logout.bind(this);
        this.admMessage = this.admMessage.bind(this);
    }
    
    async admMessage(){
        const data = localStorage.getItem('myData');
        if(await data ){
            this.setState({adm: data})
        } else {
            this.setState({adm: ''})
        }
        
    }

    logout(){
        isAuthenticated(false);
        this.setState({adm: ''})
        localStorage.removeItem('myData');

    }

    render(){
        return(
            <div id="box_header">
                <img id="img_logo" src= "/image/logo/logo_tathiago_modificado.jpg" alt="imagem_logo"></img>
                <h1 id="text_header">Tathiago Digital</h1>

                {this.state.adm !== '' ? 
                    <h1 id="visual_user"><Link id="link_visual_user" to="/usuario"><img id="user_img_h" src="/image/icons/user.png" alt="img_user"/>{'Local Usuário'}</Link></h1>
                    : 
                    <h1 id="visual_user">Faça login...</h1>
                }

                { this.state.adm === 'admin' ? 
                    <div className="btn_head">
                        <Link to="/login" ><button onClick={this.logout} className="btn_logar">Deslogar</button></Link>
                        <Link to="/dashboard"><button className="btn_adm">Adm</button></Link>
                    </div>
                    :
                    <Link to="/login" ><button onClick={this.login} className="btn_logar">Login</button></Link>
                }   
            </div>
        );
    }
}

export default Header;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ax from '../../service/ax';
import './user.css';

class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            putPass: false,
            newPassword: '',
            notUser: '',
            user: [],
            click: false,
            carrinho: 'Clique aqui para ver seu carrinho de compras...',
            carroCompras: []
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.putPasswordUser = this.putPasswordUser.bind(this);
        this.carro = this.carro.bind(this);
        this.clearCar = this.clearCar.bind(this);
    }

    clearCar(){
        localStorage.removeItem('carrinho');
    }

    carro(){
        const lista = [];
        const lista2 = [];
        
        let compras = JSON.parse(localStorage.getItem('carrinho'));
        lista.push(compras);

        for(let i = 0; i < lista[0].length; i++){
            lista2.push(lista[0][i])
        }
        console.log(lista2)


        this.setState({carrinho: 'Carrinho de compras vazio !!',
                       click: true,
                       carroCompras: lista2 });
    }

    deleteUser(){
        const { id } = this.state.user;

        let confirmar =  window.confirm('deseja deletar seu usuário?');
       
        if( confirmar === true ){
            ax.delete(`http://localhost:8081/user/deleteUser/${id}`).then(() => {
                console.log('Usuário excluído!');
                alert('Usuário excluído com sucesso !');
            }).catch((err) => console.log(err), alert('Houve um erro ao deletar o usuário'))
        }
    }

    putPasswordUser(){
        try{
            let { newPassword } = this.state;
            let { id } = this.state.user;
            ax.put(`http://localhost:8081/user/putPasswordUser/${id}`, {
                newPassword: newPassword
            }).then(() => {
                console.log("Senha alterada com sucesso !");
                alert("Senha alterada com sucesso !");
            })
        } catch (err){
            console.log(err);
        }
    }

    componentDidMount(){
        try {
            let email = localStorage.getItem('myData');
            if(email){
                ax.get(`http://localhost:8081/user/findUser/${email}`).then( (user) => {
                this.setState({ user: {
                    id: `${user.data.usuario.id}`,
                    email: `${user.data.usuario.email}`,
                    nome: `${user.data.usuario.nome}`,
                    password: `${user.data.usuario.password}`
                }, notUser: `${user.data.usuario.nome}` })
                }).catch( err => console.log(err));
            } else {
                this.setState({ notUser: '' })
            }
            
        } catch (err) {
            console.log(err);
        }
    }

    render(){
        const { click, carrinho, notUser, putPass, carroCompras } = this.state;
        const lista = [];
        lista.push(carroCompras);
        const { email, nome } = this.state.user;
        
        return(
            <div id="container_usuario">

            <h1 id="name_user">{nome}</h1>

                <div id="container_img_icon">
                    <img id="icon_user" src="/image/icons/do-utilizador.png" alt="icon_user"/>
                </div>

                {notUser === '' ? (
                    <div id="container_form_user">
                        <h1 id="notUser">Usuário não logado !</h1>
                        <Link to='/login'><button id="link_login_user">Acesse para logar</button></Link>
                    </div>
                ) : (
                    <div id="container_form_user">
                    <img id="delete_btn" src="/image/icons/delete.png" alt="delete_image" onClick={this.deleteUser}/>
                    <table >
                        <tbody>
                            <tr>
                                <td className="td_classe">Nome:</td>
                                <td className="td_classe"><p>{nome}</p></td>
                            </tr>
                            <tr>
                                <td className="td_classe">Email:</td>
                                <td className="td_classe"><p>{email}</p></td>
                            </tr>
                            <tr>
                                <td className="td_classe">Senha:</td>
                                <td className="td_classe"><p>********</p></td>
                            </tr>
                        </tbody>
                    </table>
                    <img id="update" src="/image/icons/update.png" alt="put_image" onClick={() => this.setState({putPass: true})}/>
                    {putPass ? (
                        <div id="container_putpassword">
                            <input type="password" id="input_putsenha" placeholder="Adicione sua nova senha..." 
                                onChange={( e ) => this.setState({ newPassword: e.target.value })} />
                            <button id="btn_trocar" onClick={this.putPasswordUser}>trocar</button>
                        </div>
                    ):( <label id="label_clicklaps">Clique no lápis para alterar sua senha...</label>
                    )}
                </div>
                )}

                {notUser !== '' ? (
                    <div id="car_product">
                    {click !== false ? (
                        <table id="table_product">
                            <tbody>
                                {carroCompras.map( (item) => (
                                    <tr key={item.id} className="tr_product">
                                        <td className="td_product"><img id="img_table_form" src={`${item.img}`} alt="product_img"/></td>
                                        <td className="td_product">{item.nome}</td>
                                        <td className="td_product">R$ {item.preco}</td>
                                        <td id="td_directory" className="td_product"><Link id="link_directory" to={`${item.diretorio}`}> direcionar a pagina</Link></td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    ) : (
                        <label id="label_onclick" onClick={ this.carro }>{carrinho}</label>
                    )}
                </div>

                ):(
                    null
                )}
                    
                {this.state.carroCompras.length === 0 ? (
                    null
                ):(
                    <button id="clear-car-button" onClick={ () => this.clearCar } >Limpar carrinho</button>
                )}
            </div>
        );
    }
}

export default User;
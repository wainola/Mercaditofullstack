import React, { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import OrderThisWeek from './secciones/orders_this_week';
import AddProductos from './secciones/add_productos';
import OrdersHistory from './secciones/orders_history';
import OnlineProducts from './secciones/online_products';

class NavMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            ordenes_semana: null,
            add_productos: null,
            productos_pag: null,
            hist_ordenes: null
        }
    }
    clickLink(event){
        console.log(event.target.dataset.name);
        
    }
    render(){
        // console.log(this.props);
        return(
            <div>
                <div className="row justify-content-center">
                    <Nav tabs className='nav nav-tabs'>
                        <NavItem>
                            <Link className='nav-link active' to={`${this.props.match.url}`} 
                            className={`nav-link ${this.state.ordenes_semana ? 'active' : ''}`} 
                            data-name='ordenes_semana'
                            onClick={this.clickLink.bind(this)}>
                            <i className='now-ui-icons objects_umbrella-13'></i>
                            Órdenes de ésta semana</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={`${this.props.match.url}/addProducts`} 
                            className={`nav-link ${this.state.add_productos ? 'active': ''}`} 
                            data-name='add_productos'
                            onClick={this.clickLink.bind(this)}>Añadir productos</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={`${this.props.match.url}/onlineProducts`} 
                            className={`nav-link ${this.state.productos_pag ? 'active' : ''}`} 
                            data-name='productos_pag'
                            onClick={this.clickLink.bind(this)}
                            >Productos en la página</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={`${this.props.match.url}/ordersHistory`} 
                            className={`nav-link ${this.state.hist_ordenes ? 'active' : ''}`} 
                            data-name='hist_ordenes'
                            onClick={this.clickLink.bind(this)}
                            >Histórico de órdenes</Link>
                        </NavItem>
                    </Nav>
                </div>
                <div className="row justify-content-center">
                    <Route exact path={`${this.props.match.url}`} component={OrderThisWeek} />
                    <Route path={`${this.props.match.url}/addProducts`} component={AddProductos} />
                    <Route path={`${this.props.match.url}/onlineProducts`} component={OnlineProducts} />
                    <Route path={`${this.props.match.url}/ordersHistory`} component={OrdersHistory} />
                </div>
            </div>
        );
    }
}

export default NavMenu;
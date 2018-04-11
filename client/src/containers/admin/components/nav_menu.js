import React, { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { Route, Link } from 'react-router-dom';
import OrderThisWeek from './secciones/orders_this_week';
import AddProductos from './secciones/add_productos';
import OrdersHistory from './secciones/orders_history';
import OnlineProducts from './secciones/online_products';

class NavMenu extends Component{
    render(){
        // console.log(this.props);
        return(
            <div>
                <div className="row justify-content-center">
                    <Nav tabs className='nav nav-tabs'>
                        <NavItem>
                            <Link className='nav-link active' to={`${this.props.match.url}/ordersThisWeek`} className='nav-link'>
                            <i className='now-ui-icons objects_umbrella-13'></i>
                            Órdenes de ésta semana</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={`${this.props.match.url}/addProducts`} className='nav-link'>Añadir productos</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={`${this.props.match.url}/onlineProducts`} className='nav-link'>Productos en la página</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={`${this.props.match.url}/ordersHistory`} className='nav-link'>Histórico de órdenes</Link>
                        </NavItem>
                    </Nav>
                </div>
                <div className="row justify-content-center">
                    <Route path={`${this.props.match.url}/ordersThisWeek`} component={OrderThisWeek} />
                    <Route path={`${this.props.match.url}/addProducts`} component={AddProductos} />
                    <Route path={`${this.props.match.url}/onlineProducts`} component={OnlineProducts} />
                    <Route path={`${this.props.match.url}/ordersHistory`} component={OrdersHistory} />
                </div>
            </div>
        );
    }
}

export default NavMenu;
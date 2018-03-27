import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import OrderThisWeek from './secciones/orders_this_week';
import AddProductos from './secciones/add_productos';

class NavMenu extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div className="row justify-content-center">
                    <Nav tabs>
                        <NavItem>
                            <Link to={`${this.props.match.url}/ordersThisWeek`} className='nav-link'>Orders This Week</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={`${this.props.match.url}/addProducts`} className='nav-link'>Add Products</Link>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Another Link</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink disabled href="#">Disabled Link</NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <div className="row justify-content-center">
                    <Route path={`${this.props.match.url}/ordersThisWeek`} component={OrderThisWeek} />
                    <Route path={`${this.props.match.url}/addProducts`} component={AddProductos} />
                </div>
            </div>
        );
    }
}

export default NavMenu;
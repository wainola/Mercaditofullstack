import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import OrderThisWeek from './secciones/orders_this_week';

class NavMenu extends Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props);
        return(
            <div className="row justify-content-center">
                 <Nav tabs>
                    <NavItem>
                        <NavLink href="#">Link</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Link</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Another Link</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink disabled href="#">Disabled Link</NavLink>
                    </NavItem>
                </Nav>
                <BrowserRouter>
                    <Switch>
                        <Route exact to={`${this.props.match.url}/orderthisweek`} component={OrderThisWeek} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default NavMenu;
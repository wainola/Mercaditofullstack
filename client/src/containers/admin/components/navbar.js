import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class NavegacionAdmin extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            isOpen: false
        }
    }
    componentWillMount(){
        const email = localStorage.getItem('mail_user');
        this.setState({email});
    }
    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        console.log(this.state.isOpen);
        return(
            <div>
                <Navbar color="faded" light expand="md" className="navbar-dark bg-dark">
                    <NavbarBrand href="/" className="mr-auto">Mercadito</NavbarBrand>
                    <NavbarToggler onClick={this.toggle.bind(this)} className="mr-2" />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <NavLink href="">{this.state.email}</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/signout">Cerrar Sesión</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}


export default NavegacionAdmin;
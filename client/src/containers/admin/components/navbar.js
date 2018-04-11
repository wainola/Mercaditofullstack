import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

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
        return(
            <div className='navbar-translate'>
                <Navbar light expand="md" className="navbar bg-info">
                        <Dropdown className='mr-auto' isOpen={this.state.isOpen} toggle={this.toggle.bind(this)}>
                            <DropdownToggle caret className='btn btn-info ml-auto h6'>
                                Mercadito
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>{this.state.email}</DropdownItem>
                                <Link to='/' className='dropdown-item'>Págna Principal</Link>
                                <Link to='/signout' className='dropdown-item'>Cerrar Sesión</Link>
                            </DropdownMenu>
                        </Dropdown>
                </Navbar>
            </div>
        );
    }
}

export default NavegacionAdmin
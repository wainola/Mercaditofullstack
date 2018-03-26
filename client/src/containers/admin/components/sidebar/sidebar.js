import React, { Component } from 'react';
import { 
    Nav, 
    NavItem, 
    NavLink
} from 'reactstrap';
import './style.css';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/index';
import { Link } from 'react-router-dom';
import AddProductos from '../secciones/add_productos';

class SideBar extends Component {
    constructor(props){
        super(props);
    }
    toggleClass(){
        this.props.toggleSidebar(this.props.toggle);
    }
    render(){
        console.log("sidebar");
        console.log(this.props);
        return(
            <div className="wrapper">
                <Nav id="sidebar" className={!this.props.toggle ? 'active' : ''}>
                    <NavItem>
                        <Link to='/add_productos'>Añadir Productos</Link>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { toggle: !state.toggle.toggle }
}

export default connect(mapStateToProps)(SideBar);
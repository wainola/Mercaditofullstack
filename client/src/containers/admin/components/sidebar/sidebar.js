import React, { Component } from 'react';
import { 
    Nav, 
    NavItem, 
    NavLink,
    Button
} from 'reactstrap';
import './style.css';

class SideBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: false
        }
    }
    toggleClass(){
        console.log('toggle');
        this.setState({
            active: !this.state.active
        });
    }
    render(){
        console.log(this.state);
        return(
            <div className="wrapper">
                <Nav id="sidebar" className={this.state.active ? 'active' : ''}>
                    <div className="sidebar-header">
                        <h3>Collapsible Sidebar</h3>
                    </div>
                    <NavItem>
                        <NavLink href="">Añadir Productos</NavLink>
                    </NavItem>
                </Nav>
                <div id="content">
                    <Button type='button' className="btn btn-success" onClick={this.toggleClass.bind(this)}>Toggle Sidebar</Button>
                </div>
            </div>
        );
    }
}

export default SideBar;
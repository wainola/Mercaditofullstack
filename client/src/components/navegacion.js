import React, {Component} from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';

class Navegacion extends Component {
  render() {
    return (
      <div>
        <Nav>
          <NavItem>
            <NavLink href="#">Hortalizas</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Verduras</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Abarrotes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Frutas</NavLink>
          </NavItem>
          <NavItem>
            <Link to='/signin' className="nav-link">Login</Link>
          </NavItem>
          <NavItem>
            <Link to='/signup' className="nav-link">Registro</Link>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default Navegacion;

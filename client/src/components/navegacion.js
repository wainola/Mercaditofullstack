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
            <Link to="/signin" className="btn border-warning">Login</Link>
          </NavItem>
          <NavItem>
            <Link to="/admin" className="btn border-warning" style={{ marginLeft: "5px" }}>Admin</Link>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default Navegacion;

import React, {Component} from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index'

class Navegacion extends Component {
  componentDidMount() {
    //this.props.getCategories();
    console.log(this.props);
  }
  componentWillMount() {
    console.log('Componente se montara');
  }
  render() {
    console.log(this.props.categorias_retornadas);
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

function mapStateToProps({categorias}){
  return {categorias};
}

export default connect(mapStateToProps, actions)(Navegacion);

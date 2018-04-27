import React, {Component} from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index'

class Navegacion extends Component {
  constructor(props){
    super(props);
    this.state = {
      categorias: undefined
    };
  }
  componentDidUpdate() {
    if(this.props.categorias !== undefined){
      console.log('categorias cargadas');
      console.log(this.props.categorias);
    }
    // this.renderCategorias()
  }
  renderCategorias(){
    console.log('Render categorias!');
    return(
      this.props.categorias.categorias_retornadas.map(item => 
        <NavItem>
          <Link to='' className='nav-link' key={item.nombre_categoria}>{item.nombre_categoria.toUpperCase()}</Link>
        </NavItem>
      )
    );
  }
  render() {
    console.log('render!');
    console.log(this.props);
    return (
      <div>
          {this.props.categorias.length !== 0
          ?
          <div>
            <Nav>
              {this.renderCategorias()}
              <NavItem>
                <Link to='/signin' className="nav-link">{`${"login".toUpperCase()}`}</Link>
              </NavItem>
              <NavItem>
                <Link to='/signup' className="nav-link">{`${"registro".toUpperCase()}`}</Link>
              </NavItem>
            </Nav>
          </div>
          :
          <div>
            Cargando categorias!
          </div>
          }
      </div>
    );
  }
}

function mapStateToProps({categorias}){
  return {categorias};
}

export default connect(mapStateToProps, actions)(Navegacion);

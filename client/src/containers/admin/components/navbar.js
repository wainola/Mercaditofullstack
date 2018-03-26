import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NavegacionAdmin extends Component{
    render(){
        return(
            <ul className="nav float-right">
                <li className="nav-item">
                    <Link to='' className='nav-link'>
                        Nombre del usuario
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/signout' className="nav-link">Cerrar Sesión</Link>
                </li>
            </ul>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user.email
    }
}

export default connect(null)(NavegacionAdmin);
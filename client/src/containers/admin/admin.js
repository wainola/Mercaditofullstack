import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Admin extends Component{
    render(){
        return(
            <div>
                Seccion Admin
                <Link to='/signout'>Cerrar Sesion</Link>
            </div>
        );
    }
}

export default Admin;
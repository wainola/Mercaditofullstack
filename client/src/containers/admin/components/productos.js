import React, { Component } from 'react';
import SideBar from './sidebar/sidebar';
import { Link, Route , BrowserRouter} from 'react-router-dom';
import AddProductos from './secciones/add_productos';

class Productos extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <SideBar />
                    </div>
                    <div className="col">
                        <h4>Productos</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Productos;
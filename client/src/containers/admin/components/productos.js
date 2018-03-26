import React, { Component } from 'react';
import SideBar from './sidebar/sidebar';

class Productos extends Component{
    render(){
        return(
            <div className="container-fluid">
                <h3>Productos</h3>
                <div>
                    <SideBar />
                </div>
            </div>
        );
    }
}

export default Productos;
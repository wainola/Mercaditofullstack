import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Alert } from 'reactstrap';
import Presentacion from '../components/main_presentacion';
import _ from 'lodash';

class Checkout extends Component {
    renderOrder(producto){
        let c = 1;
        return(
            <tr key={producto.id}>
                <th>{c++}</th>
                <th>{producto.product_select.nombre}</th>
                <th>{producto.cantidad}</th>
                <th>{producto.product_select.precio}</th>
            </tr>
        );
    }
    render(){
        console.log('checkout!');
        console.log(this.props.valorCompra[0]);
        return(
            <div>
                <div>
                    <Presentacion />
                </div>
                <div className="row justify-content-center">
                    <div className="container">
                        <h3 className="text-center">Su orden</h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.carroCompra.map(this.renderOrder)}
                            </tbody>
                        </Table>
                        <Alert color='primary'>
                            <strong>Total: {this.props.valorCompra[0] === undefined ? 0 : this.props.valorCompra[0]}</strong>{}
                        </Alert>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ carroCompra, valorCompra}){
    return { carroCompra, valorCompra};
}

export default connect(mapStateToProps)(Checkout);
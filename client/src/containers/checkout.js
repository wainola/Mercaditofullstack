import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Presentacion from '../components/main_presentacion';
import _ from 'lodash';
import { Link } from 'react-router-dom';

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
    renderFormCheckout(){
        return(
            <Form>
                <FormGroup>
                    <Label>Nombre</Label>
                    <Input type='text' placeholder='Nombre y Apellido' />
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type='email' placeholder='Ingrese su correo electrónico'/>
                </FormGroup>
                <FormGroup>
                    <Label>Dirección de Despacho</Label>
                    <Input type='text' placeholder='Ingrese su dirección de despacho' />
                </FormGroup>
                <FormGroup>
                    <Button type='submit' className='btn btn-success'>Enviar orden de compra</Button>
                </FormGroup>
            </Form>
        );
    }
    valorCompra(){
        let valores_a_pagar = _.map(this.props.carroCompra, item => item.valor_a_pagar);
        let valor_total_a_pagar = _.reduce(valores_a_pagar, (accu, item) => accu + item, 0);
        console.log(valores_a_pagar);
        return(
            <span>{valor_total_a_pagar}</span>
        );
    }
    render(){
        console.log(this.props);
        return(
            <div>
                <div>
                    <Presentacion />
                </div>
                <div className="row justify-content-center">
                    <div className="container">
                        <h3 className="text-center">Su orden</h3>
                        <Link to='/'>Volver</Link>
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
                            <strong>Total: {this.props.carroCompra.length === 0 ? 0 : this.valorCompra()}</strong>{}
                        </Alert>
                        {this.renderFormCheckout()}
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
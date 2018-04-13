import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Presentacion from '../components/main_presentacion';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import * as actions from '../actions/index';
import swal from 'sweetalert';

class Checkout extends Component {
    constructor(){
        super();
        this.state = {
            form: undefined
        }
    }
    componentDidUpdate(){
        console.log('actualizado!');
        if (!this.props.order.data.success) {
            console.log('informacion recibida con exito');
            swal({
                title: 'Orden enviada con éxito!',
                icon: 'success'
            });
            // RESETING THE FORM
            document.forms[0].reset();
            this.props.history.push('/');
        }
    }
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
    onSubmit(event){
        event.preventDefault();
        console.log('submit');
        // HAND IMPLEMENTATION FORM GETTING THE INPUTS VALUES
        let data = {
            nombre: event.target[0].value,
            email: event.target[1].value,
            direccion: event.target[2].value,
            carro_de_compra: this.props.carroCompra.map(item => {
                return {
                    id: item.id,
                    cantidad: parseInt(item.cantidad),
                    nombre_producto: item.product_select.nombre,
                    descripcion_producto: item.product_select.descripcion,
                    precio: parseInt(item.product_select.precio),
                    tipo: item.product_select.tipo,
                    valor_a_pagar: parseInt(item.valor_a_pagar)
                }
            })
        };
        console.log('data');
        console.log(data)
        this.props.sendOrder(data);
    }
    renderFormCheckout(){
        console.log('render form');
        console.log(this.props.carroCompra);
        return(
            <Form onSubmit={this.onSubmit.bind(this)}>
                <FormGroup>
                    <Label>Nombre</Label>
                    <Input type='text' placeholder='Nombre y Apellido' />
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type='email' placeholder='Correo electrónico' />
                </FormGroup>
                <FormGroup>
                    <Label>Dirección de Despacho</Label>
                    <Input type='direccion' placeholder='Dirección de despacho' />
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
        console.log('this props checkout');
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

function mapStateToProps({ carroCompra, valorCompra, order}){
    return { carroCompra, valorCompra, order};
}

export default connect(mapStateToProps, actions)(Checkout);
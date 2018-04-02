import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';
import ModalProducto from './modal';
import * as actions from '../actions/index';

class CarroCompra extends Component{
    constructor(props){
        super(props);
        this.renderBadge = this.renderBadge.bind(this);
        this.state = {
            modal:false
        }
        this.toggle = this.toggle.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.renderProductosCarro = this.renderProductosCarro.bind(this);
    }
    renderBadge(){
        //console.log(this.props.carroCompra.length);
        if(this.props.carroCompra.length > 0){
            console.log(this.props.carroCompra.length);
            return(
                <span className="badge badge-light">{this.props.carroCompra.length}</span>
            );
        }
        else{
            return(
                <span className="badge badge-light">{this.props.carroCompra.length}</span>
            )
        }
    }
    clickBadge(event){
        event.preventDefault();
        console.log('click badge');
        this.setState({
            modal: !this.state.modal
        });
    }
    toggle(){
        this.setState({
            modal: !this.state.modal
        });
    }
    removeFromCart(){
    }
    // RENDER THE PRODUCTS THAT ARE CURRENTLY SELECTED IN THE SHOPPING CART
    renderProductosCarro(itemes){
        console.log('render items carro de compras');
        console.log(itemes);
        let cantidad = `${itemes.cantidad} ${itemes.product_select.tipo === 'kilo' ? 'kilos' : 'unidades'}`;
        let producto = `Producto: ${itemes.product_select.nombre}`;
        let precio = `$${itemes.product_select.precio}`;
        let key = itemes.product_select.id;
        return(
            <ListGroupItem key={key}>
                <p>{producto}</p>
                <p><span>Cantidad: {cantidad}.</span> | <span>Precio: {precio}</span> <span><Button type='button' className='btn btn-warning' onClick={this.removeFromCart}>Quitar</Button></span></p>
            </ListGroupItem>
        );
    }
    render(){
        console.log('carro de compra');
        console.log(this.props);
        return(
            // Always sticky-top works on container elements like div
            <div className="sticky-top">
                <a href="" onClick={this.clickBadge.bind(this)}>
                    <i
                        className="fas fa-cart-plus fa-2x float-right"
                        style={{
                            zIndex: "1000"
                        }}
                    >
                    </i>
                    <span
                        className="float-right"
                        style={{
                            zIndex: "10010",
                            marginRight: "-40px",
                            marginTop: "-10px",
                            height: "15px"
                        }}>
                        {this.renderBadge()}
                    </span>
                </a>
                <ModalProducto />
                {/* MODAL FOR SHOPPOING CART */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Productos en el carro</ModalHeader>
                    <ModalBody>
                        <ListGroup>
                            {this.props.carroCompra.length === 0 ?
                                <p>No hay productos aun en el carrito!</p> 
                            :
                                <div>{this.props.carroCompra.map(this.renderProductosCarro)}</div>
                            }
                        </ListGroup>
                </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Cerrar</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps({carroCompra}){
    return {carroCompra}
}
export default connect(mapStateToProps, actions)(CarroCompra);
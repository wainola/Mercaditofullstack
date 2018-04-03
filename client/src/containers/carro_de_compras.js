import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Alert } from 'reactstrap';
import * as actions from '../actions/index';
import Checkout from './checkout';
import { Route, Link } from 'react-router-dom';
import _ from 'lodash';

class CarroCompra extends Component{
    constructor(props){
        super(props);
        this.renderBadge = this.renderBadge.bind(this);
        this.state = {
            modal: false,
            valor_a_pagar: 0
        }
        this.toggle = this.toggle.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.renderProductosCarro = this.renderProductosCarro.bind(this);
    }
    renderBadge(){
        //console.log(this.props.carroCompra.length);
        if(this.props.carroCompra.length > 0){
            //console.log(this.props.carroCompra.length);
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
        // console.log('click badge');
        this.setState({
            modal: !this.state.modal
        });
    }
    toggle(){
        this.setState({
            modal: !this.state.modal
        });
    }
    removeFromCart(key){
        this.props.removeFromCart(key);
    }
    // RENDER THE PRODUCTS THAT ARE CURRENTLY SELECTED IN THE SHOPPING CART
    renderProductosCarro(item){
        // console.log('render items carro de compras');
        // console.log(item);
        let cantidad = `${item.cantidad} ${item.product_select.tipo === 'kilo' ? 'kilos' : 'unidades'}`;
        let producto = `Producto: ${item.product_select.nombre}`;
        let precio = `$${item.product_select.precio}`;
        let key = item.product_select.id;
        return(
            <ListGroupItem key={key}>
                <p>{producto}</p>
                <p><span>Cantidad: {cantidad}.</span> | <span>Precio: {precio}</span> <span><Button type='button' className='btn btn-warning' onClick={() => {this.removeFromCart(key); this.updatePurchaseValue(parseInt(item.cantidad) * parseInt(item.product_select.precio))}}>Quitar</Button></span></p>
            </ListGroupItem>
        );
    }
    valorCompra(){
        let valor_compra = _.reduce(this.props.carroCompra, (accu, item) => accu + item.valor_a_pagar, 0);
        this.pasarValor(valor_compra)
        return(
            <span>{valor_compra}</span>
        );
    }
    pasarValor(valor_compra){
        return valor_compra
    }
    render(){
        console.log('carro de compra')
        console.log(this.props.carroCompra);
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
                {/* MODAL FOR SHOPPOING CART */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Productos en el carro</ModalHeader>
                    <ModalBody>
                        <ListGroup>
                            {this.props.carroCompra.length === 0 ?
                                <p>No hay productos aun en el carrito!</p> 
                            :
                                <div>{/* {this.props.carroCompra.map(this.renderProductosCarro)} */}</div>
                            }
                        </ListGroup>
                        <div>
                            <hr/>
                            <Alert color='primary'><strong>Total pedido: </strong>  {this.props.carroCompra.length === 0 ? 0 :  this.valorCompra() }</Alert>
                        </div>
                </ModalBody>
                    <ModalFooter>
                        <Link to='/checkout'>Confirmar pedido</Link>{' '}
                        <Button color="danger" onClick={this.toggle}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps({ carroCompra, valorCompra}){
    return { carroCompra, valorCompra }
}
export default connect(mapStateToProps, actions)(CarroCompra);
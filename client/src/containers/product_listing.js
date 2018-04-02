import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';
import {addToCart} from '../actions/index';
import {bindActionCreators} from 'redux';
import swal from 'sweetalert';
import { Route, Switch, Link } from 'react-router-dom';
import Checkout from './checkout';

class ProductListing extends Component{
    constructor(props){
        super(props);
        this.state = {
            cantidad: '0'
        }
        this.renderProductos = this.renderProductos.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }
    componentWillReceiveProps(){
    }
    componentDidUpdate(){
        console.log('carro actualizado');
        if (this.props.carroCompra.length > 1) {
            // console.log('elementos en carro de compra');
            // console.log(this.props.carroCompra);
            this.props.carroCompra.forEach((item) => {
                console.log(item);
            })
        }
    }
    handleChange(event){
        console.log(event.target.value);
        this.setState({cantidad: event.target.value});
        console.log(this.state.cantidad);
    }
    // METHOD THAT HANDLES THE CART FROM THE MAIN PAGE
    addToCart(event){
        event.preventDefault();
        //console.log(event.target);
        if(event.target[0].value === 'Cantidad'){
            swal({
                title: 'No puede seleccionar cero cantidad de productos!',
                icon: 'error'
            });
        }
        else{
            //console.log(event.target.dataset);
            this.props.addToCart({ product_select: JSON.parse(event.target.dataset.producto), cantidad: this.state.cantidad, id: JSON.parse(event.target.dataset.producto).id });
            //console.log(this.props.carroCompra);
        }
    }
    renderProductos(productos){
        // console.log('render productos');
        // console.log(productos);
        return(
            // Aproximacion cochina a la captura de los datos de cada producto
            <form 
            key={productos._id} 
            onSubmit={this.addToCart} 
            data-producto={JSON.stringify({id:productos._id, nombre:productos.nombre, descripcion:productos.descripcion, tipo: productos.tipo, precio: productos.precio})}>
                <div className="card border-info" style={{ width: "15rem", marginLeft: "10px", marginBottom: "10px" }}>

                    <img className="img-fluid" src={`${window.location.origin}${productos.urlImagen}`} alt="Card image cap" />
                    <div className="card-body">
                        <h4 className="card-title">{productos.nombre}</h4>
                        <p className="card-text">{productos.descripcion}</p>
                        <p className="card-text">Precio: {productos.precio} {productos.tipo}</p>
                        <div className="row">
                            <div className="col">
                                <h5>Seleccionar cantidad</h5>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleChange}>
                                            <option value="Cantidad">Cantidad</option>
                                            <option value="1">1 Kg</option>
                                            <option value="2">2 Kg</option>
                                            <option value="3">3 Kg</option>
                                            <option value="4">4 Kg</option>
                                            <option value="5">5 Kg</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <Button type="submit" className="btn btn-info">Añadir al Carrito</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
           
        );
    }
    render(){
        //console.log(this.props.productos[0] ? this.props.productos[0] : "nada aun");
        // if(this.props.productos[0]){
        //     this.renderProductos(this.props.productos[0]);
        // }
        // console.log(this.props.carroCompra);
        // console.log(this.props);
        return(
            <div>
                <hr/>
                <div className="container-fluid">
                    {this.props.productos[0] 
                    ?
                    <div className="row justify-content-center">
                        {this.props.productos[0].map(this.renderProductos)}
                    </div>
                    :
                    <p> Cargando ..</p>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps({productos, carroCompra}){
    return {productos, carroCompra};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addToCart}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
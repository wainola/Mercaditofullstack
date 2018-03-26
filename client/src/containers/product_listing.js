import React, {Component} from 'react';
import {connect} from 'react-redux';
//import ModalProducto from './modal';
import {Button} from 'reactstrap';
import {addToCart} from '../actions/index';
import {bindActionCreators} from 'redux';

class ProductListing extends Component{
    constructor(props){
        super(props);
        this.state = {
            cantidad: ''
        }
        this.renderProductos = this.renderProductos.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }
    handleChange(event){
        this.setState({cantidad: event.target.value});
    }
    addToCart(event){
        event.preventDefault();
        //this.props.addToCart({id: 1, item: "cebollas"});
        // this.setState({ producto_select: JSON.parse(event.target.dataset.producto)});
        // console.log(this.state);
        this.props.addToCart({ product_select: JSON.parse(event.target.dataset.producto), cantidad: this.state.cantidad});
        //console.log(this.props);
    }
    renderProductos(productos){
        //console.log("Render de productos");
        return(
            // Aproximacion cochina a la captura de los datos de cada producto
            <form 
            key={productos.id} 
            onSubmit={this.addToCart} 
            data-producto={JSON.stringify({id:productos.id, name:productos.product_name, description:productos.description})}>
                <div className="card border-info" style={{ width: "15rem", marginLeft: "10px", marginBottom: "10px" }}>

                    <img className="img-fluid" src="./productos/cebolla.png" alt="Card image cap" />
                    <div className="card-body">
                        <h4 className="card-title">{productos.product_name}</h4>
                        <p className="card-text">{productos.description}</p>
                        <div className="row">
                            <div className="col">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Seleccionar</label>
                                </div>
                            </div>
                            <div className="col align-middle">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">Cantidad</label>
                                    <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleChange}>
                                        <option>1 Kg</option>
                                        <option>2 Kg</option>
                                        <option>3 Kg</option>
                                        <option>4 Kg</option>
                                        <option>5 Kg</option>
                                    </select>
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
        console.log(this.props.carroCompra);
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
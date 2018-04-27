import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProductos, getCategories} from '../actions/index';
import {bindActionCreators} from 'redux';
import ProductListing from './product_listing';
import Navegacion from '../components/navegacion';
import CarroCompra from '../containers/carro_de_compras';
import Presentacion from '../components/main_presentacion';
import Footer from '../components/footer';

class MainContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        };
        this.onFetchData = this.onFetchData.bind(this);
    }
    componentDidMount(){
        this.onFetchData();
        this.props.getCategories();
    }
    onFetchData(){
        // This execute the action.
        // We have mapped the new state that is returned after the actions executes.
        // in the render we get the new state
        this.props.fetchProductos();
    }
    render(){
        return(
            <div>
                <div>
                    <Presentacion />
                </div>
                <div>
                    <div className="row justify-content-center">
                        <div className="container">
                            <CarroCompra />
                            {/* <h2 className="text-center">Nuestros Productos</h2> */}
                            <br />
                            <div className="row justify-content-center">
                                <Navegacion categorias={this.props.categorias}/>
                            </div>
                            <div className="row">
                                <div className="container">
                                    {/* <button type="button" onClick={this.onFetchData}>Click me</button> */}
                                    <ProductListing />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps({productos, categorias}){
    return {productos, categorias}; // { productos } === {productos:productos}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchProductos, getCategories}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
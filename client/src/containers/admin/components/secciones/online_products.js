import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../../../../actions';

class OnlineProducts extends Component{
    /*
    THIS COMPONENT FETCH ALL THE PRODUCTS THAT ARE IN THE FRONT PAGE.
    1- FIRST FETCHING FROM DB
    2- THEN FETCHING FOR CACHE (REDIS)
    */
   componentDidMount(){
       this.props.fetchProducts();
   }
    render(){
        console.log(this.props.productosPersistidos);
        return(
            <div>
                <h1>Productos en la página</h1>
            </div>
        );
    }
}
// RETURNING THE PRODUCTS THAT ARE FETCHED FROM THE API
function mapStateToProps(state){
    return { productosPersistidos: state.productos }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchProducts}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(OnlineProducts);

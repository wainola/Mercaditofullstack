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
   renderProductos(producto){
       console.log(producto)
       return(
           <div className="card border-info" key={producto._id}>
               <img src={`./${producto.urlImagen}`} alt="" className="img-fluid" />
               <img src={`${window.location.origin}/pimentones.jpg`} alt="" className="img-fluid"/>
               <div className="card-body">
                   <h4 className="card-title">
                    {producto.nombre}
                   </h4>
                   <p className="card-text">{producto.descripcion}</p>
                   <p className="card-text">Precio por unidad: {producto.precio}</p>
               </div>
           </div>
       );
   }
    render(){
        console.log(this.props.productosPersistidos);
        if(this.props.productosPersistidos.resultApi){
            let nombre = this.props.productosPersistidos.resultApi.map((item) => item.nombre);
            console.log(nombre);
        }
        return(
            <div>
                <h1>Productos en la página</h1>
                {
                    this.props.productosPersistidos.resultApi
                    ?
                    <div className="card">
                        {this.props.productosPersistidos.resultApi.map(this.renderProductos)}
                    </div>
                    :
                    <p>Cargando...</p>
                }
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

import React, {Component} from 'react';

class Products extends Component{
    constructor(){
        super();
        this.state = {
            productos: []
        };
    }
    componentDidMount(){
        fetch('/api/productos')
            .then(response => response.json())
            .then(productos => this.setState({productos}));
    }
    render(){
        console.log(this.state.productos);
        return(
            <div>
                <h1>Lista de Productos</h1>
                <ol>
                    {
                        this.state.productos.map(producto =>
                            <li key={producto.id}>{producto.name}</li>
                )}
                </ol>
            </div>
        );
    }
}

export default Products;
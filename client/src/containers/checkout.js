import React, { Component } from 'react';
import { connect } from 'react-redux';

class Checkout extends Component {
    render(){
        console.log('checkout!');
        console.log(this.props);
        return(
            <div>Checkout COMPONENT!!</div>
        );
    }
}

function mapStateToProps({carroCompra}){
    return {carroCompra};
}

export default connect(mapStateToProps)(Checkout);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';

class OrdersThisWeek extends Component{
    componentDidMount(){
        this.props.ordersOfTheWeek();
    }
    render(){
        console.log(this.props);
        return(
            <div>
                <h1>Ordenes de la semana</h1>
            </div>
        );
    }
}
function mapStateToProps(state){
    return { ordenes_de_la_semana: state.ordenes };
}
export default connect(mapStateToProps,actions)(OrdersThisWeek);
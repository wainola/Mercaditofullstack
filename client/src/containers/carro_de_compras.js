import React, {Component} from 'react';
import {connect} from 'react-redux';

class CarroCompra extends Component{
    constructor(props){
        super(props);
        this.renderBadge = this.renderBadge.bind(this);
    }
    renderBadge(){
        console.log(this.props.carroCompra.length);
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
    render(){
        console.log(this.props);
        return(
            // Always sticky-top works on container elements like div
            <div className="sticky-top">
                <a href="">
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
            </div>
        );
    }
}

function mapStateToProps({carroCompra}){
    return {carroCompra}
}
export default connect(mapStateToProps)(CarroCompra);
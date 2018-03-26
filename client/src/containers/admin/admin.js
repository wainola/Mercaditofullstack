import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavegacionAdmin from './components/navbar';
import Productos from './components/productos';

class Admin extends Component{
    render(){
        console.log("admin");
        console.log(this.props);
        return(
            <div>
                {/* NAVBAR RENDER */}
                <div className="row">
                    <div className="container-fluid">
                        <NavegacionAdmin />
                    </div>
                </div>
                {/* PRODUCTS RENDER */}
                <div className="row">
                    <Productos />
                </div>
            </div>
        );
    }
}

// MAPPING STATE TO PROPS TO GET AUTHENTICATED STATE
function mapStateToProps(state){
    return{
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(Admin);
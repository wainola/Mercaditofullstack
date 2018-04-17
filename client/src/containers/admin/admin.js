import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavegacionAdmin from './components/navbar';
import NavMenu from './components/nav_menu';
import { Route } from 'react-router-dom';
import * as actions from '../../actions';

class Admin extends Component{
    componentDidMount(){
        this.props.ordersOfTheWeek();
    }
    render(){
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
                    <div className="container">
                        {/* <NavMenu match={this.props.match}/> */}
                        <Route to={`${this.props.match.url}:sectionId`} component={NavMenu}/>
                    </div>
                </div>
            </div>
        );
    }
}

// MAPPING STATE TO PROPS TO GET AUTHENTICATED STATE
function mapStateToProps({auth, order}){
    return{
        authenticated: auth.authenticated,
        order,
        
    }
}

export default connect(mapStateToProps, actions)(Admin);
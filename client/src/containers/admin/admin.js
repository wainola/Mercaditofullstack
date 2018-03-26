import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavegacionAdmin from './components/navbar';

class Admin extends Component{
    componentWillMount(){
        const email = localStorage.getItem('mail_user');
        console.log(email);
    }
    render(){
        console.log(this.props.authenticated);
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col float-left">
                        <h3>Sección Admin</h3>
                    </div>
                    <div className="co">
                        <NavegacionAdmin />
                    </div>
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
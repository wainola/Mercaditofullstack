import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component{
    componentWillMount(){
        this.props.signoutUser();
    }
    goToRoot(){
        setTimeout(() => {
            this.props.history.push('/');
        }, 4000);
    }
    render(){
        return(
            <div className="row d-flex justify-content-center">
                    <div className="container" style={{ marginTop: "200px" }}>
                    <img src="https://media.giphy.com/media/isxmSunZOVKfK/giphy.gif" alt="" className="mx-auto d-block" />
                        <div className="alert alert-info" style={{ marginTop: "10px"}}>
                            Hasta pronto!
                    </div>
                    {this.goToRoot()}
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(Signout);
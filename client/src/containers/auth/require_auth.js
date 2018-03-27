import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const RutaPrivada = ({component: ComposedComponent, ...rest}) => {

    class Authentication extends Component {
        // REDIRECT IF NOT AUTHENTICATED; OTHERWISE, RETURN TE COMPONENT IMPUTTED INTO RUTAPRIVADA
        handlerRender(props){
            if(!this.props.authenticated){
                return <Redirect to={{
                    pathname: '/signin',
                    state: {
                        from: props.location,
                        message: 'Necesitas estar logeado!'
                    }
                }} />
            }
            else{
                return <ComposedComponent {...props} />
            }
        }

        render(){
            return(
                <Route {...rest} render={this.handlerRender.bind(this)} />
            );
        }
    }

    function mapStateToProps(state){
        return { authenticated: state.auth.authenticated };
    }

    const AuthenticationContainer = connect(mapStateToProps)(Authentication);
    return <AuthenticationContainer />
}
import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
    onSubmitSignup(event){
        event.preventDefault();
        let data = {
            email: event.target[0].value,
            password: event.target[1].value
        };
        console.log(data);
        console.log(window.location.origin);
        let ROOT_URL = `${window.location.origin === 'http://localhost:3007' ? 'http://localhost:4500' : window.location.origin}`;
        axios.post(`${ROOT_URL}/signup`, data)
        .then(
            response => {
                console.log(response.data);
                this.props.history.push('/signin');
            }
        );
    }
    render(){
        return(
            <div>
                <h1>Registro!</h1>
                <form action="" onSubmit={this.onSubmitSignup.bind(this)}>
                <div className="container">
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="email"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="contraseña"/>
                    </div>
                    <button type="submit" className="btn btn-success">Registrar</button>
                </div>
                </form>
            </div>
        );
    }
}

export default Signup;
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {loginUser} from '../../actions';
import './login.css';

class Login extends Component{
    // THIS METHOD IS USED TO RENDER ALL THE FIELDS FROM THE FORM
    renderField(field){
        // check if the state of the form changes
        const { meta: { touched, error } } = field;
        const className = `form-control ${touched && error ? 'is-invalid' : ''}`;
        console.log(touched, error);
        return(
            <div className="form-group">
                <label htmlFor="">{field.label}</label>
                <input 
                type="text"
                className={className}
                {...field.input}
                />
                <div className="text-help invalid-feedback">
                    {
                        touched ? error : ""
                    }
                </div>
            </div>
        );
    }
    // THIS METHOD POST TO THE SERVER
    onSubmit(values){

    }
    render(){

        // HANDLESUBMIT ITS A PROPS OF THE REDUX-FORM
        const {handleSubmit} = this.props;
        console.log(this.props);
        return(
            <div className="row justify-content-center login">
                <div className="card">
                    <div className="card-body">
                        <h3>Log in</h3>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Usuario"
                                name="user"
                                component={this.renderField}
                            />
                            <Field 
                                label="Contraseña"
                                name="password"
                                component={this.renderField}
                            />
                            <button type="submit" className="btn btn-success">Log in</button>
                            <Link 
                                to="/" 
                                className="btn btn-danger"
                                style={{ marginLeft: "5px"}}
                            >Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

// THIS FUNCTION VALIDATES THE FORM
function validate(values){
    // FOR NOW JUST BASIC VALIDATION
    const errors = {};
    if(!values.user){
        errors.user = "Ingrese un usuario valido";
    }
    if(!values.password){
        errors.password = "Ingrese la contraseña correcta";
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'Login'
})(
    connect(null, {loginUser})(Login)
);
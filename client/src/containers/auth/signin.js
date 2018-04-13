import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

class Signin extends Component {
    renderField(field) {
        // check if the state of the form changes
        const { meta: { touched, error } } = field;
        const className = `form-control ${touched && error ? 'is-invalid' : ''}`;
        // console.log(touched, error);
        return (
            <div className="form-group">
                <label htmlFor="">{field.label}</label>
                <input
                    type={field.label === 'Contraseña' ? 'password' : 'text'}
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
    onSubmitForm({email, password}){
        // THIS IS THE PLACE WHEN WE TRIGGER THE ACTION
        // console.log(email, password);
        this.props.signinUser({email, password}, () => {
            this.props.history.push('/admin');
        })
    }
    renderAlert(){
        if(this.props.errorMessage){
            return(
                <div className="alert alert-danger">
                    <strong>Error!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }
    render() {
        // HANDLESUBMIT ITS A PROPS OF THE REDUX-FORM
        const { handleSubmit } = this.props;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="card">
                        <div className="card-body">
                            <h3>Ingreso usuarios</h3>
                            <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
                                <Field
                                    label="Usuario"
                                    name="email"
                                    component={this.renderField}
                                />
                                <Field
                                    label="Contraseña"
                                    name="password"
                                    component={this.renderField}
                                />
                                <button type="submit" className="btn btn-success">Ingresar</button>
                                <Link
                                    to="/"
                                    className="btn btn-danger"
                                    style={{ marginLeft: "5px" }}
                                >Cancelar</Link>
                                {this.renderAlert()}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// THIS FUNCTION VALIDATES THE FORM
// TODO: ADDING BETTER VALIDATION FOR EMAIL AND PASSWORD!!!
function validate(values){
    const errors = {};
    //console.log(values);
    if(!values.email){
        errors.email = 'Ingrese un correo electrónico valido!';
    }
    if(!values.password){
        errors.password = 'Ingrese su contraseña!';
    }
    return errors;
}

// MAPPING STATE TO PROPS
function mapStateToProps(state){
    return { errorMessage : state.auth.error }
}

export default reduxForm({
    validate,
    form: 'Signin'
})(
    connect(mapStateToProps, actions)(Signin)
);
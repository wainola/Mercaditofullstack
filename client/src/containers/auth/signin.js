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
        console.log(touched, error);
        return (
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
    onSubmitForm({email, password}){
        // THIS IS THE PLACE WHEN WE TRIGGER THE ACTION
        // console.log(email, password);
        this.props.signinUser({email, password}, () => {
            this.props.history.push('/admin');
        })
    }
    renderAlert(){

    }
    render() {
        // HANDLESUBMIT ITS A PROPS OF THE REDUX-FORM
        const { handleSubmit } = this.props;
        return (
            <div className="row justify-content-center login">
                <div className="card">
                    <div className="card-body">
                        <h3>Log in</h3>
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
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

// THIS FUNCTION VALIDATES THE FORM
function validate(values){
    const errors = {};
    return errors;
}

// MAPPING STATE TO PROPS
// function mapStateToProps(state){
//     return { errorMessage : state.auth.error }
// }

export default reduxForm({
    validate,
    form: 'Signin'
})(
    connect(null, actions)(Signin)
);
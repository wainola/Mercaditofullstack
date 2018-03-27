import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../../../actions';
import { connect } from 'react-redux'; 
import { Button } from 'reactstrap';

class AddProductos extends Component{
    renderTextField(field){
        return(
            <div className="form-group">
                <label htmlFor="">{field.label}</label>
                <input 
                    type="text"
                    className='form-control'
                    {...field.input}
                />
            </div>
        );
    }
    onSubmitForm(values){
        // console.log(values);
        this.props.addNewProduct({product: values});
        this.props.reset();
        console.log(this.props.productos);
    }
    render(){
        const { handleSubmit } = this.props;
        return(
            <div className="justify-content-center mt-3">
                <h3>Añadir Productos</h3>
                <form action="" onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
                    <Field 
                        label="Nombre"
                        name="nombre"
                        component={this.renderTextField}
                        />
                    <Field
                        label="Imagen"
                        name="urlImagen"
                        component={this.renderTextField}
                    />
                    <Field
                        label="Descripcion"
                        name="descripcion"
                        component={this.renderTextField}
                    />
                    <Field
                        label="Stock"
                        name="stock"
                        component={this.renderTextField}
                    />
                    <Field
                        label="Precio"
                        name="precio"
                        component={this.renderTextField}
                    />
                    <Field
                        label="Tipo"
                        name="tipo"
                        component={this.renderTextField}
                    />
                    <Button type='submit' className='btn btn-success'>Guardar</Button>
                </form>
            </div>
        );
    }
}

function validate(values){
    const errors = {};
    return errors;
}

function mapStateToProps(state){
    return { productos: state };
}

export default reduxForm({
    validate,
    form: 'AddProductos'
})(
    connect(mapStateToProps, actions)(AddProductos)
);
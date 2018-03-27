import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../../../actions';
import { connect } from 'react-redux'; 
import { Button } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';


class AddProductos extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedFile: null
        };
    }
    renderTextField(field){
        if(field.label !== 'Descripcion' && field.label !== 'Imagen'){
            return ( 
                <div className = "form-group" >
                    <label htmlFor = "" >{field.label}</label> 
                    <input 
                        type = "text"
                        className = 'form-control' 
                        { ...field.input}/> 
                </div>
            );
        }
        else if (field.label === 'Descripcion'){
            return(
                <div className="form-group">
                    <label htmlFor="">{field.label}</label>
                    <textarea cols="30" rows="10" className='form-control'
                        {...field.input}></textarea>
                </div>
            );
        }
    }
    fileChangeHandler(event){
        console.log('file change handler')
        const file = [ ...event.target.files ];
        this.setState({selectedFile: file});
    }
    onSubmitForm(values){
        const data = new FormData();
        data.append('file', this.state.selectedFile);
        data.append('datos', values);
        // this.props.reset();
        // console.log(this.props.productos);
        for(var p of data){
            console.log(p);
        };
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        fetch('http://localhost:4500/addProd', {
            method: 'POST',
            body: data
        })
        .then(response => console.log(response));
        //this.props.addNewProduct({product: values});
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
                    {/* SPECIAL CASE FOR THE FILE INPUT */}
                    <div className="form-group">
                        <label htmlFor="">Imagen</label>
                        <input name='imagen' type="file" className='form-control.file' onChange={this.fileChangeHandler.bind(this)}/>
                    </div>
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

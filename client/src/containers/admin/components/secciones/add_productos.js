import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../../../actions';
import { connect } from 'react-redux'; 
import { Button } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import swal from 'sweetalert';


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
        data.append('file', this.uploadInput.files[0]);
        data.append('datos', JSON.stringify(values));
        console.log(this.fileName.value);
        // this.props.reset();
        //console.log(this.props.productos);
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        fetch('http://localhost:4500/saveProduct', {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.error){
                swal({
                    title: "El producto ya existe!",
                    text: "El producto no fue guardado",
                    icon: "warning",
                    button: "Close",
                });
                this.props.reset();
            }
            else{
                swal({
                    title: "Guardado con éxito!",
                    icon: "success",
                    button: "Close",
                });
            }
        });
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
                        ref={(ref) => { this.fileName = ref }}
                        />
                    {/* SPECIAL CASE FOR THE FILE INPUT */}
                    <div className="form-group">
                        <label htmlFor="">Imagen</label>
                        <input name='imagen' type="file" className='form-control.file' onChange={this.fileChangeHandler.bind(this)} ref={(ref) => { this.uploadInput = ref }}/>
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

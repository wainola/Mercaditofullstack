import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import { Table , Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';

class OrdersThisWeek extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            compras_t_0: [],
            monto_to_0: 0
        }
        this.modalDetalles = this.modalDetalles.bind(this);
    }
    // componentDidMount(){
    //     this.props.ordersOfTheWeek();
    //     console.log(this.props);
    // }
    modalDetalles(data, monto_total){
        this.setState({modal: !this.state.modal});
        console.log('modal detalles');
        console.log(data);
        this.setState({compras_t_0: data});
        this.setState({monto_to_0: monto_total});
    }
    toggle(){
        this.setState({modal: !this.state.modal});
    }
    tableInfo(datos){
        //console.log(datos);
        console.log('Datos recibidos');
        return(
                <tr key={datos.id}>
                    <th>{datos.id}</th>
                    <th>{datos.nombre}</th>
                    <th>{datos.email}</th>
                    <th>{datos.direccion}</th>
                    <th>{formatString(datos.monto_total.toString())}</th>
                    <th>
                        <Button className='btn btn-warning' onClick={() => this.modalDetalles(datos.compras, datos.monto_total)}>Detalles</Button>
                    </th>
                </tr>
        );
    }
    renderDetalles(){
        // console.log('Render detalles')
        // console.log(this.state.compras_t_0);
        console.log(this.props.order)
        return this.state.compras_t_0.map(item => 
            <ListGroupItem key={item.producto}>
                <p>Producto: <strong className='text-primary'>{item.producto.toUpperCase()}</strong></p>
                <p>Cantidad llevada: <strong>{item.cantidad}</strong></p>
                <p>Valor: {item.monto}</p>
            </ListGroupItem>
        )
    }
    renderMontoTotal(){
        return this.state.monto_to_0 !== 0 ? this.state.monto_to_0 : 0;
    }
    render(){
        let d = new Date();
        let dia = d.getDate();
        let mes = d.getMonth()+1;
        let year = d.getFullYear();
        return(
            <div className="container">
                <h3 className='lead'>Ordenes de la Semana {`${dia}/${mes}/${year}`}</h3>
                <div className="row justify-content-center">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Dirección</th>
                                <th>Total a pagar</th>
                                <th>Detalles orden</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.order.ordenes !== undefined ? this.props.order.ordenes.map(this.tableInfo.bind(this)) : <tr><th><Alert color='info'>Cargando ordenes</Alert></th></tr>}
                        </tbody>
                    </Table>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                    <ModalHeader>
                        <div>
                            <h3 className='display-4'>Detalles de la orden</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <ListGroup>
                            {this.renderDetalles()}
                        </ListGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Alert color='info'>Total a pagar: {this.renderMontoTotal()}</Alert>
                        <Button color='warning' onClick={this.toggle.bind(this)}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
function mapStateToProps({order}){
    return { order };
}

// PARTIAL SOLUTION => DOENST APPLY FOR MORE THAN 6 DIGIT
function formatString(str) {
    let l = str.length;
    let ns = '';
    if (l > 3) {
        ns = `\$${str.substring(0, l - 3)}.${str.substring(l - 3, l + 1)}`;
    }
    if (l <= 3) {
        return `\$${str}`
    }
    return ns;
}
export default connect(mapStateToProps,actions)(OrdersThisWeek);
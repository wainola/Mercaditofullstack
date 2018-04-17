import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Nav, NavItem, FormGroup, Label, Input } from 'reactstrap';

class OrdersHistory extends Component{
    getMeses(){
        let c = 1;
        let m = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembte'];
        return m.map(item => 
            <option value={item} key={c++}>{item}</option>
        );
    }
    render(){
        console.log(this.props);
        return(
            <div className="container">
                <h3 className="lead">Histórico de Órdenes</h3>
                <div className="row justify-content-start">
                    <Nav>
                        <NavItem>
                            <FormGroup className='text-center'>
                                <Input type="select" name="select" id="exampleSelect">
                                    {this.getMeses()}
                                </Input>
                            </FormGroup>
                        </NavItem>
                        <NavItem>
                            <FormGroup className='text-center'>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option value={'24/12/2018'}>{'24/12/2018'}</option>
                                </Input>
                            </FormGroup>
                        </NavItem>
                    </Nav>
                </div>
                <div className="row justify-content-center">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Mes</th>
                                <th>Nombre</th>
                                <th>Número de Orden</th>
                                <th>Detalles</th>
                            </tr>
                        </thead>
                    </Table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(){
}

export default OrdersHistory;
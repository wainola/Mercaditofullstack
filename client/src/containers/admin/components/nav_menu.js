import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

class NavMenu extends Component{
    render(){
        return(
            <div className="row justify-content-center">
                 <Nav tabs>
                    <NavItem>
                        <NavLink href="#">Link</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Link</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Another Link</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink disabled href="#">Disabled Link</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

export default NavMenu;
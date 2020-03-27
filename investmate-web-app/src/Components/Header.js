import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import '../App.css';


function Header({sectors}) {
    /*
        TODO: Need to pass the selected sector to research
     */


    const searchOptions = sectors.map((sector, i) => {
        return (
            <DropdownItem key={i}>
               <Link to="/research">{sector.name}</Link>
            </DropdownItem>
        );
    });

    return (
        <div className="header">
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/" >investmate</NavbarBrand>
                <Nav className="mr-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Research
                        </DropdownToggle>
                        <DropdownMenu right>
                            {searchOptions}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem>
                        <NavLink href="/favs/">My Favorites</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Header;
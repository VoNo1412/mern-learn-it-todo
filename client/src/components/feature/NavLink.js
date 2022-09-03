import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const NavLink = ({ name, ...rest }) => {

    return (
        <Nav.Link
            className='font-weight-bold text-white text-capitalize'
            {...rest}
            as={Link}>
            {name}
        </Nav.Link>
    )
}

export default NavLink
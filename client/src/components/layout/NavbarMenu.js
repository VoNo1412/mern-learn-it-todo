import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import learnitlogo from '../../assets/logo.svg';
import NavLink from '../feature/NavLink';

const NavbarMenu = ({ username, logout }) => {
  return (
    <Navbar expand='lg' bg="primary" variant='dark' className='shadow d-flex align-items-center'>
      <Navbar.Brand className="font-weight-border text-white">
        <img src={learnitlogo} alt="logo" width='32' height='32' className='ms-2' />
        Learn it
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto' style={{ marginBottom: 4 }}>
          <NavLink to="/dashboard" name="Dashboard" />
          <NavLink to="/about" name="about" />
          <NavLink to="/contact" name="contact" />
        </Nav>
        <Nav className='ms-auto me-3'>
          <NavLink to="/login" name={`Welcome ${username}`} />
          <button
            className='bg-success text-white fw-bold'
            onClick={logout}
            style={{ border: '1px solid transparent' }}>Logout</button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarMenu
import './header.scss';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {

    return (
        <div className="header mb-3">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Vehicle Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className='nav-link' to="/users-list">Users List</Link>
                            <Link className='nav-link' to="/user/create">Create User</Link>
                            <Link className='nav-link' to="/vehicles-list">All Vehicles</Link>
                            <Link className='nav-link' to="/vehicle/create">Create vehicle</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
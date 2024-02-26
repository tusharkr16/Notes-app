import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, Col, Form, Row } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar expand="lg" bg="primary" variant="dark" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Notes-Zipper</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form inline className="ml-auto">
                        <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2"
                                />
                            </Col>
                        </Row>
                    </Form>
                    <Nav className="ml-auto">
                        <Nav.Link href="#home">My Notes</Nav.Link>
                        <NavDropdown title="Tushar Gupta" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;

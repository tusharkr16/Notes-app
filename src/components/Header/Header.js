import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const Navigate = useNavigate();
    return (
        <Navbar expand="lg" bg="primary" variant="dark" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                        Notes-Zipper
                    </Link>
                </Navbar.Brand>
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
                        <Nav.Link>
                            <Link to="/myNotes">
                                My Notes
                            </Link>
                        </Nav.Link>
                        <NavDropdown title="Tushar Gupta" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2" onClick={() => {
                                localStorage.removeItem("userInfo");
                                Navigate('/')
                            }}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;

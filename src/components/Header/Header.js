import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'


const Header = () => {
    const Navigate = useNavigate();
    const [name, setName] = useState('');
    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userInfoString);
    const fetchDetail = () => {

        if (userInfo) {

            setName(userInfo.name);
        }
        else {
            setName('User')
        }


    }

    useEffect(() => {
        fetchDetail();
    }, [])
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
                    {userInfo ? (
                        <>
                            <Nav className="ml-auto">
                                <Nav.Link>
                                    <Link to="/myNotes">
                                        My Notes
                                    </Link>
                                </Nav.Link>
                                <NavDropdown title={name} id="basic-nav-dropdown">
                                    <Link to="/profile">
                                        <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item href="#action/3.2" onClick={() => {
                                        localStorage.removeItem("userInfo");
                                        Navigate('/');
                                    }}>Log Out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </>
                    ) : (<Nav.Link href="/login">Login</Nav.Link>)}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;

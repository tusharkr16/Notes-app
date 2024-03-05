import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Form, Button, Col } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import Error from '../../components/Error';
import Screen from '../Screen';
import axios from 'axios';
import Loading from '../../components/Loading';

const Register = () => {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState(null);
    const [error, SetError] = useState();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const postDetails = async (pics) => {
        console.log(pics);
        if (!pics) {
            return setMessage("Please select an Image")
        }
        setMessage(null);
        if (pics.type == 'image/jpeg' || pics.type == 'image/png') {
            const data = new FormData();
            data.append('file', pics)
            data.append('upload_preset', 'Notezipper')
            data.append('cloud_name', 'dpiud4zo4')
            const response = await fetch('https://api.cloudinary.com/v1_1/dpiud4zo4/image/upload', {
                method: "POST",
                body: data,
            }).then((res) => res.json()).then((data) => setPic(data.url.toString())).catch((err) => {
                console.log(err);
            })
        }
        else {
            console.log('please select correct format');
        }

        console.log(pic);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(pic)
        if (!name || !email || !password) {
            SetError("Required all the fields");
            setLoading(false);
        }
        else {

            if (password !== confirmpassword) {
                SetError("Passwords Do not Match");
            }
            else {
                setMessage(null);
                try {
                    const config = {
                        headers: {
                            "Content-type": "application/json",
                        },
                    };

                    setLoading(true);
                    const { data } = await axios.post("/api/users",
                        { name, pic, email, password },
                        config
                    );
                    setLoading(false);
                    localStorage.setItem("userInfo", JSON.stringify(data));
                    console.log(data);
                    Navigate('/login')
                } catch (error) {
                    console.error("Registration Error:", error);
                    SetError(error.response.data.message);

                    setLoading(false);
                }
            }
        }
        console.log(pic)

    }

    // useEffect(() => {
    //     const userInfo = localStorage.getItem("userInfo");
    //     if (userInfo) {
    //         Navigate('/login')
    //     }
    // }, [Navigate])
    return (
        <Screen title="REGISTER">
            <div className="container">
                <div className="loginContainer">
                    {error && <Error variant='danger'>{error}</Error>}
                    {loading && <Loading variant='danger' />}
                    {message && <Loading variant='warning' />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                value={name}
                                placeholder="Enter name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmpassword}
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Profile picture</Form.Label>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Choose a file:</Form.Label>
                                <Form.Control type="file" onChange={(e) => postDetails(e.target.files[0])} />
                            </Form.Group>
                        </Form.Group>
                        <Button variant="primary" type="submit" className='mt-3'>
                            Register
                        </Button>
                    </Form>
                    <Row className="py-3">
                        <Col>
                            Have an Account ? <Link to="/login">Login</Link>
                        </Col>
                    </Row>
                </div>
            </div>

        </Screen>
    )
}

export default Register
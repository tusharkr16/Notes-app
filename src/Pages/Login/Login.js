import React, { useState } from 'react'
import Screen from '../Screen'
import Form from 'react-bootstrap/Form';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, SetError] = useState('');

    const Navigate = useNavigate();



    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            setLoading(true);

            const { data } = await axios.post('/api/users/login', {
                email,
                password
            },
                config
            );
            console.log(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            Navigate('/myNotes');
        } catch (error) {
            console.error("Login Error:", error);
            if (error.response && error.response.data && error.response.data.message) {
                SetError(error.response.data.message);
            } else {
                SetError("Invalid credential");
            }
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     const userInfo = localStorage.getItem("userInfo");
    //     if (userInfo) {
    //         Navigate('/myNotes')
    //     }
    // }, [Navigate])
    return (
        <Screen title={'Login'}>
            <div className="loginContainer">
                {error && <Error variant='danger'>{error}</Error>}
                {loading && <Loading />}
                <div className="container">
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <Row className='py-3'>
                        <Col>
                            New Customer ? <span> </span>
                            <Link to="/register">Register here</Link>

                        </Col>
                    </Row>
                </div>
            </div>
        </Screen>
    )
}

export default Login
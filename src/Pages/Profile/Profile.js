import React, { useEffect, useState } from 'react'
import Screen from '../Screen'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Profile = () => {
    const Navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );

    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userInfoString);
    const img1 = userInfo.pic;
    const fetchData = async () => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(pic)
        if (!name || !email || !password) {
            setError("Required all the fields");

        }
        else {

            if (password !== confirmPassword) {
                setError("Passwords Do not Match");
            }
            else {
                setMessage(null);
                setSuccess(false);
                try {
                    const config = {
                        headers: {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${userInfo.token}`
                        },
                    };


                    const { data } = await axios.post("/api/users/profile",
                        { name, pic, email, password },
                        config
                    );
                    console.log(data);
                    setSuccess(true);
                    Navigate('/myNotes')
                } catch (error) {
                    console.error("Registration Error:", error);
                    setError(error.response.data.message);


                }
            }
        }
        console.log(pic)

    }

    const postDetails = async (pics) => {
        console.log(pics);

        if (!pics) {
            return setMessage("Please select an Image");
        }

        setMessage(null);

        try {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'Notezipper');
            data.append('cloud_name', 'dpiud4zo4');

            const response = await fetch('https://api.cloudinary.com/v1_1/dpiud4zo4/image/upload', {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            if (result.url) {
                setPic(result.url.toString());
                console.log(result);
            } else {
                console.error('Unexpected Cloudinary response:', result);
            }
        } catch (err) {
            console.error('Error during image upload:', err);
        }
    };



    useEffect(() => {
        fetchData();
    }, []);


    return (
        <Screen title="EDIT PROFILE">
            <div className='container'>
                <Row className="profileContainer">
                    <Col md={6}>
                        <Form onSubmit={submitHandler}>
                            {success && (
                                <Error variant="success">
                                    Updated Successfully
                                </Error>
                            )}
                            {error && <Error variant="danger">{error}</Error>}
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>{" "}
                            <Form.Group controlId="pic">
                                <Form.Label>Change Profile Picture</Form.Label>
                                <Form.Control type="file" onChange={(e) => postDetails(e.target.files[0])} />
                            </Form.Group>
                            <Button type="submit" varient="primary" className='mt-3'>
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img src={img1} alt={name} className="profilePic" />
                    </Col>
                </Row>
            </div>
        </Screen>
    )
}

export default Profile
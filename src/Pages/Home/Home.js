import React from 'react'
import './Home.css'
import { Button, Col, Container, Row } from 'react-bootstrap'

const Home = () => {
    return (
        <div className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <div>
                            <h1 className='title'>Welcome to Note Zipper</h1>
                            <p className='subtitle'>One safe place for all your Notes</p>
                        </div>
                    </div>
                </Row>
                <div className='buttonContainer'>

                    <a href="/signIn">
                        <Button size='lg' className='landingButton1'>Sign In</Button>
                    </a>


                    <a href="/logIn">
                        <Button size='lg' className='landingButton' variant='outline-primary'>Log In</Button>
                    </a>
                </div>
            </Container>
        </div>
    )
}

export default Home
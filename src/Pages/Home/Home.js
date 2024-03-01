import React from 'react'
import './Home.css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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

                    <Link to={'/register'}>
                        <Button size='lg' className='landingButton1'>Sign In</Button>
                    </Link>


                    <Link to={'/login'}>
                        <Button size='lg' className='landingButton' variant='outline-primary'>Log In</Button>
                    </Link>

                </div>
            </Container>
        </div>
    )
}

export default Home
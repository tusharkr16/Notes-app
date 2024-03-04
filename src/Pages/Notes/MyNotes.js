import React, { useEffect, useState } from 'react'
import Screen from '../Screen'
import { Link, useNavigate } from 'react-router-dom'
import { Badge, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import Loading from '../../components/Loading'
import Error from '../../components/Error'



const MyNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const Navigate = useNavigate();

    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userInfoString);

    const deleteHandler = async () => {
        try {
            // setLoading(true);
            window.alert('Are you sure? You want to delete the note')

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.delete(`http://localhost:5000/api/notes/${userInfo._id}`,
                config
            );
            setLoading(false);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    }

    const fetchNotes = async () => {
        try {
            // setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get('http://localhost:5000/api/notes',
                config
            );
            setNotes(data);
            setLoading(false);
            // console.log(data);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
            setLoading(false);
        }
    }

    const deleteNotes = async () => {
        try {

        } catch (error) {

        }
    }

    // console.log(notes)
    useEffect(() => {
        fetchNotes();
        if (!userInfo) {
            Navigate('/');
        }
    }, [])
    return (
        <Screen title={`Welcome Back ${userInfo.name}..`}>
            <Link to='/createNote'>
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
                    Create new Note
                </Button>
            </Link>
            {loading && <Loading />}
            {error && <Error variant='danger'>{error}</Error>}
            {notes.map((note) => (
                <Card style={{ margin: 10 }} key={note._id}>
                    <Card.Header style={{ display: 'flex', }}>
                        <span style={{
                            color: 'black',
                            textDecoration: 'none',
                            flex: 1,
                            cursor: 'pointer',
                            alignSelf: 'center',
                            fontSize: 18,
                        }} >{note.title} </span>
                        <div>
                            <Link to={`/MyNote/${note._id}`}>
                                <Button>Edit</Button>
                            </Link>
                            <Button variant='danger' className='mx-2' onClick={() => deleteHandler(note._id)}>Delete</Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <h4>
                            <Badge variant="success">
                                Category - {note.category}
                            </Badge>
                        </h4>
                        <blockquote className="blockquote mb-0">
                            <p>
                                {note.content}
                            </p>
                            <footer className="blockquote-footer">
                                Created on{" "}
                                <cite title='Source title'>
                                    {note.createdAt.substring(0, 10)}
                                </cite>
                            </footer>

                        </blockquote>
                    </Card.Body>
                </Card>
            ))}


        </Screen>
    )
}

export default MyNotes
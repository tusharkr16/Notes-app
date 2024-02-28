import React, { useEffect, useState } from 'react'
import Screen from '../Screen'
import { Link } from 'react-router-dom'
import { Badge, Button, Card } from 'react-bootstrap'
import axios from 'axios'



const MyNotes = () => {
    const [notes, setNotes] = useState([]);

    const deleteHandler = (id) => {
        window.alert('are u sure?')
    }

    const fetchNotes = async () => {
        try {
            const { data } = await axios.get('/api/notes');
            setNotes(data);

        } catch (error) {
            console.log(error);
        }

    }

    console.log(notes)
    useEffect(() => {
        fetchNotes();
    }, [])
    return (
        <Screen title={'Welcome Tushar kumar'}>
            <Link to='createNode'>
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
                    Create new Note
                </Button>
            </Link>
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
                            <Badge variant='success'>
                                Category - {note.category}
                            </Badge>
                        </h4>
                        <blockquote className="blockquote mb-0">
                            <p>
                                {note.content}
                            </p>
                            <footer className="blockquote-footer">
                                {note.category} <cite title="Source Title">Source Title</cite>
                            </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
            ))}


        </Screen>
    )
}

export default MyNotes
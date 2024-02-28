import React from 'react'
import Screen from '../Screen'
import { Link } from 'react-router-dom'
import { Badge, Button, Card } from 'react-bootstrap'

const notes = [
    {
        _id: "1",
        title: "Day 1 of college",
        content:
            "I made a few new friends and introduced myself to a lot of new teachers.",
        category: "College",
    },
    {
        _id: "2",
        title: "Learned some Node JS",
        content: "Learned how to create a server in node JS and my first API",
        category: "Learning",
    },
    {
        _id: "3",
        title: "Watched some Anime",
        content: "Finished 2 seasons of Attack on Titan and My Hero academia.",
        category: "Entertainment",
    },
    {
        _id: 4,
        title: "Started React JS",
        content:
            "Made my first App in React JS, feels awesome to learn something new. I aim to be a full stack dev someday",
        category: "Learning",
    },
];

const MyNotes = () => {

    const deleteHandler = (id) => {
        window.alert('are u sure?')
    }
    return (
        <Screen title={'Welcome Tushar kumar'}>
            <Link to='createNode'>
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
                    Create new Note
                </Button>
            </Link>
            {notes.map((note) => (
                <Card style={{ margin: 10 }}>
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
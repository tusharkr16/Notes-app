import React, { useEffect, useState } from 'react'
import Screen from '../Screen';
import { Button, Card, Form } from 'react-bootstrap';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import ReactMarkdown from "react-markdown";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SingleNotes = () => {
    const { id } = useParams();
    const Navigate = useNavigate();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState('');

    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userInfoString);

    const fetchNotes = async () => {
        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get(`http://localhost:5000/api/notes/${id}`,
                config
            );
            console.log(data);
            setContent(data.content);
            setCategory(data.category);
            setTitle(data.title);
            setLoading(false);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
            setLoading(false);
        }
    }

    const updateHandler = async (e) => {
        e.preventDefault();
        if (!title || !content || !category) {
            setError("Please fill all the fields");
        } else {

            try {
                console.log(id);
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }

                const { data } = await axios.put(`http://localhost:5000/api/notes/${id}`,
                    { title, content, category },
                    config
                )

                setLoading(false);
                Navigate('/myNotes');
            } catch (error) {
                console.log(error);
                setError(error.response.data.message);
            }
        }
    }

    const deleteHandler = () => {
        console.log('hh')
    }

    useEffect(() => {
        fetchNotes();
    }, [])
    return (
        <Screen title="Edit Note">
            <Card>
                <Card.Header>Edit your Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {loading && <Loading />}
                        {error && <Error variant="danger">{error}</Error>}
                        {/* {errorDelete && (
                            <Error variant="danger">{errorDelete}</Error>
                        )} */}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                placeholder="Enter the title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter the content"
                                rows={4}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        <Form.Group controlId="content">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="content"
                                placeholder="Enter the Category"
                                value={category}
                            // onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        {loading && <Loading size={50} />}
                        <Button variant="primary" type="submit" className='mt-3'>
                            Update Note
                        </Button>
                        <Button
                            className="mx-2 mt-3"
                            variant="danger"
                        // onClick={() => deleteHandler(match.params.id)}
                        >
                            Delete Note
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Updated on - {date.toLocaleDateString()}
                </Card.Footer>
            </Card>
        </Screen>
    )
}

export default SingleNotes
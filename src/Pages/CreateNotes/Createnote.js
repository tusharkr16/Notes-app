import React, { useState } from 'react'
import Screen from '../Screen'
import { Button, Card, Form } from 'react-bootstrap'
import Error from '../../components/Error';
import ReactMarkdown from "react-markdown";
import Loading from "../../components/Loading"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Createnote = () => {
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const Navigate = useNavigate();

    const resetHandler = async () => {
        setTitle("");
        setCategory("");
        setContent("");
    }
    const userInfoString = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(userInfoString);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!title || !content || !category) {
            setError("Please fill all the fields");
        }
        else {
            console.log(title, content, category);
            try {
                setLoading(true);
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }

                const { data } = await axios.post(`http://localhost:5000/api/notes/create`, {
                    title, content, category
                },
                    config
                );
                setLoading(false);
                Navigate('/myNotes');
            } catch (error) {
                console.log(error);
                setError(error.response ? error.response.data.message : "An error occurred");
                setLoading(false)
            }
        }
    }


    return (
        <Screen title="Create a Note">
            <Card>
                <Card.Header>Create a new Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        {error && <Error variant="danger">{error}</Error>}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                value={title}
                                placeholder="Enter the title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={content}
                                placeholder="Enter the content"
                                rows={4}
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
                                value={category}
                                placeholder="Enter the Category"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        {loading && <Loading size={50} />}
                        <Button type="submit" variant="primary" className='mt-3' onClick={submitHandler}>
                            Create Note
                        </Button>
                        <Button className="mx-2 mt-3" onClick={resetHandler} variant="danger">
                            Reset Feilds
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Creating on - {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </Screen>
    )
}

export default Createnote
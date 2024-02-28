const express = require('express');
const dotenv = require('dotenv');
require('./db/db');
const userRoutes = require('./routes/routes')

const app = express();
dotenv.config();
app.use(express.json())

const PORT = process.env.PORT || 4000;

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

app.get('/', (req, res) => {
    res.send('hello from server');
})

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const note = notes.find((n) => n._id == req.params.id);
    res.send(note);
})

app.use('/api/users', userRoutes)

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
})
const express = require('express');
const notes = require('./data');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;


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

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
})
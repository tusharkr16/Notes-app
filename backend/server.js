const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
require('./db/db');
const userRoutes = require('./routes/routes');
const notesRoutes = require('./routes/notesRoutes');

const app = express();
dotenv.config();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('hello from server');
})



// app.get('/api/notes/:id', (req, res) => {
//     const note = notes.find((n) => n._id == req.params.id);
//     res.send(note);
// })

app.use('/api/users', userRoutes);
app.use('/api/notes', notesRoutes);

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
})
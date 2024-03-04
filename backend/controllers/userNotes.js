const Note = require('../models/notesModel');
const asyncHandler = require('express-async-handler')

const getNotes = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
    }
    console.log(req.user);
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    console.log(req.user._id);

    if (!title || !content || !category) {
        res.status(400)
        throw new Error("Please Fill all the fields");
    }
    else {
        const note = new Note({ user: req.user._id, title, content, category });
        const createdNote = await note.save();

        res.status(201).json(createdNote);
    }
});

const getNotesById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ message: "Note not found" });
    }
})

const updateNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    const updateNote = await Note.findById(req.params.id);
    if (updateNote.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("you cant perform this action");
    }

    if (updateNote) {
        updateNote.title = title;
        updateNote.content = content;
        updateNote.category = category;
        const updated = await updateNote.save();
        res.json(updated);
    }
    else {
        res.status(401)
        throw new Error("note doesnt found");
    }
});

const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You cant perform this action");
    }

    if (!note) {
        res.status(401);
        throw new Error("Note not found");
    }
    await note.deleteOne();
    res.json({ message: "Note removed" });
})

module.exports = { getNotes, createNote, getNotesById, updateNote, deleteNote }
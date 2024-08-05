const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Get all the notes. Login required.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id});
        return res.json(notes);
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).send("Internal server error. Please report the issue to the admin or try after sometime.");
    }
});

//Add a new note. Login required.
router.post('/addnote', fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    //Validate all the parameters in req and if any error is found then throw it.
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array() });
    }    
    try {
        const {title, description, tag} = req.body;
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id,
            date: Date.now()
        });
        const savedNote = await note.save();
        success = true;
        return res.status(200).json({success, savedNote, msg: "Note saved successfully"});
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).send("Internal server error. Please report the issue to the admin or try after sometime.");
    }
});

//Update an existing note. Login required.
router.put('/updatenote/:id', fetchuser, async (req, res) => {
   
    try {
        let success = false;

        const {title, description, tag} = req.body;
        //Create a newNote object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be update and update it.
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).json({success, msg:"Not Found"});
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({success, msg:"Not Allowed"});
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        success = true;
        return res.status(200).json({success, note, msg: "Note updated successfully"});
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).send("Internal server error. Please report the issue to the admin or try after sometime.");
    }
});

//Delete an existing note. Login required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {  
    try {
        let success = false;
        //Find the note to be delete and delete it.
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).json({success, msg:"Not Found"});
        }
        //Allow deletion only if user owns this note.
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({success, msg: "Not Allowed"});
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        success = true;
        return res.status(200).json({success, msg: "Success: Note deleted successfully"});
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).send("Internal server error. Please report the issue to the admin or try after sometime.");
    }
});

module.exports = router;
const express = require('express')
const router = express.Router()
var fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');





//ROUTE 1 get all the notes using GET 'api/auth/FETCHALLNOTES' 

router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json([notes])
    } catch (error) {

        console.log(error.message);
        res.status(500).send("Internal server error occured");

    }

})

//ROUTE 2 post the notes using POST 'api/auth/addnote' 

router.post('/addnote', fetchuser, [

    body('title', "Enter a valid title of more than 1 character").isLength({ min: 1 }),
    body('description', "Enter a valid description of more than 1 character").isLength({ min: 1 }),

], async (req, res) => {


    try {

        //destructuring
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({

            title, description, tag, user: req.user.id

        })
        const savednote = await note.save()

        res.json(savednote)

        res.json([Note])
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");

    }
})


// ROUTE 3: Update a note using PUT '/api/notes/updatenote/:id'
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {newNote.title = title};
    if (description) {newNote.description = description};
    if (tag){ newNote.tag = tag};
  
    try {
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send('Not Found');
      }
  
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send('Action not allowed');
      }
  
      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal server error occurred');
    }
  });


  // ROUTE 4: Delete a note using delete '/api/notes/deletenote/:id'
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  //find the note to be deleted and delete it
  const newNote = {};
  if (title) {newNote.title = title};
  if (description) {newNote.description = description};
  if (tag){ newNote.tag = tag};

  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send('Not Found');
    }
//allow deletion if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Action not allowed');
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted"});


  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error occurred');
  }
});


module.exports = router
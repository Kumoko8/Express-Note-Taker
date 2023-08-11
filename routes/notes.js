const express = require("express");
const notesRouter = express.Router()
const fs = require("fs");
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const app = express();
const readFromFile = util.promisify(fs.readFile);


//Get all notes
notesRouter.get('/api/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);


//post a new note
notesRouter.post('/api/notes', (req, res) =>{
    console.info(`${req.method} request was received to save note`)

    let newNote;
    let savedNotes;

    const dbFile = fs.readFileSync("./db/db.json");
    savedNotes = JSON.parse(dbFile);


    const {title, text} = req.body;

    if (req.body) {
        newNote ={
            id: uuidv4(),
            title,
            text,
        };

   
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes, null, 2));

    res.send("Note saved!");

    
}
});

notesRouter.delete('/api/notes/:id', async (req, res) =>{
    console.info(`${req.method} request was received to delete note`)
    try{
        const id = req.params.id

        const notesData = await fs.readFileSync('./db/db.json', 'utf-8');
        const notes = JSON.parse(notesData);
        

        const index = notes.findIndex(notesData => notesData.id === id);
        console.log(index);
        if (index !== -1) {
             notes.splice(index, 1);

             await fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 2));

            res.status(204).send(); // No content
         } else {
            res.status(404).json({ message: 'Note not found' });
    }

    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
    }
})
module.exports = notesRouter;
const express = require("express");
const notesRouter = express.Router()
const fs = require("fs");
const util = require('util');

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
            id: savedNotes.length + 1,
            title,
            text,
        };

   
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes, null, 2));

    res.send("Note saved!");

    
}
});
module.exports = notesRouter;
const express = require("express");
const notesRouter = express.Router()
const fs = require("fs");

const app = express();

function displayNotes() {
    const notes = fs.readFileSync("./db/db.json", "utf8", (err, data)=> {
        if(err) {
            console.error("Error reading file:", err);
        } else {
            console.log("Content:", data);
        }
    });
    return JSON.parse(notes)
}
notesRouter.get("/api/notes", (req, res) => {
    res.send(displayNotes())
} )

notesRouter.post("/save", (req, res) =>{
    console.info(`${req.method} request was received to save note`)

    const {noteTitle, noteText} = req.body;
    if (!noteTitle || noteText) {
        res.status(400).send ("Title and text are required");
        return;
    }

    const dbFile = fs.readFileSync("./db/db.json");
    let savedNotes = JSON.parse(dbFile);

    const newNote ={
        noteTitle,
        noteText,
    };

    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes, null, 2));

    res.send("Note saved!");

    
})
module.exports = notesRouter;
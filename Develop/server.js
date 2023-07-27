const express = require("express");
const fs = require("fs")
const path = require("path")

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded())
app.use(express.static("public"));

app.use(require(path.join(__dirname, "routes/notes.js")))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})
app.get("/notes", (req, res) =>{
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

//how is this post request connected to the database?


app.listen(PORT, () => {
    console.log(`application successful listening to http://localhost:${PORT}`)
})

// I want the app to be able to take in 
//notes typed into the program
//save them in the area on the left
//and then be able to delete or view them after

//I need to create a route that responds to a POST request 
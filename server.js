const express = require("express");
const path = require("path")

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(require(path.join(__dirname, "routes/notes.js")))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})
app.get("/notes", (req, res) =>{
    res.sendFile(path.join(__dirname, "public/notes.html"))
})



app.listen(PORT, () => {
    console.log(`application successful listening to http://localhost:${PORT}`)
})

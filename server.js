const { json } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json");

// set up server
const app = express();

// if any routes or 3001
const PORT = process.env.PORT || 3001;

// middleware for static folder
app.use(express.static("public"));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET Route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Get Route for notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Get Route for api/notes
app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// Post Route for api/notes
app.post("/api/notes", function (req, res) {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) throw err;

    let readNotes = JSON.parse(data);

    let newNote = req.body;
    newNote.id = readNotes.length.toString();
    readNotes.push(newNote);

    fs.writeFile("db/db.json", JSON.stringify(readNotes), "utf8", (err) => {
      if (err) throw err;
      console.log("successfully added!");
    });

    res.json(readNotes);
  });
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

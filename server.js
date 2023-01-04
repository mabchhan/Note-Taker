const { notEqual } = require("assert");
const { json } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");

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
    newNote.id = readNotes.length;
    readNotes.push(newNote);

    fs.writeFile("db/db.json", JSON.stringify(readNotes), "utf8", (err) => {
      if (err) throw err;
      console.log("successfully added!");
    });

    res.json(readNotes);
  });
});

// Delete Route for api/notes
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("db/db.json", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    // let newData;
    const found = notes.some((note) => note.id === parseInt(req.params.id));
    console.log(found);
    if (found) {
      //   return (notes = res.json(
      notes = notes.filter((note) => note.id !== parseInt(req.params.id));
    } else {
      console.log("id not found");
    }

    //console.log(notes);
    fs.writeFile("db/db.json", JSON.stringify(notes), "utf8", (err) => {
      if (err) throw err;
      console.log("Success!");
    });
    res.json(notes);
  });
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

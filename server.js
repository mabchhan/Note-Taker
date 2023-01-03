const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");

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
  res.json(notes);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

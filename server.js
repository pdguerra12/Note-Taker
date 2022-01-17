const fs = require("fs");
const path = require("path");
const uuidv1 = require("uuidv1");
const express = require("express");
// const dbjson = require('./db/db.json')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
	const notesData = fs.readFileSync(
		path.join(__dirname, "./db/db.json"),
		"utf-8"
	);
	const notesParse = JSON.parse(notesData);
	res.json(notesParse);
});

app.post("/api/notes", (req, res) => {
	const notesData = fs.readFileSync(
		path.join(__dirname, "./db/db.json"),
		"utf-8"
	);
	const notesParse = JSON.parse(notesData);
	req.body.id = uuidv1();
	notesParse.push(req.body);

	fs.writeFileSync(
		path.join(__dirname, "./db/db.json"),
		JSON.stringify(notesParse),
		"utf-8"
	);
	res.json("You have added a note!");
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

// app.delete("/api/notes/:id", function (req, res) {});

app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});

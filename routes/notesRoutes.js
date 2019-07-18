const express = require('express');
const router = express.Router();
const notes = require('../controller/notesController.js');


router.get("/getNotes", notes.getAllNotes);
router.get("/note/getNote/", notes.getNote);
router.post("/note/saveNote/", notes.saveNote);
router.put("/note/updateNote/", notes.updateNote);
router.delete("/note/deleteNote/", notes.deleteNote);

module.exports = router;

const express = require("express");
const routes = express.Router();
const {
  addNote,
  updateNote,
  getNotes,
  getNoteById,
} = require("../controllers/note.controller");

routes.route("/").post(addNote);
routes.route("/:id").patch(updateNote);
routes.route("/:id").get(getNoteById);
routes.route("/").get(getNotes);

module.exports = routes;

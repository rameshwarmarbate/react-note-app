const { map, find } = require("lodash");
const Note = require("../models/note.model");

// Add a note
const addNote = async (req, res, next) => {
  const { title, contents } = req.body;

  const restructureContents = map(contents, ({ type, value }) => {
    return {
      data: value.preview ? Buffer.from(value.preview, "base64") : null,
      contentType: value.contentType,
      type,
      value: type === "text" ? value : null,
    };
  });
  const note = new Note({
    title,
    contents: restructureContents,
  });

  try {
    await Note.create(note);
    return res.send("Success.");
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// Update a note
const updateNote = async (req, res, next) => {
  const { title, contents } = req.body;
  const { id } = req.params;
  const restructureContents = map(contents, ({ type, value }) => {
    return {
      data: value.preview ? Buffer.from(value.preview, "base64") : null,
      contentType: value.contentType,
      type,
      value: type === "text" ? value : null,
    };
  });

  try {
    await Note.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          contents: restructureContents,
        },
      },
      { new: true }
    );
    return res.send("Success.");
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().lean();
    return res.send(
      map(notes, ({ _id, title, createdAt, contents }) => ({
        _id,
        title,
        createdAt,
        desc: find(contents, ({ type }) => type === "text")?.value || "",
      }))
    );
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id).lean();

    return res.send({
      ...note,
      contents: map(note.contents, ({ type, value, contentType, data }) => ({
        type,
        value:
          type === "text"
            ? value
            : {
                contentType,
                preview: `data:${contentType};base64,${data.toString(
                  "base64"
                )}`,
              },
      })),
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  addNote,
  updateNote,
  getNotes,
  getNoteById,
};

const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Notes = require("../models/notes");
const User = require("../models/user");
const notesRouter = express.Router();

notesRouter.post("/note/create", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;
    const { title, content, tag } = req.body;
    if (!title) {
      throw new Error("Please Enter a Title");
    }

    const note = new Notes({
      title: title,
      content: content,
      tag: tag,
      user: userId,
    });

    await note.save();
    res.status(201).json({
      success: true,
      message: "Note Added Successfully!",
      note,
    });
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

notesRouter.get("/notes/all", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;
    const notes = await Notes.find({
      user: userId,
    });

    if (notes.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No notes to show",
        notes: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Your Notes!",
      notes,
    });
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

notesRouter.put("/note/update/:noteId", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;
    const noteId = req.params.noteId;
    const { title, content, tag } = req.body;
    const note = await Notes.findById(noteId);

    if (!note) {
      throw new Error("No note found");
    }
    if (!note.user.equals(userId)) {
      return res.status(200).json({
        success: true,
        message: "Invalid note",
        notes: [],
      });
    }
    if (title) note.title = title;
    if (content) note.content = content;
    if (tag) note.tag = tag;

    await note.save();
    res.status(200).json({
      success: true,
      message: "Note Updated Successfully!",
      note,
    });
  } catch (error) {
    res.status(401).send("ERROR :" + error.message);
  }
});

notesRouter.get("/note/view/:noteId", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;
    const noteId = req.params.noteId;
    const note = await Notes.findById(noteId);
    if (!note.user.equals(userId)) {
      return res.status(200).json({
        success: true,
        message: "Invalid note",
        notes: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Here is your selected Noted",
      note,
    });
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

notesRouter.delete("/note/delete/:noteId", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;
    const noteId = req.params.noteId;
    if (!note.user.equals(userId)) {
      return res.status(200).json({
        success: true,
        message: "Invalid Note",
        note,
      });
    }
    const note = await Notes.findByIdAndDelete(noteId);

    if (!note) {
      return res.status(200).json({
        success: true,
        message: "Invalid Note",
        note,
      });
    }

    res.status(200).json({
      success: true,
      message: "here is your deleted note",
      note,
    });
  } catch (error) {
    throw new Error("ERROR :" + message.error);
  }
});

module.exports = notesRouter;

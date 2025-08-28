const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Notes = require("../models/notes");
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
    res.json("Note Added Successfully!");
  } catch (error) {
    res.status(201).json({
      success: true,
      message: "Note Added Successfully!",
      note,
    });
  }
});

module.exports = notesRouter;

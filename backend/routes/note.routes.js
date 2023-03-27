const express = require("express");
const { NoteModel } = require("./models/note.model.js");


const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.find();
        res.send(notes);
    } catch (err) {
        res.send({ "err in getting all notes": err });
    }
})

noteRouter.post("/create", async (req, res) => {
    const payload = req.body;
    try {
        const new_note = new NoteModel(payload);
        await new_note.save();
        res.send("Created the note");
    } catch (err) {
        res.send({ "err in creating note": err });
    }
})

noteRouter.patch("/update/:id", async (req, res) => {
    const ID = req.params.id;
    const payload = req.body;
    const note = await NoteModel.findOne({ "_id": ID });
    const userID_in_note = note.userID;
    const user_making_req = req.body.userID;
    try {
        if (userID_in_note == user_making_req) {
            res.send({ "msg": "You are not authorized" });
        }
        else {
            await NoteModel.findByIdAndUpdate({ _id: ID }, payload);
            res.send({ "msg": "Updated the note" });
        }
    } catch (err) {
        res.send({ "err in updating the note": err });
    }
})

noteRouter.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id;
    const note = await NoteModel.findOne({ "_id": ID });
    const userID_in_note = note.userID;
    const user_making_req = req.body.userID;
    try {
        if (userID_in_note == user_making_req) {
            res.send({ "msg": "You are not authorized" });
        }
        else {
            await NoteModel.findByIdAndDelete({ _id: ID });
            res.send({ "msg": "Deleted the note" });
        }
    } catch (err) {
        res.send({ "err in deleting the note": err });
    }
})

module.exports = { noteRouter };
//Every file has it's use, this file is used to create the server

const express = require('express');

const app = express();

const notes = [];

//middleware - It is used to convert the return from the client side into usable format

app.use(express.json()) //express.json() is a middleware, to use it we use app.use

//Posting a note on the server (POST method)
app.post('/notes', (req, res) => {
    // console.log(req.body)

    notes.push(req.body);
    res.status(201).json({message:"Note created succesfully"})

})

//Getting all the notes on the client side (GET method)
app.get('/notes' , (req,res) => {

    res.status(200).json({
        message : "notes fetched successfully",
        notes : notes
    })
})

//Deleting a note (DELETE method)
app.delete('/notes/:index', (req,res) => {
        const index = req.params.index

        delete notes[index]

        res.status(200).json({
            message : "Note deleted successfully"
        })
})

//Changing description of a note (PATCH method)
app.patch('/notes/:index' , (req,res) => {
    const index = req.params.index;

    const description = req.body.description

    //if note is not found, then return an error message
    if(!notes[index]) {
        return res.status(400).json({
            message: "Note not found"
        })
    }
    //if note is found, then update the description
    notes[index].description = description

    res.status(200).json({
        message : "Updated succesfully"
    })
})

module.exports = app;

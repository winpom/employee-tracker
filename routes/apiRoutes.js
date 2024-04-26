const router = require('express').Router();
const store = require('../db/store.js')

// GET request for reviews
router.get('/notes', (req, res) => {
    store.getNotes().then((notes) => {
        return res.status(200).json(notes)
    }).catch((error) => res.status(500).json(error))
    console.info(`${req.method} request received to get notes`);
});

// POST request for reviews
router.post('/notes', (req, res) => {
    store.addNotes(req.body).then((note) => {
        return res.status(200).json(note)
    }).catch((error) => res.status(500).json(error));
    console.info(`${req.method} request received to add a note`);
})

// DELETE request to delete a review
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    store.deleteNotes(noteId).then(() => {
        res.status(200).json({ deleted: true, id: noteId })
    }).catch((error) => res.status(500).json(error));
    console.info(`${req.method} request received to delete a note`);
})

module.exports = router;








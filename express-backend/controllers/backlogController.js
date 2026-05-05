"use strict";
const model = require('../models/backlogModel');

async function fetchAllBacklogEntries(req, res) {
    try {
        const backlogEntries = await model.getAllBacklogEntires(req.user.id);
        res.json(backlogEntries);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchBacklogEntryById(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const backlogEntry =
                await model.getOneBacklogEntryById(id);
            res.json(backlogEntry);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function createBacklogEntry(req, res) {
    const user_id = req.user.id;
    const {
        game_id, title, image_url, status, notes} = req.body;
    if (game_id && title && image_url && status) {
        try {
            const newBacklogEntry =
                await model.addBacklogEntry(user_id, game_id, title, image_url, status, notes);
            res.status(201).json(newBacklogEntry);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required backlog fields!");
    }
}

async function updateBacklogEntry(req, res) {
    const id = req.params.id;
    const {status, notes, is_pinned} = req.body;
    if (id) {
        try {
            const updatedBacklogEntry =
                await model.updateBacklogEntry(id, status, notes, is_pinned);
            res.json(updatedBacklogEntry);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function removeBacklogEntry(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const deletedCount =
                await model.deleteBacklogEntry(id);
            if (deletedCount > 0) {
                res.send(
                    `Backlog entry with id ${id} deleted successfully.`
                );
            } else {
                res.status(404).send("Backlog entry not found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

module.exports = {
    fetchAllBacklogEntries,
    fetchBacklogEntryById,
    createBacklogEntry,
    updateBacklogEntry,
    removeBacklogEntry
};
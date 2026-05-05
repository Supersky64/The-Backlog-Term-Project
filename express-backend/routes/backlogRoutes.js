"use strict";
const express = require("express");
const router = express.Router();
const backlogController = require('../controllers/backlogController');


function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: "Not authenticated" });
}


router.get("/", ensureAuth, backlogController.fetchAllBacklogEntries);
router.get("/:id", ensureAuth, backlogController.fetchBacklogEntryById);
router.post("/", ensureAuth, backlogController.createBacklogEntry);
router.put("/:id", ensureAuth, backlogController.updateBacklogEntry);
router.delete("/:id", ensureAuth, backlogController.removeBacklogEntry);
module.exports = router;
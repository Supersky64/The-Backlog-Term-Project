"use strict";
const express = require("express");
const router = express.Router();
const backlogController = require('../controllers/backlogController');

const cors = require('cors');

const corsOptions = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};

router.use(cors(corsOptions));

router.get("/", backlogController.fetchAllBacklogEntries);
router.get("/:id", backlogController.fetchBacklogEntryById);
router.post("/", backlogController.createBacklogEntry);
router.put("/:id", backlogController.updateBacklogEntry);
router.delete("/:id", backlogController.removeBacklogEntry);
module.exports = router;
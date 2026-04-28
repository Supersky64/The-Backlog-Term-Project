//server.js
"use strict";
const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

require('dotenv').config();

const session = require('express-session');
const passport = require('passport');
require('./auth/passport');
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


const cors = require('cors');
app.use(
    cors({
        origin: process.env.CLIENT_BASE_URL,
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
    })
);

const backlogRoutes = require('./routes/backlogRoutes');
const gamesRoutes = require('./routes/gamesRoutes');

app.use('/backlog', backlogRoutes);
app.use('/api/games', gamesRoutes);
app.use('/auth', require('./auth/authRoute'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("Server listening on port: " + PORT + "!");
});
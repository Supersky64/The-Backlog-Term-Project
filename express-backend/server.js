//server.js
"use strict";
const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: ture}));
app.use(express.json());
app.use(express.static("public"));

require('dotenv').config();

const session = require('express-sessions');
const passport = require('passport');
require('./auth/passport');
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
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

//TODO: add routes js from /routes here

app.use('/auth', require('./auth/authRoute'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("Server listening on port: " + PORT + "!");
});
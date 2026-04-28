"use strict";
const axios = require('axios');

async function searchGames(req, res) {
    const title = req.query.title;
    if (!title) {
        return res
            .status(400)
            .send("Missing game title");
    }
    try {
        const response = await axios.get(
            'https://api.thegamesdb.net/v1/Games/ByGameName',
            {
                params: {
                    apikey: process.env.THEGAMESDB_API_KEY,
                    name: title,
                    include: 'boxart'
                }
            }
        );

        res.json(response.data);

    } catch (err) {

        console.error(err);

        res.status(500).send("Server error");
    }
}

module.exports = {searchGames};
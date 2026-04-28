"use-strict";
const pool = require('./dbConnection');

async function getAllBacklogEntires(){
    const queryText = "SELECT * FROM backlog_entries ORDER BY created_at DESC";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getOneBacklogEntryById() {
    const queryText = "SELECT * FROM backlog_entries where id = $1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function addBacklogEntry(game_id, title, image_url, status, notes) {
    const queryText = `
    INSERT INTO backlog_entries ( game_id, title, image_url, status, notes)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `;

    const values = [game_id, title, image_url, status, notes];
    const results = await pool.query(queryText, values);
    return results.rows[0];
}

async function updateBacklogEntry(id, status, notes, is_pinned) {
    const queryText = `
    UPDATE backlog_entries SET status = $1, notes = $2, is_pinned =$3
    WHERE id = $4
    RETURNING *
    `;

    const values = [status, notes, is_pinned, id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function deleteBacklogEntry(id) {
    const queryText = "DELETE FROM backlog_entries WHERE id = $1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

module.exports = {
    getAllBacklogEntires,
    getOneBacklogEntryById,
    addBacklogEntry,
    updateBacklogEntry,
    deleteBacklogEntry
};
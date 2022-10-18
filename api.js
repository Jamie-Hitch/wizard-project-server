const express = require("express");
const cors = require("cors");
const db = require("./db");
const api = express();

// Add standard middleware
api.use(express.json());
api.use(cors());

// Api routes
// GET route for root of API
api.get("/", (req, res) => res.send("The Masquerade API: they walk among us."));

// POST route to add entity
api.post("/entities", async (req, res) => {
    const { entityName } = req.body
    await db.query("INSERT INTO entities (entity_name) VALUES ($1)", [entityName]);
    res.send(`${entityName} added to the entities database`);
})

// DELETE route for entity
api.delete("/entities/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await db.query("DELETE FROM entities WHERE entity_id = $1", [id]);
    res.send(`${id} deleted from the entities database`)
})

// GET route to return specific entity and related incidents
api.get("/entities/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await db.query("SELECT * FROM entities as E JOIN incidents as I ON E.entity_id = I.entity_id WHERE E.entity_id = $1", [id]);
    res.send(data.rows[0]);
})

// POST route to add location
api.post("/locations", async (req, res) => {
    const { locationName } = req.body
    await db.query("INSERT INTO locations (location_name) VALUES ($1)", [locationName]);
    res.send(`${locationName} added to the locations database`);
})

// DELETE route for location
api.delete("/locations/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await db.query("DELETE FROM locations WHERE location_id = $1", [id]);
    res.send(`${id} deleted from the locations database`)
})

// POST route to add incident
api.post("/incidents", async (req, res) => {
    const { entityId, locationId, description, severity, dateTime } = req.body
    await db.query("INSERT INTO incidents (entity_id, location_id, description, severity, date_time) VALUES ($1, $2, $3, $4, $5)", [entityId, locationId, description, severity, dateTime]);
    res.send(`New incident added to the incidents database`);
})

// DELETE route for location
api.delete("/incidents/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await db.query("DELETE FROM incidents WHERE incident_id = $1", [id]);
    res.send(`${id} deleted from the incidents database`)
})

module.exports = api;

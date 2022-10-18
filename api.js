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
    const id = req.params.id;
    await db.query("DELETE FROM entities WHERE entity_id = $1", [id]);
    res.send(`${id} deleted from the entities database`)
})

// POST route to add location
api.post("/locations", async (req, res) => {
    const { locationName } = req.body
    await db.query("INSERT INTO locations (location_name) VALUES ($1)", [locationName]);
    res.send(`${locationName} added to the locations database`);
})



// POST route to add incident
api.post("/incidents", async (req, res) => {
    const { entityId, locationId, description, severity, dateTime} = req.body
    await db.query("INSERT INTO incidents (entity_id, location_id, description, severity, date_time) VALUES ($1, $2, $3, $4, $5)", [entityId, locationId, description, severity, dateTime]);
    res.send(`New incident added to the incidents database`);
})





module.exports = api;

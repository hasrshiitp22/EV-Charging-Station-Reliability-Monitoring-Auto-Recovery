
import { incidents } from "../data/store.js";
import db from "../database/db.js";

const insertIncident = db.prepare(`
    INSERT INTO incidents (
        stationId,
        faultAt,
        recoveredAt,
        recoverySeconds,
        resetAttempts,
        result
    )
    VALUES (?, ?, ?, ?, ?, ?)
`);

// SQL command to update an existing incident.
const updateIncident = db.prepare(`
    UPDATE incidents
    SET recoveredAt = ?,
        recoverySeconds = ?,
        resetAttempts = ?,
        result = ?
    WHERE id = ?
`);

// Load previously saved incidents when the server starts.
const savedIncidents = db.prepare(`
    SELECT * FROM incidents ORDER BY id DESC
`).all();

incidents.splice(0, incidents.length, ...savedIncidents);

export function createIncident(station) {
    const faultAt = new Date(station.faultAt).toISOString();

    const result = insertIncident.run(
        station.id,
        faultAt,
        null,
        null,
        0,
        "PENDING"
    );

    const incident = {
        id: Number(result.lastInsertRowid),
        stationId: station.id,
        faultAt,
        recoveredAt: null,
        recoverySeconds: null,
        resetAttempts: 0,
        result: "PENDING"
    };

    incidents.unshift(incident);

    return incident;
}

export function findPendingIncident(stationId) {
    return incidents.find(
        (incident) =>
            incident.stationId === stationId &&
            incident.result === "PENDING"
    );
}

export function saveIncident(incident) {
    updateIncident.run(
        incident.recoveredAt,
        incident.recoverySeconds,
        incident.resetAttempts,
        incident.result,
        incident.id
    );
}

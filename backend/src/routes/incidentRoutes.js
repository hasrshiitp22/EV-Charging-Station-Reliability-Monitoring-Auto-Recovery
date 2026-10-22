
import express from "express"
const router = express.Router();

import  { stations, incidents, STATUSES } from "../data/store.js"

// GET /api/incidents
router.get("/", (req, res) => {
  res.json([...incidents].reverse());
});

// GET /api/stats
router.get("/status", (req, res) => {
  const counts = Object.fromEntries(
    STATUSES.map((status) => [status, 0])
  );

for (const station of stations) {
  if (counts[station.status] !== undefined) {
    counts[station.status]++;
  } else {
    console.warn(`Unknown station status: ${station.status}`);
  }
}
  const recoveredIncidents = incidents.filter(
    (incident) =>
      incident.result === "RECOVERED" &&
      incident.recoverySeconds !== null
  );

  const totalRecoveryTime = recoveredIncidents.reduce(
    (total, incident) => total + incident.recoverySeconds,
    0
  );

  const averageRecoverySeconds =
    recoveredIncidents.length > 0
      ? totalRecoveryTime / recoveredIncidents.length
      : null;

  res.json({
    totalStations: stations.length,
    statusCounts: counts,
    totalIncidents: incidents.length,
    recoveredIncidents: recoveredIncidents.length,
    pendingIncidents: incidents.filter(
      (incident) => incident.result === "PENDING"
    ).length,
    averageRecoverySeconds,
  });
});

export default  router;

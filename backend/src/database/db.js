
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Create the backend/data folder if it does not exist.
const dataDirectory = path.resolve(dirname, "../../data");
fs.mkdirSync(dataDirectory, { recursive: true });

// Create or open the database file.
const databasePath = path.join(
    dataDirectory,
    "ev_charging.db"
);

const db = new Database(databasePath);

// Create the incidents table if it does not exist.
db.exec(`
    CREATE TABLE IF NOT EXISTS incidents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stationId TEXT NOT NULL,
        faultAt TEXT NOT NULL,
        recoveredAt TEXT,
        recoverySeconds REAL,
        resetAttempts INTEGER NOT NULL DEFAULT 0,
        result TEXT NOT NULL DEFAULT 'PENDING'
    );
`);

console.log("SQLite database connected");

export default db;

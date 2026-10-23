import express from "express";

import { startStationSimulator } from "./services/stationSimulator.js";
import { startRecoveryWorker } from "./services/recoveryWorker.js";
import app from "./app.js";



app.listen(5000, "0.0.0.0",()=>{
    console.log(`http://localhost:5000`)
    startStationSimulator();
    startRecoveryWorker();
})

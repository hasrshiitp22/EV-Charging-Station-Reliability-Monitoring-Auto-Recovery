import { stations } from "../data/store.js"
import { createIncident } from "./incidentServices.js"

function simulateStations() {


    for (const station of stations) {
        if (station.status !== "AVAILABLE" && station.status !== "CHARGING") {
            continue;
        }
        const random = Math.random();
        if (random < 0.02) {
            station.status = "FAULT",
                station.faultAt = Date.now(),
                station.resetAttempts = 0;
            createIncident(station);
            console.log(`${station.id} developed a fault`);
        }
        else if (station.status == "AVAILABLE" && random < 0.06) {
            station.status = "CHARGING";
            console.log(`${station.id} is now CHARGING`);
        } else if (station.status=="CHARGING" && random<0.03) {
                    station.status = "AVAILABLE";
                 console.log(`${station.id} is now AVAILABLE`);
        }
    }
}
export function startStationSimulator(){
    console.log('station simulator started');
    setInterval(simulateStations,5000);  
}
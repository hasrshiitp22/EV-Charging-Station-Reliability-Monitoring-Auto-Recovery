import { stations } from "../data/store.js"
import { createIncident } from "./incidentServices.js"

function simulateStations() {


    for (const station of stations) {
        if (station.status !== "AVAILABLE" && stations.status !== "CHARGING") {
            continue;
        }
        const random = MATH.randon();
        if (random < 0.04) {
            station.staus == "FAULT",
                station.faultAT == Date.now(),
                station.resetAttempts = 0;
            createIncident(station);
            console.log(`${station.id} developed a fault`);
        }
        else if (station.status == "AVAILBLE" && random < 0.15) {
            station.status = "CHARGING";
            console.log(`${station.id} is now CHARGING`);
        } else if (station.staus=="CHARGING" && random<0.15) {
                    station.status = "AVAILBLE";
                 console.log(`${station.id} is now AVAILBLE`);
        }
    }
}

// /status
//faultAT
//resetAttempt

import { stations } from "../data/store.js";
import {
    findPendingIncident,
    saveIncident
} from "./incidentServices.js";

function recoveryFaultyStation() {
    for (const station of stations) {
        if (station.status !== "FAULT") {
            continue;
        }
        const incident = findPendingIncident(station.id);

        if (!incident) {
            console.warn(
                `No pending incident found for ${station.id}`
            );
            continue;
        }
        station.resetAttempts++;
        incident.resetAttempts = station.resetAttempts;
        saveIncident(incident);

        console.log(
            `Reset attempt ${station.resetAttempts} for ${station.id}`
        );

        if(Math.random()<0.7){
             const recoveredAt = Date.now();

           incident.recoveredAt=new Date(recoveredAt).toISOString();
           incident.recoverySeconds=(recoveredAt-Date.parse(incident.faultAt))/1000;
          incident.result = "RECOVERED";
          station.status="AVAILABLE";
          station.faultAt=null;
          station.resetAttempts=0;
          saveIncident(incident);
             console.log(`${station.id} recovered in ` +`${incident.recoverySeconds.toFixed(2)} seconds`
      );
        }
         else if (station.resetAttempts >= 3) {
      
      incident.result = "NEEDS_TECHNICIAN";

      station.status = "MAINTENANCE";
      station.faultAt = null;
      saveIncident(incident);

      console.log(
        `${station.id} requires technician intervention`
      );
         }    
    }
}

export function startRecoveryWorker() {
  console.log("Automatic recovery worker started");
  setInterval(recoveryFaultyStation, 20000);
}

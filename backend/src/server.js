import  express from "express"
import stationRoutes from "./routes/stationRoute.js";
import incidentsRoutes  from "./routes/incidentRoutes.js"
import { incidents } from "./data/store.js";
import cors from "cors"
import { startStationSimulator } from "./services/stationSimulator.js";
import { startRecoveryWorker } from "./services/recoveryWorker.js";
const app=express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/api/stations",stationRoutes);
app.use("/api/incidents",incidentsRoutes);
app.get("/",(req,res)=>{
    res.send('hello');
    
})



app.listen(5000,()=>{
    console.log(`http://localhost:5000`)
    startStationSimulator();
    startRecoveryWorker();
})

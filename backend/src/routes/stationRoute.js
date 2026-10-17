const express =require("express")
const Router = express.Router();

const {stations,incidents} =require("../data/store");

Router.get("/",(req,res)=>{
  res.json(stations);
})
Router.get("/:id",(req,res)=>{
    let station=null;
  for(let i=0;i<stations.length;i++){
     if(stations[i].id===req.params.id){
       let station=stations[i];
     }
  }
  if(!station){
    return res.status(404).json({
        message:"stations not found",
    })
  }
  res.json(station);
});





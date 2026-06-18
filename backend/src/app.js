import express from "express"
import cors from "cors"
import reservationRoutes from "./routes/reservationRoutes.js"


import authroutes from "./routes/authroutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app=express();

app.use(cors());

app.use(express.json());

app.use("/api/auth",authroutes)
app.use("/api/events",eventRoutes)
app.use("/api/reserve",reservationRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/users",userRoutes)
app.get('/',(req,res)=>{
    res.json({
        sucess:true,
        message:"Event booking API running",
    })
})

export default app;
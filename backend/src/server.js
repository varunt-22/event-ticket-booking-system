import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import startReservationCleanup from "./jobs/reservationCleanup.js";

dotenv.config();

const PORT=process.env.PORT || 5000;

connectDB();

startReservationCleanup();

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});




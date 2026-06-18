import dotenv from "dotenv"
import mongoose from "mongoose"

import connectDB from "../config/db.js"

import Event from "../models/Event.js"
import Seat from "../models/Seat.js"

dotenv.config();

const seedData=async()=>{
    try {
        await connectDB();

        await Event.deleteMany();
        await Seat.deleteMany();

        const events=[
            {
                name:"Coldplay Live Mumbai",
                venue:"DY Patil Stadium",
                dateTime:new Date("2026-08-15"),
                totalSeats:20,
            },
            {
                name:"Vishal Mishra Concert",
                venue:"Jio World Garden",
                dateTime:new Date("2026-09-01"),
                totalSeats:20,
            },
            {
                name:"Tech Conference Bangalore",
                venue:"Whitefield Convention Center",
                dateTime:new Date("2026-10-10"),
                totalSeats:20,
            }

        ];

        for(const eventData of events)
        {
            const event=await Event.create(eventData);

            const seats=[];

            for(let i=1;i<=event.totalSeats;i++)
            {
                seats.push({
                    eventId:event._id,
                    seatNumber:`A${i}`,
                    status:"available",
                });
            }
            await Seat.insertMany(seats);
        }
        console.log("Seed data added Sucessfully");

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
seedData();
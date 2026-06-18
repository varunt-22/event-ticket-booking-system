import mongoose, { Mongoose } from "mongoose";

const bookingSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        eventId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Event",
            required:true,
        },

        seatNumbers:[
            {
                type:String,
            }
        ],

        bookedAt:{
            type:Date,
            default:Date.now,
        },
    },

    {
        timestamps:true,
    }
);

const Booking=mongoose.model("Booking",bookingSchema);

export default Booking;
import Event from "../models/Event.js";
import Seat from "../models/Seat.js"

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    const eventsWithStats = await Promise.all(
      events.map(async (event) => {
        const seats = await Seat.find({
          eventId: event._id,
        });

        const availableSeats = seats.filter(
          (seat) => seat.status === "available"
        ).length;

        const reservedSeats = seats.filter(
          (seat) => seat.status === "reserved"
        ).length;

        const bookedSeats = seats.filter(
          (seat) => seat.status === "booked"
        ).length;

        return {
          ...event.toObject(),
          availableSeats,
          reservedSeats,
          bookedSeats,
        };
      })
    );

    res.status(200).json({
      success: true,
      events: eventsWithStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleEvent=async(req,res)=>{
    try {
        
        const {id}=req.params;

        const event=await Event.findById(id);

        if(!event)
        {
            return res.json(404).json({
                sucess:false,
                message:"Event not found",
            })
        }

        const seats=await Seat.find({
            eventId:event._id,

        });

        res.status(200).json({
            sucess:true,
            event,
            seats,
        })
    }
     catch (error) {
        res.status(500).json({
            sucess:false,
            message:error.message,
        })
    }
}
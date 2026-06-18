import express from "express"

import{
    getAllEvents,
    getSingleEvent,
} from "../controllers/eventController.js"

const router=express.Router();

router.get("/",getAllEvents);

router.get("/:id",getSingleEvent);

export default router;
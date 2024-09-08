import Router from "express";
import { getEvent, getEventbyId, createEvent, updateEvent, deleteEvent } from "../handler/events";

const eventRouter = Router();

eventRouter.get("/", getEvent);
eventRouter.get("/:id", getEventbyId);
eventRouter.post("/", createEvent);
eventRouter.put("/:id", updateEvent);
eventRouter.delete("/:id", deleteEvent);

export default eventRouter;

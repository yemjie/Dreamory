import { Request, Response } from "express";
import Event from "../../model/event";
import mongoose from "mongoose";

// read all event
export async function getEvent(request: Request, response: Response) {

  var filter: any = {}

  const user = request.query.user
  // const name = request.query.name
  // const status = request.query.user

  if (user) { filter.createdby = user }
  // if (name) { filter.name = name }
  // if (status) { filter.status = status }

  try {
    var event = await Event.find(filter);
    response.status(200).json({ status: "success", data: event });
  }

  catch (error) {

    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).json({ status: "failed", data: error.message });
    }

  }
}

// read specific id
export async function getEventbyId(request: Request, response: Response) {

  const eventId = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return response.status(400).json({ status: "failed", data: 'Invalid id' });
  }

  try {
    var event = await Event.findById(eventId);
    response.status(200).json({ status: "success", data: event });
  }

  catch (error) {

    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).json({ status: "failed", data: error.message });
    }

  }
}

// create
export async function createEvent(request: Request, response: Response) {

  console.log(request.body)
  var newEvent = new Event(request.body.values);
  newEvent.status = "Ongoing"

  

  try {
    await newEvent.save();
    response.status(200).json({ status: "success", data: newEvent });
  }

  catch (error) {

    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).json({ status: "failed", data: error.message });
    }

  }

}

// update
export async function updateEvent(request: Request, response: Response) {

  console.log(request.body)
  console.log(request.params)

  const eventId = request.params.id;
  var value = request.body.values

  if(value.image == ""){delete value.image;}

  try {
    await Event.findByIdAndUpdate(eventId, request.body.values);
    response.status(200).json({ status: "success", data: 'Event Updated' });
  }

  catch (error) {

    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).json({ status: "failed", data: error.message });
    }

  }
}

// delete
export async function deleteEvent(request: Request, response: Response) {

  const eventId = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return response.status(400).json({ status: "failed", data: 'Invalid id' });
  }

  try {
    await Event.findByIdAndDelete(eventId);
    response.status(200).json({ status: "success", data: "Event Deleted" });
  }

  catch (error) {

    if (error instanceof Error) {
      console.log(error.message);
      response.status(500).json({ status: "failed", data: error.message });
    }

  }

}

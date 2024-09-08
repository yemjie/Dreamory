import { Schema, model, Document } from "mongoose";

// Define the interface that extends the Mongoose Document interface
interface IEvent extends Document {
  name: string;
  // startdate: Date;
  // enddate: Date;
  createdby: string;
  status: string;
  image:string;
  // description: string
}

// Define the schema
const EventSchema = new Schema<IEvent>(
  {
    name: { type: String, required: true },
    // startdate: { type: Date, required: true },
    // enddate: { type: Date, required: true },
    createdby: { type: String, required: true },
    status: { type: String, required: true },
    image: { type: String },
    // description: { type: String },
  },
  { timestamps: true }
);

// Create the model
const Event = model<IEvent>("Events", EventSchema);

export default Event;

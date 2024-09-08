import { Schema, model, Document } from "mongoose";

// Define the interface that extends the Mongoose Document interface
export interface IUser extends Document {
  email: string;
  password: string
}

// Define the schema
const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Create the model
const User = model<IUser>("Users", UserSchema);

export default User;

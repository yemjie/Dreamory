import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import eventRouter from "./routes/events";
import connectDb from "../config/db";
import userRouter from "./routes/users";
import cors from 'cors';

dotenv.config();

const APP = express();
const PORT = 3000;
APP.options('*', cors());

APP.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

APP.use(bodyParser.json());
APP.use("/api/events",eventRouter);
APP.use("/api/user",userRouter);


APP.listen(PORT, () => {
  connectDb().then(()=>console.log("Listening on port 3000"))
});

export default APP

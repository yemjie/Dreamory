"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const events_1 = __importDefault(require("./routes/events"));
const APP = (0, express_1.default)();
const PORT = 3000;
APP.use("/api/events", events_1.default);
APP.get("/", (request, response) => {
    console.log("Hello");
});
APP.listen(PORT, () => {
    console.log("listening to port 3000");
});

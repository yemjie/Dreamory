"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const events_1 = require("../handler/events");
const router = (0, express_1.default)();
router.get("/", events_1.getEvent);
router.get("/:id", events_1.getEventbyId);
router.post("/", events_1.createEvent);
router.post("/:id", events_1.updateEvent);
exports.default = router;

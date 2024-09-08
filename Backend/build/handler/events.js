"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvent = getEvent;
exports.getEventbyId = getEventbyId;
exports.createEvent = createEvent;
exports.updateEvent = updateEvent;
function getEvent(request, response) {
    response.send([
        { name: "Merdeka", date: "1/1/1111" },
        { name: "Merdeka", date: "1/1/1111" },
        { name: "Merdeka", date: "1/1/1111" },
    ]);
}
function getEventbyId(request, response) {
    response.send({ name: "Merdeka", date: "1/1/1111" });
}
function createEvent(request, response) {
    response.send('Create Event');
}
function updateEvent(request, response) {
    response.send('Update Event');
}

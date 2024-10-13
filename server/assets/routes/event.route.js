import { Router } from "express";
import eventsHandler from "../controllers/event.controller.js";

const routes = Router();

routes.route('/')
    .post(eventsHandler.createEvent)

routes.route('/all')
    .get(eventsHandler.getPaginatedEvents);

routes.route('/:id')
    .get(eventsHandler.getEventById)

export default routes;
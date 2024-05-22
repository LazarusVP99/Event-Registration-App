import { Router } from "express";
import eventsHandler from "../controllers/event.service.js";

const routes = Router();

routes.route('/')
    .post(eventsHandler.createEvent)

routes.route('/all')
    .post(eventsHandler.getPaginatedEvents);

routes.route('/:id')
    .get(eventsHandler.getEventById)

export default routes;
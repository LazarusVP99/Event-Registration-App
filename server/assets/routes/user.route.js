import { Router } from "express";
import userRegistrationHandler from "../controllers/user.service.js";

const routes = Router();

routes.route('/register').post(userRegistrationHandler.eventRegistration);
routes.route('/members/:id').get(userRegistrationHandler.getRegisteredEventMembers);

export default routes;
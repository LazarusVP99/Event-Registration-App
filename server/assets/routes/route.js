import { Router } from "express";
import eventRoutes from './event.route.js';
import usersRoutes from './user.route.js';

const router = Router();


const routesIndex = [
  {
    path: '/events',
    router: eventRoutes,
  },
  {
    path: '/users',
    router: usersRoutes,
  },
];

routesIndex.forEach((routes) => {
  router.use(routes.path, routes.router);
});


export default router;
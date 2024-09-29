import { maestro } from 'maestro-express-async-errors';

import Event from '../models/event.model.js';

const eventsHandler = {
    getPaginatedEvents: maestro(async (req, res) => {
        const {
            page = 1, limit = 5, order = 'asc', sort = 'createdAt',
        } = req.body;

        const sortOrder = order === 'asc' ? 1 : -1;
        const options = {
            page,
            limit,
            sort: { [sort]: sortOrder },
            customLabels: {
                totalDocs: 'totalEvents',
                docs: 'events',
            },
        };

        const result = await Event.aggregatePaginate([
            { $sort: { [sort]: sortOrder } }
        ], options);

        res.status(201).json(result);
    }),
    getEventById: maestro(async (req, res) => {
        const { id } = req.params;
        const event = await Event.findById(id)

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(event)
    }),
    createEvent: maestro(async (req, res) => {
        const {
            title, description, startTime, endTime, organizer
        } = req.body;
        const event = new Event({
            title, description, startTime, endTime, organizer
        });

        await event.save();

        res.status(201).json(event);
    }),
};

export default eventsHandler;

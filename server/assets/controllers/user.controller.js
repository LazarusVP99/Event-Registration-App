import { maestro } from 'maestro-express-async-errors';

import User from '../models/user.model.js';
const userRegistrationHandler = {
    getRegisteredEventMembers: maestro(async (req, res) => {
        const eventId = req.params.id;
        const users = await User.find({
            eventsParticipant: { $in: [eventId] }
        }).populate('eventsParticipant', '_id title').exec()

        res.status(200).json(users);
    }),
    eventRegistration: maestro(async (req, res) => {
        const { email, eventId, registrations } = req.body;

        if (!eventId) {
            res.status(400).json({ message: "Event ID is required" });
        }

        if (!registrations || typeof registrations !== 'object') {
            res.status(400).json({ error: 'Invalid input data' });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ email, registrations, ...req.body });
            user.eventsParticipant.push(eventId);
        } else {
            Object.entries(registrations).forEach(([eventId, eventRegistrations]) => {
                if (!user.registrations.has(eventId)) user.registrations.set(eventId, new Map());

                Object.entries(eventRegistrations).forEach(([timestamp, names]) => {
                    const existingNames = user.registrations.get(eventId).get(timestamp) || [];
                    user.registrations.get(eventId).set(timestamp, [...new Set([...existingNames, ...names])]);
                });

                return !user.eventsParticipant.includes(eventId)
                    ? user.eventsParticipant.push(eventId)
                    : res.status(400).json({ error: 'User already registered for this event' });
            });
        }

        const savedUser = await user.save();
        const populatedUser = await User.findById(savedUser._id)
            .populate(['eventsParticipant']).exec();

        res.status(201).json(populatedUser);
    }),
}

export default userRegistrationHandler;
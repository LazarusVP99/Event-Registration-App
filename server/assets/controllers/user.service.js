import { maestro } from 'maestro-express-async-errors';

import User from '../models/user.model.js';
const userRegistrationHandler = {
    getRegisteredEventMembers: maestro(async (req, res) => {
        const eventId = req.params.id;
        try {
            const users = await User.find({
                eventsParticipant: { $in: [eventId] }
            }).populate('eventsParticipant', '_id title').exec()

            res.status(200).json(users);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }),
    eventRegistration: maestro(async (req, res) => {
        const { email, eventId } = req.body;
        try {
            if (!eventId) {
                res.status(400).json({ message: "Event ID is required" });
            }

            let user = await User.findOne({ email });

            if (!user) {
                user = new User({ email, ...req.body });
                user.eventsParticipant.push(eventId);
            } else {
                // If the user has already registered for the event
                if (!user.eventsParticipant.some((id) => id.equals(eventId))) {
                    user.eventsParticipant.push(eventId);
                } else {
                    res.status(400).json({ message: "Already registered" });
                }
            }

            const savedUser = await user.save();
            const populatedUser = await User.findById(savedUser._id)
                .populate(['eventsParticipant']).exec();

            res.status(201).json(populatedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }),
}

export default userRegistrationHandler;
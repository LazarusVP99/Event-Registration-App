import { Schema, model } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const eventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Event title is required'],
        unique: true,
        trim: true,
        validate: {
            validator: (value) => value.length >= 3,
            message: 'Event title must be at least 3 characters'
        }
    },
    description: {
        type: String,
        unique: true,
        trim: true,
        validate: {
            validator: (value) => value.length >= 10,
            message: 'Event description must be at least 10 characters'
        }
    },
    startTime: {
        type: Date,
        required: [true, 'Start of event date is required'],
        default: Date.now,
        validate: {
            validator: (value) => value > new Date(),
            message: 'Event date must be in the future'
        }
    },
    endTime: {
        type: Date,
        required: [true, 'End of event date is required'],
        default: Date.now,
        validate: {
            validator: (value) => value > new Date(),
            message: 'Event date must be in the future'
        }
    },
    organizer: {
        type: String,
        default: 'John Doe',
    },
    registrations: [
        {
            registerDate: { type: Date, required: true },
            numberOfRegistered: { type: Number, default: 0, required: true },
        },
    ],
})

eventSchema.plugin(aggregatePaginate);

eventSchema.set('toJSON', {
    transform: (_document, returnedObj) => {
        returnedObj.id = String(returnedObj._id);
        delete returnedObj.id;
    },
    versionKey: false,
});

export default model('Event', eventSchema);
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cron from 'node-cron';
import { fetchAndStoreEvents } from './fetch.events.js';

dotenv.config();

async function startEventFetcher () {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_CREDENTIALS}&appName=data-0`)
        .then(() => console.log('Successfully connected to MongoDB'))
        .catch(err => console.error('Connection error', err));

    await fetchAndStoreEvents();

    cron.schedule('0 0 */2 * *', async () => {
        console.log('Fetching and storing events...');
        await fetchAndStoreEvents()
    });
}
startEventFetcher();
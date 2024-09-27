import fetchUrls from './api.urls.js';
import Event from './models/event.model.js';

export const fetchAndStoreEvents = async () => {
    try {
        for (const fetchConfig of fetchUrls) {
            const response = await axios.get(
                fetchConfig.url,
                { params: fetchConfig.params }
            );
            const events = response.data.events

            for (const event of events) {
                await Event.findOneAndUpdate(
                    { title: event.name },
                    {
                        title: event.name,
                        description: event.summary,
                        startTime: event.start_date,
                        endTime: event.end_date,
                        organizer: event.tickets_by
                    },
                    { upsert: true, new: true }
                );
            }
        }
        console.log('Events updated successfully');
    } catch (error) {
        console.error('Error fetching or storing events:', error);
    }
}

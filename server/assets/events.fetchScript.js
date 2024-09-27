// import axios from 'axios';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cron from 'node-cron';
// import Event from './models/event.model.js';

// dotenv.config();


// const fetchUrls = [
//     'https://www.eventbrite.com/api/v3/destination/events/?event_ids=918800165027,927753594977,920310703087,881980135327,63049080497,984065194487,956317339907,165655358637&expand=event_sales_status,image,primary_venue,saves,ticket_availability,primary_organizer,public_collections&page_size=50&include_parent_events=true',
//     'https://www.eventbrite.com/api/v3/destination/events/?event_ids=1014286025807,1014286005747,1001702778977,947244121667,1014285845267,970947679647,1015212376547&page_size=7&expand=event_sales_status,image,primary_venue,saves,ticket_availability,primary_organizer,public_collections',
//     'https://www.eventbrite.com/api/v3/destination/events/?event_ids=930080544947,782231233677,934955064767,799052546677,929600579357,892122912647,762987144087,950160875757&expand=event_sales_status,image,primary_venue,saves,ticket_availability,primary_organizer,public_collections&page_size=50&include_parent_events=true',
//     'https://www.eventbrite.com/api/v3/destination/events/?event_ids=920293541757,926379204137,944711917777,925453726007,998177023347,938992932137,946484409347,933525759677,974393987647,927515091607,923152643407,981848955657,986167061227,1015622884387,771452815137,928728771757,865453864807,1000919686727,938590608777,974385682807&page_size=20&expand=event_sales_status,image,primary_venue,saves,ticket_availability,primary_organizer,public_collections'
// ]

// const fetchAndStoreEvents = async () => {
//     try {
//         for (const url of fetchUrls) {
//             const response = await axios.get(url);
//             const events = response.data.events

//             for (const event of events) {
//                 await Event.findOneAndUpdate(
//                     { title: event.name },
//                     {
//                         title: event.name,
//                         description: event.summary,
//                         startTime: event.start_date,
//                         endTime: event.end_date,
//                         organizer: event.tickets_by
//                     },
//                     { upsert: true, new: true }
//                 );
//             }
//         }
//         console.log('Events updated successfully');
//     } catch (error) {
//         console.error('Error fetching or storing events:', error);
//     }
// }

// async function startEventFetcher () {
//     await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_CREDENTIALS}&appName=data-0`);
//     console.log(`Connecting to MongoDB...`);

//     await fetchAndStoreEvents();

//     cron.schedule('0 0 */2 * *', async () => {
//         console.log('Fetching and storing events...');
//         await fetchAndStoreEvents()
//     });
// }

// startEventFetcher();
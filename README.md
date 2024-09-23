# Event Registration App for ELIFTECH IT School Examination

## Instructions to run the application:

cd server
```
npm run dev
```

## Script to run server only
cd server
npm run run:server

## Script to run client only
cd client
npm run run:client

## Running the Event Fetching Script to fetch events from the API:

cd server
```
npm run fetch-events
```

## Accomplished Tasks:

### Base Level:
- [x] Implemented events board page with paginated list of available events
- [x] Created event registration page with form (full name, email, date of birth, source)
- [x] Developed event participants page

### Middle Level:
- [x] Added sorting functionality for events (title, event date, organizer)
- [x] Implemented form validation on event registration page
- [x] Added DatePicker to Date of birth input
- [x] Implemented search functionality for participants by full name and email

### Advanced Level:
- [x] Implemented infinite scroll pagination for events board at event_cards folder
- [x] Added line/bar chart for registrations per day on event participants page
- [x] Developed server side script to fetch and store events from third-party API at defined intervals

### Extra Features
- [x] Implemented a loading spinner for enhanced user experience during data fetching
- [x] Integrated toast notifications for real-time feedback on user actions
- [x] Added an event countdown timer on the event participants page
- [x] Incorporated subtle animations and smooth transitions for improved visual appeal

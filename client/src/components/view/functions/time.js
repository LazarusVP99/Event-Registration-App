export const formatDate = date => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

export const pastFiveDaysTimestamps = day => new Date(new Date().setDate(new Date().getDate() - day)).setHours(0, 0, 0, 0)

export const filterRegistrationsWithinDateRange = (usersTimestamp, nextDay, pastDay) =>
    usersTimestamp.filter((timestamp) => timestamp <= pastFiveDaysTimestamps(nextDay) && timestamp >= pastFiveDaysTimestamps(pastDay));


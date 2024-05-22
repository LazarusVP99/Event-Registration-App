import { filterRegistrationsWithinDay, pastTimestamp, startOfDay, yesterday } from "./time";

export const amountOfUsersRegisteredToday = ({ usersEventTimestampObject, usersTimestamp, id }) => {
    const usersToday = usersTimestamp.length > 0 && filterRegistrationsWithinDay(usersTimestamp);

    return Array.isArray(usersToday)
        ? usersToday.reduce((acc, curr) => acc + usersEventTimestampObject[id][curr].length, 0)
        : 0;
};

export const amountOfUsersRegisteredYesterday = ({ usersEventTimestampObject, usersTimestamp, id }) => {
    const usersYesterday = pastTimestamp(usersTimestamp);

    return Array.isArray(usersYesterday)
        ? usersYesterday.reduce((acc, curr) => acc + usersEventTimestampObject[id][curr].length, 0)
        : 0;
};


export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            maintainAspectRatio: false,
        },
        title: {
            display: true,
            text: 'Users Registered For Event In Last Days',
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    tooltipFormat: 'DD T'
                },
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'value'
                }
            }
        },
    }
};

export const chartData = (usersEventTimestampObject, usersTimestamp, id) => ({
    labels: [yesterday.toLocaleDateString(), new Date(startOfDay).toLocaleDateString()],
    datasets: [
        {
            label: 'Users Registered',
            data: [
                amountOfUsersRegisteredYesterday({ usersEventTimestampObject, usersTimestamp, id }),
                amountOfUsersRegisteredToday({ usersEventTimestampObject, usersTimestamp, id })
            ],
            borderColor: 'lightgreen',
            backgroundColor: 'green',
        },
    ],
});
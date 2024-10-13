import { filterRegistrationsWithinDateRange, formatDate, pastFiveDaysTimestamps } from "./time";

const amountOfUsersRegisteredPerDay = ({
    usersEventTimestampObject, usersTimestamp,
}, nextDay, pastDay) => {
    const usersRegisteredArray = filterRegistrationsWithinDateRange(usersTimestamp || [], nextDay, pastDay)

    return Array.isArray(usersRegisteredArray)
        ? usersRegisteredArray.reduce((acc, curr) => acc + [usersEventTimestampObject[curr]]?.length, 0)
        : 0;
};

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                    size: 14
                }
            }
        },
        title: {
            display: true,
            text: 'Users Applied For Event In Last 5 Days',
            font: {
                size: 18,
                weight: 'bold'
            },
            padding: {
                top: 10,
                bottom: 30
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: {
                size: 14
            },
            bodyFont: {
                size: 12
            },
            padding: 10,
            cornerRadius: 4
        }
    },
    scales: {
        x: {
            type: 'category',
            title: {
                display: true,
                text: 'Date',
                font: {
                    size: 14,
                    weight: 'bold'
                }
            },
            grid: {
                display: false
            }
        },
        y: {
            title: {
                display: true,
                text: 'Number of Registrations',
                font: {
                    size: 14,
                    weight: 'bold'
                }
            },
            beginAtZero: true,
            ticks: {
                precision: 0
            }
        }
    },
    animation: {
        duration: 1000,
        easing: 'easeOutQuart',
    }
};



export const chartData = (usersTimestampChartData, usersTimestamp) => {

    const dateOfRegistrationLabels = Array.from({ length: 6 }, (_, i) => formatDate(pastFiveDaysTimestamps(5 - i)));

    const amountOfRegisteredUsersPerDay = Array.from({ length: 6 }, (_, i) => {
        const result = usersTimestampChartData?.map((usersEventTimestampObject) =>
            amountOfUsersRegisteredPerDay({ usersEventTimestampObject, usersTimestamp }, 4 - i, 5 - i)
        );
        return result && result.length > 0 ? result[0] : 0;
    });

    return {
        labels: dateOfRegistrationLabels,
        datasets: [
            {
                label: 'Users Registered',
                data: amountOfRegisteredUsersPerDay,
                options: {
                    responsive: true,
                },
                borderColor: 'lightgreen',
                backgroundColor: 'green',
            },
        ],
    }
}
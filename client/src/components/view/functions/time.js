
const date = new Date();
const clonedDate = new Date(date.getTime());

export const startOfDay =new Date(new Date().setHours(0, 0, 0, 0)).getTime();
export const yesterday = new Date(clonedDate.setFullYear(clonedDate.getFullYear(), clonedDate.getMonth(), clonedDate.getDate() - 1));
const endOfDay = new Date(new Date().setHours(23, 59, 59, 999)).getTime();

export const pastTimestamp = (usersTimestamp) => usersTimestamp.filter((timestamp) => timestamp <= startOfDay);
export const filterRegistrationsWithinDay = (usersTimestamp) => usersTimestamp.filter(
    (timestamp) => timestamp >= startOfDay && timestamp <= endOfDay
);
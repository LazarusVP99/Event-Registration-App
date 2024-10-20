import { setSortEvents } from "../../../store/features/sortEvents";

export const handleSort = ({ target, dispatch, sortValue }) =>
    dispatch(
        setSortEvents({
            sort: target.value,
            order: sortValue.order || 'asc',
        })
    );

export const handleOrder = ({ target, dispatch, sortValue }) =>
    dispatch(
        setSortEvents({
            sort: sortValue.sort || 'title',
            order: target.value,
        })
    );

export const sortOrderData = {
    sortData: [
        { value: 'title', label: 'Title' },
        { value: 'startTime', label: 'Date' },
        { value: 'organizer', label: 'Organizer' },
    ],
    orderData: [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
    ],
}
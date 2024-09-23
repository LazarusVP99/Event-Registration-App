import { setSortEvents } from "../../../store/features/sortEvents";
import showSwal from "../../utils/alerts/message";

export const handleSort = ({ target, dispatch, sortValue }) =>
    dispatch(
        setSortEvents({
            sort: target.value,
            order: sortValue.order || '',
        })
    );

export const handleOrder = ({ target, dispatch, sortValue }) =>
    dispatch(
        setSortEvents({
            sort: sortValue.sort || '',
            order: target.value,
        })
    );

export const applySort = async ({
    currentPage,
    sortValue,
    setEvents,
    getPaginatedEvents,
}) => {
    const { page, limit } = currentPage;
    const { sort, order } = sortValue;

    if (!sort && !order) return;

    if (sort && !order) {
        showSwal({
            title: 'Information',
            text: 'Please select an order option',
            icon: 'info',
        });
        return;
    }

    if (!sort && order) {
        showSwal({
            title: 'Information',
            text: 'Please select a sort option',
            icon: 'info',
        });
        return;
    }

    try {
        const sortResponse = await getPaginatedEvents({
            page,
            limit,
            sort,
            order
        }).unwrap();

        if (sortResponse.events.length > 0) {
            setEvents(sortResponse.events);
        }
    } catch (error) {
        showSwal({
            title: 'Error',
            text: error.message,
            icon: 'error',
        });
    }
};

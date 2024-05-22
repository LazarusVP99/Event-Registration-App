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
    try {
        if (sortValue.sort && sortValue.order) {
            const sortResponse = await getPaginatedEvents({
                page,
                limit,
                sort: { [sortValue.sort]: sortValue.order },
            }).unwrap();

            sortResponse.events.length > 0 && setEvents(sortResponse.events);
        }

        if (sortValue.order && !sortValue.sort) {
            showSwal({
                title: 'Information',
                text: 'Please select a sort option',
                icon: 'info',
            });
        }

        if (sortValue.sort && !sortValue.order) {
            showSwal({
                title: 'Information',
                text: 'Please select an order option',
                icon: 'info',
            });
        }
    } catch (error) {
        showSwal({
            title: 'Error',
            text: error.message,
            icon: 'error',
        });
    }
};

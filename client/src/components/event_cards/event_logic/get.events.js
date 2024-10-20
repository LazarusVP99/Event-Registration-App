import showSwal from "../../utils/alerts/message";

const getEventCards = async ({
    currentPage, sortValue, getPaginatedEvents, setEvents, setScrollLoading
}) => {
    const { page, limit } = currentPage;
    const { sort, order } = sortValue;

    try {
        const response = await getPaginatedEvents({
            page, limit, order, sort,
        }).unwrap();

        if (response.events.length > 0) {
            setEvents(response.events);
        }
    } catch (error) {
        showSwal({
            title: 'Error',
            text: error.message,
            icon: 'error',
        });
    } finally {
        setTimeout(() => {
            setScrollLoading(false);
        }, 200);
    }
};

export default getEventCards
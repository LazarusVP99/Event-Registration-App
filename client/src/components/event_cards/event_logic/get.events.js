import showSwal from "../../utils/alerts/message";

const getEventCards = async ({
    currentPage, getPaginatedEvents, setEvents, setScrollLoading
}) => {
    const { page, limit } = currentPage;
    try {
        const response = await getPaginatedEvents({
            page,
            limit,
            order: 'asc',
            sort: 'title',
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
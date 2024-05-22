import showSwal from "../../utils/alerts/message";

const getEventCards = async ({
    currentPage, getPaginatedEvents, setEvents,
}) => {
    const { page, limit } = currentPage;
    try {
        const response = await getPaginatedEvents({
            page,
            limit,
            sort: { organizer: 'desc' },
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
    }
};

export default getEventCards
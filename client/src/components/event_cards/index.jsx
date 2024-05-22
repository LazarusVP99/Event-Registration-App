import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import EventCards from './event_components/event_cards';
import SortCards from './event_components/sort_cards';
import Spinner from '../utils/spinner';

import { getCurrentPage, setCurrentPage } from '../../store/features/currentPage';
import { useGetPaginatedEventsMutation } from '../../store/api/events';
import { getSortedEvents } from '../../store/features/sortEvents';
import { applySort } from './event_logic/sort.handlers';
import getEventCards from './event_logic/get.events';
import { useSelector } from 'react-redux';

const Events = ({ dispatch }) => {
  const currentPage = useSelector(getCurrentPage);
  const sortValue = useSelector(getSortedEvents);
  const [events, setEvents] = useState([]);
  const [getPaginatedEvents, { data: paginatedEvents, isLoading, isError }] =
    useGetPaginatedEventsMutation();

  const { limit, page } = currentPage;

  // Retrieve events data from the database
  useEffect(() => {
    const getEvents = async () =>
      getEventCards({
        currentPage,
        events,
        getPaginatedEvents,
        setEvents,
      });

    void getEvents();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPaginatedEvents, setEvents, currentPage]);

  // Apply sorting to the events when onclick event fired
  const applySortHandler = () =>
    applySort({
      currentPage,
      sortValue,
      setEvents,
      getPaginatedEvents,
    });

  const hasNextPage = paginatedEvents?.hasNextPage;
  const hasPrevPage = paginatedEvents?.hasPrevPage;

  const loadMore = () => hasNextPage && dispatch(setCurrentPage({ page: page + 1, limit }));

  const loadLess = () => hasPrevPage && dispatch(setCurrentPage({ page: page - 1, limit }));

  if (isLoading && events.length === 0) return <Spinner />;

  if (isError) return <div>Error</div>;

  return (
    <>
      {/* Sort Cards Component  */}
      <SortCards
        sortValue={sortValue}
        dispatch={dispatch}
        applySort={applySortHandler}
      />
      {/* Event Cards */}
      <div className='grid h-fit w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {events?.map((event) => (
          <EventCards
            key={event._id}
            event={event}
          />
        ))}
      </div>
      <div className='flex h-20 w-full flex-row items-center justify-center gap-40'>
        <button
          className='rounded-md bg-gray-800/90 px-4 py-2 text-xl  font-semibold text-white transition-colors duration-300 hover:bg-gray-800/70 disabled:cursor-default disabled:bg-gray-400'
          disabled={!hasNextPage}
          onClick={loadMore}
        >
          Load More Events
        </button>
        <button
          className='rounded-md bg-gray-800/90 px-4 py-2 text-xl  font-semibold text-white transition-colors duration-300 hover:bg-gray-800/70 disabled:cursor-default disabled:bg-gray-400'
          disabled={!hasPrevPage}
          onClick={loadLess}
        >
          Load Previous Events
        </button>
      </div>
    </>
  );
};

Events.propTypes = {
  dispatch: PropTypes.func,
};

export default Events;

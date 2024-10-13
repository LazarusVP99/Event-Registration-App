import { createContext, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PropTypes } from 'prop-types';

import EventCards from './event_components/event_cards';
import SortCards from './event_components/sort_cards';
import Spinner from '../utils/spinner';

import { useLazyGetPaginatedEventsQuery } from '../../store/api/events';
import { getCurrentPage } from '../../store/features/currentPage';
import { getSortedEvents } from '../../store/features/sortEvents';
import ScrollLoader from './event_components/scroll_loader';
import { applySort } from './event_logic/sort.handlers';
import { useInfiniteScroll } from '../../hooks/hooks';
import getEventCards from './event_logic/get.events';
import { useSelector } from 'react-redux';

export const SortCardContext = createContext(null);

const Events = ({ dispatch }) => {
  const currentPage = useSelector(getCurrentPage);
  const sortValue = useSelector(getSortedEvents);
  const [events, setEvents] = useState([]);
  const [getPaginatedEvents, { data: paginatedEvents, isLoading, isError }] =
    useLazyGetPaginatedEventsQuery();

  const { limit, page } = currentPage;

  // Infinite Scroll Handler
  const { scrollLoading, setScrollLoading } = useInfiniteScroll({
    object: { page, limit },
    pageData: [paginatedEvents?.hasNextPage, paginatedEvents?.hasPrevPage],
  });

  // Retrieve events data from the database
  useEffect(() => {
    const getEvents = async () =>
      getEventCards({
        currentPage,
        getPaginatedEvents,
        setScrollLoading,
        setEvents,
      });

    void getEvents();
  }, [getPaginatedEvents, setEvents, currentPage, setScrollLoading]);

  // Apply sorting to the events when onclick event fired
  const applySortHandler = useCallback(
    () =>
      applySort({
        currentPage,
        sortValue,
        setEvents,
        getPaginatedEvents,
      }),
    [currentPage, getPaginatedEvents, sortValue]
  );

  if (isLoading && events.length === 0) return <Spinner />;
  if (isError) return <div className='text-xl font-bold text-red-600'>Error</div>;

  return (
    <>
      {/* Sort Cards Component  */}
      <SortCardContext.Provider
        value={{
          sortValue,
          applySort: applySortHandler,
          dispatch,
        }}
      >
        <SortCards />
      </SortCardContext.Provider>
      {/* Event Cards */}
      <motion.div
        className={`${events.hasNextPage ? 'mb-60' : 'mb-0'} grid h-fit w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {events?.map((event, index) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
          >
            <EventCards event={event} />
          </motion.div>
        ))}
      </motion.div>
      {/* Scroll Loader */}
      <ScrollLoader loader={scrollLoading} />
    </>
  );
};

Events.propTypes = {
  dispatch: PropTypes.func,
};

export default Events;

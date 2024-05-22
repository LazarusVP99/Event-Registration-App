import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import SearchBar from './view_components/search_filter';
import HighlightText from './view_components/highlight';
import Spinner from '../utils/spinner';

import { applyFilters, filterByEmail, filterByName, initialFilters } from './functions/filters.js';
import { useGetRegisteredEventMembersQuery } from '../../store/api/event.register';
import { selectRegisteredUsers } from '../../store/features/eventData.js';
import EventsWithNoUsers from './view_components/default.jsx';
import { useGetEventByIdQuery } from '../../store/api/events';
import EventCountdown from './view_components/countdown.jsx';
import { chartData, options } from './functions/charts.js';
import { useSelector } from 'react-redux';

const ViewMembers = () => {
  const { id } = useParams();
  const [event, setEvent] = useState([]);
  const [eventMembers, setEventMembers] = useState([]);
  const [filter, setFilter] = useState(initialFilters);
  const usersEventTimestampObject = useSelector(selectRegisteredUsers);
  const { data: eventsData } = useGetEventByIdQuery({ id });
  const { data, isLoading, isError } = useGetRegisteredEventMembersQuery({
    eventId: id,
  });

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const usersTimestamp =
    (usersEventTimestampObject[id] && Object.keys(usersEventTimestampObject[id]).map(Number)) ?? [];

  const chartProps = chartData(usersEventTimestampObject, usersTimestamp, id);

  // Retrieve event members data from the database
  useEffect(() => data && setEventMembers(data), [data]);
  // Retrieve event data from the database
  useEffect(() => eventsData && setEvent(eventsData), [eventsData]);
  // useEffect hook that is applying filtered data to the event members state
  useEffect(() => data && applyFilters({ data, filter, setEventMembers }), [filter, data]);

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error retrieving event members</div>;

  if (data.length === 0) return <EventsWithNoUsers event={event} />;

  const displayAmountOfUsersRegistered = () => (
    <Line
      options={options}
      data={chartProps}
      className='border border-gray-800'
    />
  );

  return (
    <>
      <div className='relative m-5 mb-8 sm:mb-16 lg:mb-0 w-full h-full flex flex-col items-center justify-center gap-8 lg:justify-between lg:items-start'>
        <h1 className='text-2xl w-full text-center lg:text-start text-gray-800 cursor-default font-semibold sm:text-3xl xl:text-4xl'>
          <q>{event.title}</q> participants
        </h1>
        <div className='flex flex-col w-full h-52 gap-5'>
          <div className='flex h-fit w-fit lg:w-1/2 gap-5 rounded-md bg-gray-800 p-5 md:flex-row lg:gap-12'>
            <SearchBar
              filters={(keyword) => filterByEmail(keyword, setFilter)}
              search={'Email'}
            />
            <SearchBar
              filters={(keyword) => filterByName(keyword, setFilter)}
              search={'Name'}
            />
          </div>

          <div className='flex justify-between px-6 xl:flex-col items-start xl:items-stretch w-full h-96'>
            <div
              className='cursor-default h-fit w-fit lg:w-60 bg-gray-800 text-white p-2 rounded-md shadow-md hover:bg-gray-700
          transition-colors duration-150'
            >
              <p className='text-lg lg:text-xl mb-1'>Event starts in</p>
                  <EventCountdown event={event} />
            </div>

            <div className='static lg:absolute mr-6 md:mr-12 lg:top-10 lg:right-20 w-60 sm:w-80 lg:w-96 h-40 md:h-40 sm:h-36 lg:h-80 p-2'>
              {displayAmountOfUsersRegistered()}
            </div>
          </div>
        </div>
      </div>
      <div className='grid h-full max-h-60 grid-cols-1 place-items-center gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        <AnimatePresence>
          {eventMembers.map(({ fullName, email, _id }) => (
            <motion.div
              layout
              key={_id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className='flex h-40 w-[93%] flex-col items-center justify-center gap-5 rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-600 dark:bg-gray-800'
            >
              <h5 className='sm:text-md mb-1 text-lg font-medium text-gray-900 xl:text-2xl dark:text-white'>
                <HighlightText
                  query={fullName}
                  highlight={filter.nameSearch}
                />
              </h5>
              <span className='text-lg text-gray-500 xl:text-xl dark:text-gray-400'>
                <HighlightText
                  query={email}
                  highlight={filter.emailSearch}
                />
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ViewMembers;

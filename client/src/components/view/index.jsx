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

  useEffect(() => data && setEventMembers(data), [data]);
  useEffect(() => eventsData && setEvent(eventsData), [eventsData]);
  useEffect(() => data && applyFilters({ data, filter, setEventMembers }), [filter, data]);

  if (isLoading) return <Spinner />;

  if (new Date(event.endTime).getTime() < new Date()) {
    return (
      <div className='flex w-full justify-center items-center h-screen'>
        <div className='font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl text-red-500 bg-red-100 p-2 shadow-md'>
          Event has ended
        </div>
      </div>
    );
  } else if (
    new Date(event.startTime).getTime() <= new Date() &&
    new Date(event.endTime).getTime() > new Date()
  ) {
    return (
      <div className='flex w-full justify-center items-center h-screen'>
        <div className='font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl text-green-500 bg-green-100 p-2 shadow-md'>
          Event is ongoing right now
        </div>
      </div>
    );
  }

  if (isError) return <div className="text-red-500 font-semibold text-center p-4">Error retrieving event members</div>;

  if (data.length === 0) return <EventsWithNoUsers event={event} />;

  const displayAmountOfUsersRegistered = () => (
    <Line
      options={options}
      data={chartProps}
      className='border border-gray-800 w-full h-full'
    />
  );

  return (
    <>
      <div className='relative m-3 sm:m-5 mb-8 sm:mb-16 lg:mb-0 w-full h-full flex flex-col items-center justify-center gap-4 sm:gap-8 lg:justify-between lg:items-start'>
        <h1 className='text-base lg:text-xl w-full text-justify md:text-start text-gray-800 cursor-default font-semibold sm:text-3xl xl:text-4xl'>
          <span className='block sm:inline'>
            <q>{event.title}</q>
          </span>
          <span className='block sm:inline'> participants</span>
        </h1>
        <div className='flex flex-col w-full gap-3 sm:gap-5'>
          <div className='flex flex-col md:flex-row w-60 md:w-fit gap-3 sm:gap-5 rounded-md bg-gray-800 p-3 sm:p-5'>
            <div className='w-full sm:w-1/2'>
              <SearchBar
                filters={(keyword) => filterByEmail(keyword, setFilter)}
                search={'Email'}
              />
            </div>
            <div className='w-full sm:w-1/2'>
              <SearchBar
                filters={(keyword) => filterByName(keyword, setFilter)}
                search={'Name'}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row justify-between px-3 sm:items-start items-center md:items-stretch w-full'>
          <EventCountdown event={event} />

          <div className='lg:absolute relative lg:right-20 lg:top-20 w-full sm:w-80 lg:w-96 h-40 sm:h-48 lg:h-60 p-2 mr-1 sm:mr-2 lg:m-0'>
            {displayAmountOfUsersRegistered()}
          </div>
        </div>
      </div>
      <div className='grid w-72 md:w-full h-full max-h-60 grid-cols-1 place-items-center gap-y-4 sm:gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        <AnimatePresence>
          {eventMembers.map(({ fullName, email, _id }) => (
            <motion.div
              layout
              key={_id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className='flex h-36 sm:h-40 w-[95%] sm:w-[93%] flex-col items-center justify-center gap-3 sm:gap-5 rounded-lg border border-gray-200 bg-white p-3 sm:p-4 shadow-md dark:border-gray-600 dark:bg-gray-800'
            >
              <h5 className='text-base sm:text-lg font-medium text-gray-900 xl:text-2xl dark:text-white'>
                <HighlightText
                  query={fullName}
                  highlight={filter.nameSearch}
                />
              </h5>
              <span className='text-sm sm:text-base lg:text-lg text-gray-500 xl:text-xl dark:text-gray-400'>
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

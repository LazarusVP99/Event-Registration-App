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
import EventsWithNoUsers from './view_components/default.jsx';
import { useGetEventByIdQuery } from '../../store/api/events';
import EventCountdown from './view_components/countdown.jsx';
import { chartData, options } from './functions/chart.js';

const ViewMembers = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [eventMembers, setEventMembers] = useState([]);
  const [filter, setFilter] = useState(initialFilters);
  const { data: eventsData } = useGetEventByIdQuery({ id });
  const { data, isLoading, isError } = useGetRegisteredEventMembersQuery({
    eventId: id,
  });

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const usersTimestamp =
    data &&
    data.flatMap(
      (timestamp) =>
        (timestamp.registrations[id] && Object.keys(timestamp.registrations[id]).map(Number)) || []
    );

  const usersTimestampChartData = data && data.map((e) => e.registrations[id]);
  const chartProps = chartData(usersTimestampChartData, usersTimestamp);

  useEffect(() => data && setEventMembers(data), [data]);
  useEffect(() => eventsData && setEvent(eventsData), [eventsData]);
  useEffect(() => data && applyFilters({ data, filter, setEventMembers }), [filter, data]);

  if (eventsData && (eventsData.time === 'over' || eventsData.time === 'ongoing')) {
    const isOver = eventsData.time === 'over';
    return (
      <div className='flex w-full justify-center items-center min-h-screen p-4'>
        <div
          className={`font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl ${isOver ? 'text-red-500 bg-red-100' : 'text-green-500 bg-green-100'} p-4 shadow-md rounded-lg text-center`}
        >
          {eventsData.message}
        </div>
      </div>
    );
  }

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className='text-red-500 font-semibold text-center p-4'>
        Error retrieving event members
      </div>
    );

  if (data.length === 0) return <EventsWithNoUsers event={event} />;

  const displayAmountOfUsersRegistered = () => (
    <Line
      options={options}
      data={chartProps}
      className='border border-gray-800 w-full h-full bg-white'
    />
  );

  return (
    <div className='flex flex-col gap-8 h-full mx-5 my-2'>
      <div className='flex flex-col items-center lg:items-start gap-8 h-auto lg:h-[420px]'>
        <h1 className='text-xl sm:text-2xl lg:text-4xl text-center lg:text-left text-gray-800 font-bold'>
          <span className='block lg:inline'>
            <q className='italic'>{event.title}</q>
          </span>
          <span className='block lg:inline ml-0 lg:ml-2'>participants</span>
        </h1>

        <div className='flex flex-col 2xl:flex-row gap-2 bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-fit'>
          <div className='w-full md:w-[400px]'>
            <SearchBar
              filters={(keyword) => filterByEmail(keyword, setFilter)}
              search={'Email'}
            />
          </div>
          <div className='w-full md:w-1/2'>
            <SearchBar
              filters={(keyword) => filterByName(keyword, setFilter)}
              search={'Name'}
            />
          </div>
        </div>
        <div className='flex flex-col lg:flex-row w-full gap-8'>
          <div className='w-full lg:w-1/2'>
            <EventCountdown event={event} />
          </div>

          <div className='block lg:absolute top-20 right-5 w-full lg:w-[650px] h-64 sm:h-[250px] md:h-[300px] lg:h-[350px] bg-white'>
            <div className='bg-gray-800 h-full p-4 rounded-lg shadow-lg border-gray-700 border'>
              <div className='w-full h-full'>
                {displayAmountOfUsersRegistered()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-40'>
        <AnimatePresence>
          {eventMembers.map(({ fullName, email, _id }) => (
            <motion.div
              key={_id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className='flex flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-600 dark:bg-gray-800 dark:shadow-gray-700'
            >
              <h5 className='text-2xl font-semibold text-gray-900 dark:text-white text-center'>
                <HighlightText
                  query={fullName}
                  highlight={filter.nameSearch}
                />
              </h5>
              <span className='text-lg text-gray-500 dark:text-gray-400 text-center break-all'>
                <HighlightText
                  query={email}
                  highlight={filter.emailSearch}
                />
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default ViewMembers;
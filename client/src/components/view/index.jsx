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
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

import Spinner from '../utils/spinner';
import HighlightText from './view_components/highlight';
import SearchBar from './view_components/search_filter';

import { useGetRegisteredEventMembersQuery } from '../../store/api/event.register';
import { useGetEventByIdQuery } from '../../store/api/events';
import { chartData, options } from './functions/chart.js';
import { applyFilters, filterByEmail, filterByName, initialFilters } from './functions/filters.js';
import EventCountdown from './view_components/countdown.jsx';
import EventsWithNoUsers from './view_components/default.jsx';

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
      <div className='flex min-h-screen w-full items-center justify-center p-4'>
        <div
          className={`text-base font-bold sm:text-lg md:text-xl lg:text-2xl xl:text-4xl ${isOver ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'} rounded-lg p-4 text-center shadow-md`}
        >
          {eventsData.message}
        </div>
      </div>
    );
  }

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className='p-4 text-center font-semibold text-red-500'>
        Error retrieving event members
      </div>
    );

  if (data.length === 0) return <EventsWithNoUsers event={event} />;

  const displayAmountOfUsersRegistered = () => (
    <Line
      options={options}
      data={chartProps}
      className='size-full border rounded-lg border-gray-800 bg-white'
    />
  );

  return (
    <div className='mx-6 my-2 flex h-full flex-col ~lg/2xl:~gap-6/16'>
      <div className='flex h-auto flex-col items-center gap-8 lg:h-[420px] lg:items-start'>
        <h1 className='~text-xl/4xl text-center font-bold text-gray-800 lg:text-left'>
          <span className='block lg:inline'>
            <q className='italic'>{event.title}</q>
          </span>
          <span className='ml-0 block lg:ml-2 lg:inline'>participants</span>
        </h1>

        <div className='flex w-80 lg:w-[28rem] xl:w-[50%] flex-col rounded-lg bg-gray-800 p-4 shadow-lg xl:flex-row gap-4'>
          <div className='w-full xl:w-1/2'>
            <SearchBar
              filters={(keyword) => filterByEmail(keyword, setFilter)}
              search={'Email'}
            />
          </div>
          <div className='w-full xl:w-1/2'>
            <SearchBar
              filters={(keyword) => filterByName(keyword, setFilter)}
              search={'Name'}
            />
          </div>
        </div>
        <div className='flex w-full flex-col justify-center items-center gap-8 lg:flex-row lg:justify-start lg:items-stretch'>
          <div className='w-72 sm:w-96 lg:w-full'>
            <EventCountdown event={event} />
          </div>

          <div className='right-5 top-20 block w-full bg-white lg:absolute lg:w-[47%]'>
            <div className=' ~/2xl:~w-96/[45rem] ~/2xl:~h-64/96 rounded-lg border border-gray-700 border-dashed ~/lg:~p-1/4 shadow-lg'>
              {displayAmountOfUsersRegistered()}
            </div>
          </div>
        </div>
      </div>
      <div className='grid min-h-40 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <AnimatePresence>
          {eventMembers.map(({ fullName, email, _id }) => (
            <motion.div
              key={_id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className='flex flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white ~/xl:~p-2/6 shadow-md dark:border-gray-600 dark:bg-gray-800 dark:shadow-gray-700'
            >
              <h5 className='text-center text-2xl font-semibold text-gray-900 dark:text-white'>
                <HighlightText
                  query={fullName}
                  highlight={filter.nameSearch}
                />
              </h5>
              <span className='break-all text-center text-lg text-gray-500 dark:text-gray-400'>
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
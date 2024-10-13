import EventCountdown from './countdown';
import { PropTypes } from 'prop-types';

const EventsWithNoUsers = ({ event }) => (
  <div className='font-bold flex flex-col items-center gap-2 text-xl'>
    <h1 className='my-8 font-serif text-xl text-gray-800 font-bold sm:text-3xl xl:text-5xl'>
      No participants applied to this event yet
    </h1>

    <div className='bg-gray-500 w-fit flex text-white p-1 rounded-md shadow-md mt-8 pt-5 pr-4'>
      <EventCountdown event={event} />
    </div>
  </div>
);

EventsWithNoUsers.propTypes = {
  event: PropTypes.object,
};

export default EventsWithNoUsers;

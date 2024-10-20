import EventCountdown from './countdown';
import { PropTypes } from 'prop-types';

const EventsWithNoUsers = ({ event }) => (
  <div className='flex flex-col items-center gap-2 font-bold'>
    <h1 className='~text-xl/5xl my-8 font-serif font-bold  text-gray-800'>
      No participants applied to this event yet
    </h1>

    <div className='~lg:~pt-2/5 ~lg:~px-2/5 inset-4 mt-8 flex w-fit rounded-md bg-gray-500 text-white shadow-md'>
      <EventCountdown event={event} />
    </div>
  </div>
);

EventsWithNoUsers.propTypes = {
  event: PropTypes.object,
};

export default EventsWithNoUsers;

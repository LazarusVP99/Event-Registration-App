import EventCountdown from './countdown';
import { PropTypes } from 'prop-types';

const EventsWithNoUsers = ({ event }) => {
  return (
    <div className='font-bold flex flex-col items-center gap-2 text-xl'>
      <h1 className='my-8 font-serif text-xl text-gray-800 font-bold sm:text-3xl xl:text-5xl'>
        No participants applied to this event yet
      </h1>

      <div className='bg-gray-800 w-fit flex gap-6 text-white px-6 py-4 rounded-md shadow-md mt-8'>
        Event starts in: <EventCountdown event={event} />
      </div>
    </div>
  );
};

EventsWithNoUsers.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    organizer: PropTypes.string.isRequired,
    registrations: PropTypes.array.isRequired,
  }).isRequired,
};

export default EventsWithNoUsers;

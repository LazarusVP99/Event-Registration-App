import { PropTypes } from 'prop-types';

import { Link } from 'react-router-dom';

const EventCards = ({ event }) => {
  const convertDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div
      key={event._id}
      className='relative flex h-80 w-full flex-col items-center justify-start gap-5 border border-gray-500 bg-gray-800 p-4 transition-all duration-300 hover:bg-gray-900/90'
    >
      <h4 className='text-xl font-bold text-gray-300 lg:text-2xl xl:text-3xl'>{event.title}</h4>
      <p className='line-clamp-3 text-base text-gray-400 lg:text-lg'>
        {event.description.length >= 30
          ? event.description.slice(0, 45) + '...'
          : event.description}
      </p>
      <div className='text-md flex flex-col text-gray-500'>
        <div className='event_date'>
          Event starts at <span>{convertDate(event.startTime)}</span>
        </div>
        <div className='event_date'>
          Event ends at <span>{convertDate(event.endTime)}</span>
        </div>
      </div>
      <small className='absolute bottom-1/3 text-pretty text-gray-300'>
        Sponsored and organized by {event.organizer}
      </small>
      <div className='absolute bottom-8 flex w-full justify-center gap-40'>
        <Link
          to={`/register/${event._id}`}
          className='event_button rounded-md tracking-wide bg-green-700 p-2 text-xl text-white transition-colors duration-300 hover:bg-green-600 lg:text-2xl'
        >
          Register
        </Link>
        <Link
          to={`/members/${event._id}`}
          className='event_button rounded-md tracking-wide bg-gray-200 p-2 text-xl text-gray-700 transition-colors duration-300 hover:bg-gray-300 lg:text-2xl'
        >
          View
        </Link>
      </div>
    </div>
  );
};

EventCards.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventCards;

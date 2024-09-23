import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { useState } from 'react';

const EventCards = ({ event }) => {
  const [showDescription, setShowDescription] = useState(false);

  const convertDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div
      key={event._id}
      className='relative flex h-[420px] w-full flex-col items-center justify-start gap-5 border border-gray-500 bg-gray-800 p-4 transition-all duration-300 hover:bg-gray-900/90'
    >
      <div className='flex flex-col items-center h-72 gap-4 w-full'>
        <h4 className='text-xl line-clamp-2 font-bold text-gray-300 sm:text-2xl lg:text-3xl'>
          {event.title}
        </h4>
        <button
          type='button'
          onClick={() => setShowDescription(!showDescription)}
          className='w-full'
        >
          {showDescription && event.description.length > 60 ? (
            <div className='relative'>
              <p className='absolute top-0 left-0 w-full text-sm text-gray-400 sm:text-base lg:text-lg text-center z-20 bg-gray-800'>
                {event.description}
              </p>
            </div>
          ) : (
            <p className='line-clamp-3 text-sm text-gray-400 sm:text-base lg:text-lg text-center'>
              {event.description.length > 60
                ? event.description.slice(0, 60) + '...'
                : event.description}
            </p>
          )}
        </button>
        {!showDescription && (
          <div className='text-sm sm:text-base flex flex-col items-start text-gray-500'>
            <div className='event_date'>
              Event starts at <span className='font-semibold'>{convertDate(event.startTime)}</span>
            </div>
            <div className='event_date'>
              Event ends at <span className='font-semibold'>{convertDate(event.endTime)}</span>
            </div>
          </div>
        )}
      </div>

      <small className='text-center text-xs sm:text-sm text-gray-300 mt-4'>
        Sponsored and organized by {event.organizer}
      </small>
      <div className='flex w-full justify-center gap-4 sm:gap-8 mt-6'>
        <Link
          to={`/register/${event._id}`}
          className='event_button rounded-md tracking-wide bg-green-700 px-4 py-2 text-sm sm:text-base lg:text-lg text-white transition-colors duration-300 hover:bg-green-600'
        >
          Register
        </Link>
        <Link
          to={`/members/${event._id}`}
          className='event_button rounded-md tracking-wide bg-gray-200 px-4 py-2 text-sm sm:text-base lg:text-lg text-gray-700 transition-colors duration-300 hover:bg-gray-300'
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

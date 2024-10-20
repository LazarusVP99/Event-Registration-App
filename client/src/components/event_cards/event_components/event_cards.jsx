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
      className='~/xl:~gap-1/3 flex h-fit w-full flex-col items-center justify-start border border-gray-500 bg-gray-800 p-2 transition-all duration-300 hover:bg-gray-900/90 lg:h-[440px]'
    >
      <div className='sm/xl:~h-44/72 ~/xl:~gap-2/4 my-4  flex h-32 w-full flex-col items-center text-center sm:text-pretty'>
        <h4 className='~text-lg/2xl line-clamp-2 font-bold text-gray-300'>{event.title}</h4>
        <button
          type='button'
          onClick={() => setShowDescription(!showDescription)}
          className='w-full'
        >
          {showDescription && event.description.length > 60 ? (
            <div className='relative'>
              <p className='~text-sm/lg absolute left-0 top-0 z-20 w-full bg-gray-800 text-center text-gray-400'>
                {event.description}
              </p>
            </div>
          ) : (
            <p className='~text-sm/lg line-clamp-3 text-center text-gray-400'>
              {event.description.length > 60
                ? event.description.slice(0, 60) + '...'
                : event.description}
            </p>
          )}
        </button>
        {!showDescription && (
          <div className='~text-xs/base flex flex-col  items-start gap-2 text-gray-400/80'>
            <div className='event_date'>
              Event starts at <span className='font-semibold'>{convertDate(event.startTime)}</span>
            </div>
            <div className='event_date'>
              Event ends at <span className='font-semibold'>{convertDate(event.endTime)}</span>
            </div>
          </div>
        )}
      </div>

      <small className='~text-sm/base mt-4 text-center  text-gray-300'>
        Sponsored and organized by {event.organizer}
      </small>
      <div className='~/2xl:~my-3/6 ~/xl:~gap-2/8 flex w-72 justify-between md:w-full md:justify-center'>
        <Link
          to={`/register/${event._id}`}
          className='event_button ~text-base/lg rounded-md bg-green-700 px-10 py-2 tracking-wide text-white transition-colors duration-300 hover:bg-green-600'
        >
          Register
        </Link>
        <Link
          to={`/members/${event._id}`}
          className='event_button ~text-base/lg rounded-md bg-gray-200 px-10 py-2 tracking-wide text-gray-700 transition-colors duration-300 hover:bg-white/80'
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

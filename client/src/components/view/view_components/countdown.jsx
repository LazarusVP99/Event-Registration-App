import { PropTypes } from 'prop-types';

import { useEventCountdown } from '../../../hooks/hooks';

const EventCountdown = ({ event }) => {
  const eventCountdown = useEventCountdown({ event });

  return (
    <div
      className='cursor-default h-fit w-40 sm:w-auto bg-gray-800 text-white p-2 sm:p-3 md:p-4 lg:p-5 rounded-md shadow-md hover:bg-gray-700 transition-colors duration-150 mb-2 sm:mb-3 md:mb-4 lg:mb-5'
    >
      <p className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-1 sm:mb-2 md:mb-3'>
        Event starts in
      </p>
      <div className='flex w-full justify-between items-start'>
        <div className='font-bold flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl'>
          {eventCountdown.days > 0 ? (
            <span className='flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2'>
              <span>{eventCountdown.days}</span>
              <span>d</span>
            </span>
          ) : (
            <span className='flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 mr-0.5 sm:mr-1 md:mr-1.5 lg:mr-2'>
              <span className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9 bg-gray-500 rounded-full animate-pulse'></span>
            </span>
          )}

          <span className='border-l border-gray-500 h-4 sm:h-5 md:h-6 lg:h-7 xl:h-8 2xl:h-9' />

          {eventCountdown.days > 0 || eventCountdown.hours > 0 ? (
            <span className='flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2'>
              <span>{eventCountdown.hours}</span>
              <span>h</span>
            </span>
          ) : (
            <span className='flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 mx-0.5 sm:mx-1 md:mx-1.5 lg:mx-2'>
              <span className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9 bg-gray-500 rounded-full animate-pulse'></span>
            </span>
          )}

          <span className='border-l border-gray-500 h-4 sm:h-5 md:h-6 lg:h-7 xl:h-8 2xl:h-9' />

          {eventCountdown.days > 0 || eventCountdown.hours > 0 || eventCountdown.minutes > 0 ? (
            <span className='flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2'>
              <span>{eventCountdown.minutes}</span>
              <span>m</span>
            </span>
          ) : (
            <span className='flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 mx-0.5 sm:mx-1 md:mx-1.5 lg:mx-2'>
              <span className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9 bg-gray-500 rounded-full animate-pulse'></span>
            </span>
          )}

          <span className='border-l border-gray-500 h-4 sm:h-5 md:h-6 lg:h-7 xl:h-8 2xl:h-9' />

          {eventCountdown.days === 0 &&
          eventCountdown.hours === 0 &&
          eventCountdown.minutes === 0 ? (
            <span className='flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 ml-0.5 sm:ml-1 md:ml-1.5 lg:ml-2'>
              <span className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9 bg-gray-500 rounded-full animate-pulse'></span>
            </span>
          ) : (
            <span className='flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2'>
              <span>{eventCountdown.seconds}</span>
              <span>s</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

EventCountdown.propTypes = {
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

export default EventCountdown;
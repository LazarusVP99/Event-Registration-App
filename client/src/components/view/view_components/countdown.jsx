import { PropTypes } from 'prop-types';

import { useEventCountdown } from '../../../hooks/hooks';

const EventCountdown = ({ event }) => {
  const eventCountdown = useEventCountdown({ event });
  return (
    <div className='flex w-full justify-between items-start'>
      <div className='font-bold flex items-center gap-2 text-base lg:text-xl'>
        {eventCountdown.days > 0 ? (
          <span className='flex items-center gap-1'>
            <span>{eventCountdown.days}</span>
            <span>d</span>
          </span>
        ) : (
          <span className='flex items-center gap-1 mr-1'>
            <span className='w-8 h-8 bg-gray-500 rounded-full animate-pulse'></span>
          </span>
        )}

        <span className='border-l border-gray-500 h-8' />

        {eventCountdown.days > 0 || eventCountdown.hours > 0 ? (
          <span className='flex items-center gap-1'>
            <span>{eventCountdown.hours}</span>
            <span>h</span>
          </span>
        ) : (
          <span className='flex items-center gap-1 mx-1'>
            <span className='w-8 h-8 bg-gray-500 rounded-full animate-pulse'></span>
          </span>
        )}

        <span className='border-l border-gray-500 h-8' />

        {eventCountdown.days > 0 || eventCountdown.hours > 0 || eventCountdown.minutes > 0 ? (
          <span className='flex items-center gap-1'>
            <span>{eventCountdown.minutes}</span>
            <span>m</span>
          </span>
        ) : (
          <span className='flex items-center gap-1 mx-1'>
            <span className='w-8 h-8 bg-gray-500 rounded-full animate-pulse'></span>
          </span>
        )}

        <span className='border-l border-gray-500 h-8' />

        {eventCountdown.days === 0 && eventCountdown.hours === 0 && eventCountdown.minutes === 0 ? (
          <span className='flex items-center gap-1 ml-1'>
            <span className='w-8 h-8 bg-gray-500 rounded-full animate-pulse'></span>
          </span>
        ) : (
          <span className='flex items-center gap-1'>
            <span>{eventCountdown.seconds}</span>
            <span>s</span>
          </span>
        )}
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

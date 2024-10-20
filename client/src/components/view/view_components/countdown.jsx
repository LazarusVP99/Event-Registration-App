import { PropTypes } from 'prop-types';

import { useEventCountdown } from '../../../hooks/hooks';

const EventCountdown = ({ event }) => {
  const eventCountdown = useEventCountdown({ event });

  const countdownDisplay = (info) => {
    const { days, hours, minutes, seconds } = eventCountdown;
    const timeValues = { d: days, h: hours, m: minutes, s: seconds };

    const isCountdownActive = Object.values(timeValues).some((value) => value > 0);

    if (isCountdownActive) {
      return (
        <span className='~/lg:~gap-1/2 flex items-center'>
          <span>{timeValues[info]}</span>
          <span>{info}</span>
        </span>
      );
    }

    return (
      <span className='~/lg:~gap-1/3 ~/lg:~mr-1/2 flex items-center'>
        <span className='~/2xl:~size-3/9 animate-pulse rounded-full bg-gray-500'></span>
      </span>
    );
  };

  return (
    <div className='~lg:~mb-2/5 ~/lg:~p-3/5 h-fit w-full cursor-default rounded-md bg-gray-800 text-white shadow-md transition-colors duration-150 hover:bg-gray-700 lg:w-fit'>
      <p className='~text-base/xl ~/md:~mb-1/3 text-center'>Event starts in</p>
      <div className='flex w-full items-center justify-center lg:justify-between'>
        <div className='~text-base/2xl ~/lg:~gap-2/4 flex flex-row items-center font-bold'>
          {countdownDisplay('d')}

          <span className='~/2xl:~h-3/9 block border-l border-gray-500' />

          {countdownDisplay('h')}

          <span className='~/2xl:~h-3/9 block border-l border-gray-500' />

          {countdownDisplay('m')}

          <span className='~/2xl:~h-3/9 block border-l border-gray-500' />

          {countdownDisplay('s')}
        </div>
      </div>
    </div>
  );
};

EventCountdown.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventCountdown;
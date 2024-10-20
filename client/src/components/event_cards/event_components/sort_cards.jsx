import { handleOrder, handleSort, sortOrderData } from '../event_logic/sort.handlers';
import { getSortedEvents } from '../../../store/features/sortEvents';
import { useSelector } from 'react-redux';
import { SortCardContext } from '..';
import { useContext } from 'react';

const SortCards = () => {
  const { sort } = useSelector(getSortedEvents);
  const { sortValue, dispatch } = useContext(SortCardContext);
  const { sortData, orderData } = sortOrderData;

  const selectFields = (value, id) => (
    <select
      id={id}
      defaultValue=''
      onChange={({ target }) =>
        id === 'sortField'
          ? handleSort({ target, dispatch, sortValue })
          : handleOrder({ target, dispatch, sortValue })
      }
      className='w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-base md:text-lg'
    >
      {value &&
        value.map((item) => (
          <option
            key={item.value}
            disabled={item.value === sort}
            className='white text-sm text-gray-800 disabled:bg-gray-500 disabled:text-gray-200 sm:text-base md:text-lg'
            {...item}
          />
        ))}
    </select>
  );

  return (
    <div className='flex w-full flex-col items-center justify-center space-y-4 p-4 sm:p-6 md:p-8 lg:w-[60rem] lg:items-start lg:justify-start'>
      <h1 className='~text-2xl/5xl cursor-default font-bold text-gray-900'>Upcoming Events</h1>
      <div className='flex w-full flex-col gap-4 space-x-0 sm:gap-5 md:gap-6 lg:flex-row lg:flex-wrap lg:items-start lg:justify-start lg:space-x-4'>
        <div className='my-1 flex w-full flex-col items-center gap-2 rounded-md bg-gray-800 p-3 sm:p-4 md:p-5 lg:flex-row lg:gap-5 lg:p-6'>
          <label
            htmlFor='sortField'
            className='~text-lg/2xl shrink-0 font-bold text-white'
          >
            Sort Events by:
          </label>
          <div className='~/xl:~gap-5/10 my-3 flex w-full flex-col items-center sm:flex-row lg:items-start'>
            {selectFields(sortData, 'sortField')}

            {selectFields(orderData, 'sortOrder')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortCards;

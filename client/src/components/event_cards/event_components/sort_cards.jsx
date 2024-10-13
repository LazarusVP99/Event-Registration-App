import { handleOrder, handleSort } from '../event_logic/sort.handlers';
import { SortCardContext } from '..';
import { useContext } from 'react';

const SortCards = () => {
  const { sortValue, dispatch, applySort } = useContext(SortCardContext);

  return (
    <div className='flex w-full flex-col items-center justify-center space-y-4 p-4 sm:p-6 md:p-8 lg:w-fit lg:items-start lg:justify-start'>
      <h1 className='cursor-default text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl xl:text-5xl'>
        Upcoming Events
      </h1>
      <div className='flex w-full flex-col gap-4 space-x-0 sm:gap-5 md:gap-6 lg:flex-row lg:flex-wrap lg:items-start lg:justify-start lg:space-x-4'>
        <div className='my-1 flex w-full flex-col items-center gap-2 rounded-md bg-gray-800 p-3 sm:p-4 md:p-5 lg:flex-row lg:gap-5 lg:p-6'>
          <label
            htmlFor='sortField'
            className='flex-shrink-0 text-lg font-bold text-white sm:text-xl md:text-2xl'
          >
            Sort Events by:
          </label>
          <div className='my-3 flex w-full flex-col items-center gap-3 space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 md:space-x-6 lg:items-start'>
            <select
              id='sortField'
              defaultValue=''
              onChange={({ target }) => handleSort({ target, dispatch, sortValue })}
              className='text-sm w-full sm:w-48 md:w-56 rounded-md border-gray-400 bg-gray-700 px-2 py-1 sm:px-3 sm:py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500'
            >
              <option
                disabled
                value=''
                className='bg-gray-400 p-1 sm:p-2 text-base sm:text-lg text-white hover:bg-current hover:text-white'
              >
                Select Sort Option
              </option>
              <option
                value='title'
                className='bg-gray-700 text-base sm:text-lg text-gray-300'
              >
                Title
              </option>
              <option
                value='startTime'
                className='bg-gray-700 text-base sm:text-lg text-gray-300'
              >
                Date
              </option>
              <option
                value='organizer'
                className='bg-gray-700 text-base sm:text-lg text-gray-300'
              >
                Organizer
              </option>
            </select>

            <select
              id='sortOrder'
              defaultValue=''
              onChange={({ target }) => handleOrder({ target, dispatch, sortValue })}
              className='text-sm w-full sm:w-48 md:w-56 rounded-md border-gray-400 bg-gray-700 px-2 py-1 sm:px-3 sm:py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500'
            >
              <option
                disabled
                defaultChecked
                value=''
                className='bg-gray-400 p-1 sm:p-2 text-base sm:text-lg text-white hover:bg-current hover:text-white'
              >
                Select Order
              </option>
              <option
                value='asc'
                className='bg-gray-700 text-base sm:text-lg text-gray-300'
              >
                Ascending
              </option>
              <option
                value='desc'
                className='bg-gray-700 text-base sm:text-lg text-gray-300'
              >
                Descending
              </option>
            </select>

            <button
              onClick={applySort}
              className='w-full sm:w-40 cursor-pointer appearance-none rounded-md bg-white p-1 sm:p-2 text-center text-lg sm:text-xl font-semibold shadow-md ring-gray-600 ease-in-out hover:bg-gray-300 hover:shadow-lg active:bg-gray-400'
            >
              Apply Sorts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortCards;

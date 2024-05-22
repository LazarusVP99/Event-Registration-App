import { PropTypes } from 'prop-types';

import { handleOrder, handleSort } from '../event_logic/sort.handlers';

const SortCards = ({ sortValue, dispatch, applySort }) => (
  <div className='flex w-full flex-col items-center justify-center space-y-4 p-8 md:w-fit md:items-start md:justify-start'>
    <h1 className='cursor-default text-3xl font-bold text-gray-900 md:text-4xl xl:text-5xl'>
      Upcoming Events
    </h1>
    <div className='flex w-full flex-col gap-6 space-x-0 md:flex-row md:gap-6 md:space-y-4 lg:flex-wrap lg:items-start lg:justify-start lg:space-x-4'>
      <div className='my-1 flex w-full flex-col items-center gap-0 rounded-md bg-gray-800 p-2 px-4 lg:flex-row lg:gap-5 lg:p-3 lg:px-8'>
        <label
          htmlFor='sortField'
          className='flex-shrink-0 text-xl font-bold text-white xl:text-2xl'
        >
          Sort Events by:
        </label>
        <div className='my-5 flex w-full flex-col items-center gap-1 space-y-4 md:flex-row md:space-x-8 md:space-y-0 lg:items-start'>
          <select
            id='sortField'
            defaultValue=''
            onChange={({ target }) => handleSort({ target, dispatch, sortValue })}
            className='text-md w-56 rounded-md border-gray-400 bg-gray-700 px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500'
          >
            <option
              disabled
              value=''
              className='bg-gray-400 p-2 text-lg text-white hover:bg-current hover:text-white'
            >
              Select Sort Option
            </option>
            <option
              value='title'
              className='bg-gray-700 text-lg text-gray-300'
            >
              Title
            </option>
            <option
              value='startTime'
              className='bg-gray-700 text-lg text-gray-300'
            >
              Date
            </option>
            <option
              value='organizer'
              className='bg-gray-700 text-lg text-gray-300'
            >
              Organizer
            </option>
          </select>

          <select
            id='sortOrder'
            defaultValue=''
            onChange={({ target }) => handleOrder({ target, dispatch, sortValue })}
            className='text-md w-56 rounded-md border-gray-400 bg-gray-700 px-3 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500'
          >
            <option
              disabled
              defaultChecked
              value=''
              className='bg-gray-400 p-2 text-lg text-white hover:bg-current hover:text-white'
            >
              Select Order
            </option>
            <option
              value='asc'
              className='bg-gray-700 text-lg text-gray-300'
            >
              Ascending
            </option>
            <option
              value='desc'
              className='bg-gray-700 text-lg text-gray-300'
            >
              Descending
            </option>
          </select>

          <button
            onClick={applySort}
            className='w-40 cursor-pointer appearance-none rounded-md bg-white p-1 text-center text-xl font-semibold shadow-md ring-gray-600 ease-in-out hover:bg-gray-300 hover:shadow-lg active:bg-gray-400'
          >
            Apply Sorts
          </button>
        </div>
      </div>
    </div>
  </div>
);

SortCards.propTypes = {
  sortValue: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  applySort: PropTypes.func.isRequired,
};

export default SortCards;

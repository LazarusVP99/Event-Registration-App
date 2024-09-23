import { PropTypes } from 'prop-types';

const SearchBar = ({ filters, search }) => (
  <input
    type='search'
    name={search}
    placeholder={`Search by ${search}...`}
    onChange={({ target }) => filters(target.value)}
    className='block w-full rounded-lg border border-gray-500 bg-white px-4 py-1 md:py-2  text-gray-900 caret-gray-900 ring-gray-600 placeholder:text-base placeholder:text-gray-500 focus:border-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900 sm:w-72 h-6 sm:h-8 md:w-80 md:h-12 text-sm sm:text-base md:text-lg lg:text-xl'
  />
);

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  filters: PropTypes.func.isRequired,
};

export default SearchBar;

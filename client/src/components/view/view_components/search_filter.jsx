import { PropTypes } from 'prop-types';

const SearchBar = ({ filters, search }) => (
  <input
    type='search'
    name={search}
    placeholder={`Search by ${search}...`}
    onChange={({ target }) => filters(target.value)}
    className='block w-60 rounded-lg border border-gray-500 bg-white px-3 py-1 text-gray-900 caret-gray-900 ring-gray-600 placeholder:text-sm placeholder:text-gray-500 focus:border-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900 h-8 text-xs sm:w-72 sm:h-10 sm:px-4 sm:py-2 sm:text-sm sm:placeholder:text-base md:w-80 md:h-12 md:text-lg lg:text-xl'
  />
);

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  filters: PropTypes.func.isRequired,
};

export default SearchBar;

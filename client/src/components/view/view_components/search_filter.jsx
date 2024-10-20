import { PropTypes } from 'prop-types';

const SearchBar = ({ filters, search }) => (
  <input
    type='search'
    name={search}
    placeholder={`Search by ${search}...`}
    onChange={({ target }) => filters(target.value)}
    className='~text-sm/xl block h-10 w-full rounded-lg border border-gray-500 bg-white px-3 py-1 text-gray-900 caret-gray-900 ring-gray-600 placeholder:text-sm placeholder:text-gray-500 focus:border-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900 sm:px-4 sm:py-2 sm:placeholder:text-base md:h-12'
  />
);

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  filters: PropTypes.func.isRequired,
};

export default SearchBar;

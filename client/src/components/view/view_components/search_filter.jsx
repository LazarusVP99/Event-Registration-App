import { PropTypes } from 'prop-types';

const SearchBar = ({ filters, search }) => (
  <input
    type='search'
    name={search}
    placeholder={`Search by ${search}...`}
    onChange={({ target }) => filters(target.value)}
    className='block h-8 w-52 rounded-lg border border-gray-500 bg-white px-4 py-3 text-base text-gray-900 caret-gray-900 ring-gray-600 placeholder:text-lg placeholder:text-gray-500 focus:border-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900 md:h-12 md:w-80 md:text-lg'
  />
);

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  filters: PropTypes.func.isRequired,
};

export default SearchBar;

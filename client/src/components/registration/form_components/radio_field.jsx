import { PropTypes } from 'prop-types';

const RadioField = ({ checked, handleChange, value }) => (
  <div className='flex items-center gap-2'>
    <input
      type='radio'
      name='eventSeeker'
      id={`eventSeeker-${value.toLowerCase().replace(' ', '-')}`}
      value={value}
      checked={checked === value}
      onChange={handleChange}
      className='size-4 cursor-pointer text-blue-600'
    />
    <label
      htmlFor={`eventSeeker-${value.toLowerCase().replace(' ', '-')}`}
      className='text-gray-700'
    >
      {value}
    </label>
  </div>
);

export default RadioField;

RadioField.propTypes = {
  checked: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

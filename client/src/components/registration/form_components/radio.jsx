import { errorMessage } from '../../utils/error_msg';
import { PropTypes } from 'prop-types';
import { useState } from 'react';

const RadioSelect = ({ errors, touched, getFieldProps }) => {
  const [checked, setChecked] = useState('');

  const handleRadioChange = (event) => {
    setChecked(event.target.value);
    getFieldProps('eventSeeker').onChange(event);
  };

  return (
    <div className='mt-2 flex flex-col items-start w-full gap-2'>
      <span className='text-gray-700 text-md'>Where did you hear about this event?</span>
      <div className='flex items-center gap-5 text-md'>
        <div className='flex items-center gap-2'>
          <input
            type='radio'
            name='eventSeeker'
            id='eventSeeker-socialmedia'
            value='Social Media'
            checked={checked === 'Social Media'}
            onChange={handleRadioChange}
            className='cursor-pointer h-4 w-4 text-blue-600'
          />
          <label
            htmlFor='eventSeeker-socialmedia'
            className='text-gray-700'
          >
            Social Media
          </label>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='radio'
            name='eventSeeker'
            id='eventSeeker-friends'
            value='Friends'
            checked={checked === 'Friends'}
            onChange={handleRadioChange}
            className='cursor-pointer h-4 w-4 text-blue-600'
          />
          <label
            htmlFor='eventSeeker-friends'
            className='text-gray-700'
          >
            Friends
          </label>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='radio'
            name='eventSeeker'
            id='eventSeeker-other'
            value='Found Myself'
            checked={checked === 'Found Myself'}
            onChange={handleRadioChange}
            className='cursor-pointer h-4 w-4 text-blue-600'
          />
          <label
            htmlFor='eventSeeker-other'
            className='text-gray-700'
          >
            Found Myself
          </label>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='radio'
            name='eventSeeker'
            id='eventSeeker-other'
            value='Other'
            defaultChecked
            onChange={handleRadioChange}
            className='cursor-pointer h-4 w-4 text-blue-600'
          />
          <label
            htmlFor='eventSeeker-other'
            className='text-gray-700'
          >
            Other
          </label>
        </div>
        {errorMessage({ errors, touched, fieldName: 'eventSeeker' })}
      </div>
    </div>
  );
};

RadioSelect.propTypes = {
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  getFieldProps: PropTypes.func.isRequired,
};

export default RadioSelect;

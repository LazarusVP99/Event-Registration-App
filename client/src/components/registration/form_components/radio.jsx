import { errorMessage } from '../../utils/error_msg';
import RadioField from './radio_field';
import { PropTypes } from 'prop-types';
import { useState } from 'react';

const RadioSelect = ({ errors, touched, getFieldProps }) => {
  const [checked, setChecked] = useState('Other');

  const handleRadioChange = (event) => {
    setChecked(event.target.value);
    getFieldProps('eventSeeker').onChange(event);
  };

  return (
    <div className='mt-2 flex w-full flex-col items-start gap-2'>
      <span className='text-base text-gray-700'>Where did you hear about this event?</span>
      <div className='flex flex-wrap items-center gap-5 text-base'>
        <RadioField
          checked={checked}
          handleChange={handleRadioChange}
          value='Social Media'
        />

        <RadioField
          checked={checked}
          handleChange={handleRadioChange}
          value='Friends'
        />

        <RadioField
          checked={checked}
          handleChange={handleRadioChange}
          value='Found Myself'
        />

        <RadioField
          checked={checked}
          handleChange={handleRadioChange}
          value='Other'
        />

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

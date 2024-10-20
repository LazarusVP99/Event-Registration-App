import 'react-datepicker/dist/react-datepicker.css';

import { errorMessage } from '../../utils/error_msg';
import DatePicker from 'react-datepicker';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { Field } from 'formik';

export const FieldComponent = ({ errors, touched, field, getFieldProps, type }) => (
  <div className='relative'>
    <Field
      name={field}
      type={type ? type : 'text'}
      {...getFieldProps(field)}
      className={`border bg-gray-50 ${
        errors[field] && touched[field]
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
      } block w-full rounded-lg border-gray-600 bg-gray-200 px-4 py-2 text-lg text-gray-900 placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
      placeholder={`Enter your ${field === 'fullName' ? 'name' : field.replace(/([A-Z])/g, '$1').trim()}`}
    />
    {errorMessage({ errors, touched, field })}
  </div>
);
export const DatePickerField = ({ errors, touched, field, setFieldValue }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className='relative w-full'>
      <DatePicker
        name={field}
        selected={startDate}
        onChange={(date) => {
          setFieldValue(field, date);
          setStartDate(date);
        }}
        maxDate={new Date()}
        minDate={new Date(1900, 0, 1)}
        className={`border bg-gray-50 ${
          errors[field] && touched[field]
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        } block w-full rounded-lg border-gray-600 bg-gray-200 px-4 py-2 text-lg text-gray-900 placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
      />
      {errorMessage({ errors, touched, field })}
    </div>
  );
};

FieldComponent.propTypes = {
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  type: PropTypes.string,
  getFieldProps: PropTypes.func.isRequired,
};

DatePickerField.propTypes = {
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

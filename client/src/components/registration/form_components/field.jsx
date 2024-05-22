import { errorMessage } from '../../utils/error_msg';
import { PropTypes } from 'prop-types';
import { Field } from 'formik';

const FieldComponent = ({ errors, touched, field, getFieldProps, type }) => (
  <div className={type === 'date' ? 'relative w-fit' : 'relative'}>
    <Field
      name={field}
      type={type ? type : 'text'}
      {...getFieldProps(field)}
      className={`bg-gray-50 border ${
        errors[field] && touched[field]
          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
      } text-lg rounded-lg block w-full px-4 py-2 bg-gray-200 border-gray-600 placeholder-gray-400 text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      placeholder={`Enter your ${field === 'fullName' ? 'name' : field.replace(/([A-Z])/g, '$1').trim()}`}
    />
    {errorMessage({ errors, touched, field })}
  </div>
);

FieldComponent.propTypes = {
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  type: PropTypes.string,
  getFieldProps: PropTypes.func.isRequired,
};

export default FieldComponent;

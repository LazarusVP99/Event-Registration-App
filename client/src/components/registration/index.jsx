import { PropTypes } from 'prop-types';
import { Form, Formik } from 'formik';

import { Link, useParams } from 'react-router-dom';

import FieldComponent from './form_components/field.jsx';
import { Validation, userSubmission } from './submit.js';
import RadioSelect from './form_components/radio.jsx';

import { useRegisteredUserMutation } from '../../store/api/event.register.js';
const RegistrationForm = ({ dispatch }) => {
  const eventId = useParams();
  const [registerUser] = useRegisteredUserMutation();
  const onSubmitHandler = async (values) => userSubmission({ values, registerUser, dispatch });
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen bg-gray-800 shadow-sm shadow-white'>
      <div className='border border-b-slate-300 rounded-t-md w-full p-5 max-w-lg text-center'>
        <h1 className='text-white text-2xl font-bold'>Event Registration Form</h1>
      </div>
      <Formik
        initialValues={{
          email: '',
          fullName: '',
          eventSeeker: 'Other',
          dateOfBirth: '',
          eventId,
        }}
        validationSchema={Validation}
        onSubmit={onSubmitHandler}
      >
        {({ errors, getFieldProps, touched, handleSubmit, isSubmitting }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className='bg-white rounded-b-md p-8 w-full max-w-lg shadow-lg'
          >
            <div className='space-y-10'>
              <FieldComponent
                errors={errors}
                touched={touched}
                field='fullName'
                getFieldProps={getFieldProps}
              />

              <FieldComponent
                errors={errors}
                touched={touched}
                field='email'
                getFieldProps={getFieldProps}
              />

              <div className='flex gap-8'>
                <span className='text-xl'>Enter your birth date:</span>
                <FieldComponent
                  errors={errors}
                  touched={touched}
                  type='date'
                  field='dateOfBirth'
                  getFieldProps={getFieldProps}
                />
              </div>
            </div>

            <hr className='w-full h-0.5 bg-stone-500 my-8' />

            <RadioSelect
              errors={errors}
              touched={touched}
              getFieldProps={getFieldProps}
            />

            <div className='flex justify-between items-center mt-6'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-gray-800 hover:bg-gray-800/75 text-white font-bold p-2 rounded-md text-lg capitalize disabled:bg-gray-400'
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
              <Link
                to='/'
                className='hover:text-gray-800/75 uppercase text-neutral-900 font-semibold tracking-wide'
              >
                Return to Events
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

RegistrationForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default RegistrationForm;

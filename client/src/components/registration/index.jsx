import { Form, Formik } from 'formik';

import { Link, useParams } from 'react-router-dom';

import { DatePickerField, FieldComponent } from './form_components/field.jsx';
import { Validation, userSubmission } from './submit.js';
import RadioSelect from './form_components/radio.jsx';

import { useRegisteredUserMutation } from '../../store/api/event.register.js';
import { useGetEventByIdQuery } from '../../store/api/events.js';
import Spinner from '../utils/spinner.jsx';

const RegistrationForm = () => {
  const { id } = useParams();
  const [registerUser] = useRegisteredUserMutation();
  const { data: eventsData, isLoading } = useGetEventByIdQuery({ id });

  const onSubmitHandler = async (values) => userSubmission({ values, registerUser });

  const expiredOrActiveEvent = () => (
    <div className='bg-white rounded-b-md p-6 md:p-8 w-full max-w-lg shadow-lg text-center'>
      <p className='text-xl text-red-600 font-bold'>Event has expired or is not active.</p>
      <Link
        to='/'
        className='mt-4 inline-block bg-gray-800 hover:bg-gray-800/75 text-white font-bold p-2 rounded-md text-lg'
      >
        Return to Events
      </Link>
    </div>
  );

  if (isLoading) return <Spinner />;

  return (
    <div className='flex flex-col items-center justify-center w-screen min-h-screen bg-gray-800 shadow-sm shadow-white p-4'>
      <div className='border border-b-slate-300 rounded-t-md w-full p-4 md:p-5 max-w-lg text-center'>
        <h1 className='text-white text-3xl md:text-4xl mt-4 md:mt-6 font-bold text-center'>
          Event Registration Form
        </h1>
      </div>
      {eventsData?.time === 'over' ? (
        expiredOrActiveEvent()
      ) : (
        <Formik
          initialValues={{
            email: '',
            fullName: '',
            eventSeeker: 'Other',
            dateOfBirth: '',
            eventId: id,
          }}
          validationSchema={Validation}
          onSubmit={onSubmitHandler}
        >
          {({ errors, getFieldProps, touched, setFieldValue, handleSubmit, isSubmitting }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              className='bg-white rounded-b-md p-6 md:p-8 w-full max-w-lg shadow-lg'
            >
              <div className='space-y-6 md:space-y-10'>
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

                <div className='flex flex-col md:flex-row md:items-start justify-normal'>
                  <span className='text-lg md:text-xl w-[390px] mt-2'>Enter your birth date:</span>
                  <DatePickerField
                    field='dateOfBirth'
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </div>

              <hr className='w-full h-0.5 bg-stone-500 my-6 md:my-8' />

              <RadioSelect
                errors={errors}
                touched={touched}
                getFieldProps={getFieldProps}
              />

              <div className='flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full md:w-auto bg-gray-800 hover:bg-gray-800/75 text-white font-bold p-2 rounded-md text-lg capitalize disabled:bg-gray-400'
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </button>
                <Link
                  to='/'
                  className='w-full md:w-auto text-center hover:text-gray-800/75 uppercase text-neutral-900 font-semibold tracking-wide'
                >
                  Return to Events
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

// RegistrationForm.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

export default RegistrationForm;

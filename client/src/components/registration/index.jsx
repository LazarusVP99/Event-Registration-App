import { Form, Formik } from 'formik';

import { Link, useParams } from 'react-router-dom';

import { DatePickerField, FieldComponent } from './form_components/field.jsx';
import { Validation, userSubmission } from './submit.js';
import RadioSelect from './form_components/radio.jsx';

import {
  useGetRegisteredEventMembersQuery,
  useRegisteredUserMutation,
} from '../../store/api/event.register.js';
import { useGetEventByIdQuery } from '../../store/api/events.js';
import Spinner from '../utils/spinner.jsx';

const RegistrationForm = () => {
  const { id } = useParams();
  const [registerUser] = useRegisteredUserMutation();
  const { data: eventsData, isLoading } = useGetEventByIdQuery({ id });
  const { refetch } = useGetRegisteredEventMembersQuery({
    eventId: id,
  });

  const onSubmitHandler = async (values) => userSubmission({ values, registerUser, refetch });

  const expiredOrActiveEvent = () => (
    <div className='w-full max-w-lg rounded-b-md bg-white p-6 text-center shadow-lg md:p-8'>
      <p className='text-xl font-bold text-red-600'>Event has expired or is not active.</p>
      <Link
        to='/'
        className='mt-4 inline-block rounded-md bg-gray-800 p-2 text-lg font-bold text-white hover:bg-gray-800/75'
      >
        Return to Events
      </Link>
    </div>
  );

  if (isLoading) return <Spinner />;

  return (
    <div className='flex min-h-screen w-screen flex-col items-center justify-center bg-gray-800 p-4 shadow-sm shadow-white'>
      <div className='w-full max-w-lg rounded-t-md border border-b-slate-300 p-4 text-center md:p-5'>
        <h1 className='mt-4 text-center text-3xl font-bold text-white md:mt-6 md:text-4xl'>
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
              className='w-full max-w-lg rounded-b-md bg-white p-6 shadow-lg md:p-8'
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

                <div className='flex flex-col justify-normal md:flex-row md:items-start'>
                  <span className='mt-2 w-[390px] text-lg md:text-xl'>Enter your birth date:</span>
                  <DatePickerField
                    field='dateOfBirth'
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </div>

              <hr className='my-6 h-0.5 w-full bg-stone-500 md:my-8' />

              <RadioSelect
                errors={errors}
                touched={touched}
                getFieldProps={getFieldProps}
              />

              <div className='mt-6 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full rounded-md bg-gray-800 p-2 text-lg font-bold capitalize text-white hover:bg-gray-800/75 disabled:bg-gray-400 md:w-auto'
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </button>
                <Link
                  to='/'
                  className='w-full text-center font-semibold uppercase tracking-wide text-neutral-900 hover:text-gray-800/75 md:w-auto'
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

export default RegistrationForm;

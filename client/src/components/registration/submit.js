import * as Yup from 'yup';
import { setEventData } from '../../store/features/eventData';
import showSwal from '../utils/alerts/message';

export const Validation = Yup.object({
    fullName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[a-zA-Z\s]*$/, 'Only letters are allowed')
        .required('Full Name is required'),
    email: Yup.string()
        .email('Enter valid email')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
        .required('Email is required'),
    eventSeeker: Yup.string().required('Event seeker is required'),
    dateOfBirth: Yup
        .date()
        .required('Date of birth is required')
        .nullable()
        .max(new Date(), 'Date of birth cannot be in the future')
        .min(new Date('1900-01-01'), 'You can not be that old'),
});

export const userSubmission = async ({ values, registerUser, dispatch }) => {
    const { eventId } = values;
    const { fullName, email, eventSeeker, dateOfBirth } = values;

    try {
        if (eventId) {
            await registerUser({
                fullName, email, eventSeeker, dateOfBirth, eventId,
            }).unwrap();

            dispatch(setEventData({
                eventId,
                registeredUsers: [fullName],
            }));

            showSwal({
                title: 'Successfully registered on event',
                text: 'Registration successful.',
                icon: 'success',
            });

            location.reload();

        } else {
            showSwal({
                title: 'Error',
                text: 'Event ID is required for registration.',
                icon: 'error',
            });
        }
    } catch (error) {
        showSwal({
            title: 'Registration Failed',
            text: 'An unexpected error occurred during registration. Please try again later',
            icon: 'error',
        });
    }
};
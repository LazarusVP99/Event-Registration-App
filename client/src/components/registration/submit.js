import * as Yup from 'yup';
import { setEventData } from '../../store/features/eventData';
import showSwal from '../utils/alerts/message';

export const Validation = Yup.object({
    fullName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Full Name is required'),
    email: Yup.string()
        .email('Enter valid email')
        .required('Email is required'),
    eventSeeker: Yup.string().required('Event seeker is required'),
    dateOfBirth: Yup
        .string()
        .required('Date of birth is required'),
});

export const userSubmission = async ({ values, registerUser, dispatch }) => {
    const { eventId } = values;
    const { fullName, email, eventSeeker, dateOfBirth } = values;
    try {
        console.log(values);

        if (eventId) {
            await registerUser({
                fullName, email, eventSeeker, dateOfBirth, eventId,
            }).unwrap();

            location.reload();

            dispatch(setEventData({
                eventId,
                registeredUsers: [fullName],
            }));

            showSwal({
                title: 'Successfully registered on event',
                text: 'Registration successful.',
                icon: 'success',
            });

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
            text: 'An unexpected error occurred during registration. Please try again later.',
            icon: 'error',
        });
    }
};

export const errorMessage = ({ field, touched, errors }) =>
  touched[field] &&
  errors[field] && (
    <span className='absolute left-3 top-10 max-w-[90%] cursor-default truncate pt-[0.37rem] text-sm leading-[1.6] text-red-500'>
      {errors[field]}
    </span>
  );

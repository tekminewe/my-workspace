import { any, string } from 'zod';

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const createFirstNameValidation = () => {
  return string({
    required_error: 'Please enter the first name',
  })
    .trim()
    .min(1, 'The first name must be between 1 and 35 characters')
    .max(35, 'The first name must be between 1 and 35 characters');
};

export const createLastNameValidation = () => {
  return string({
    required_error: 'Please enter the last name',
  })
    .trim()
    .min(1, 'The last name must be between 1 and 35 characters')
    .max(35, 'The last name must be between 1 and 35 characters');
};

export const createEmailValidation = () => {
  return string({
    required_error: 'Please enter an email address',
  }).email({ message: 'Please enter a valid email address' });
};

export const createProfilePhotoValidation = () => {
  return any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    );
};

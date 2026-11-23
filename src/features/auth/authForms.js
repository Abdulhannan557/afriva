import { required, email, minLength, matches } from '@/utils/validators';

// Login and Register share one <AuthForm>; only this config differs.
export const LOGIN_FORM = {
  title: 'Welcome back',
  submitLabel: 'Log in',
  initialValues: { email: '', password: '' },
  fields: [
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
    { name: 'password', label: 'Password', type: 'password', autoComplete: 'current-password' },
  ],
  schema: { email: [required('email'), email], password: [required('password')] },
};

export const REGISTER_FORM = {
  title: 'Create your account',
  submitLabel: 'Create account',
  initialValues: { name: '', email: '', password: '', confirm: '' },
  fields: [
    { name: 'name', label: 'Full name', autoComplete: 'name' },
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
    { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password' },
    { name: 'confirm', label: 'Confirm password', type: 'password', autoComplete: 'new-password' },
  ],
  schema: {
    name: [required('name')],
    email: [required('email'), email],
    password: [required('password'), minLength(8)],
    confirm: [matches('password', 'Passwords do not match')],
  },
};

import { useState, useCallback } from 'react';
import { validate } from '@/utils/validators';

// Generic form state: values, validation, submit lifecycle. Reuse for any form.
export function useForm({ initialValues, schema = {}, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: '' }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(schema, values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSubmitting(true);
    setSubmitError('');
    try { await onSubmit(values); } catch (err) { setSubmitError(err.message); } finally { setSubmitting(false); }
  };

  return { values, errors, submitting, submitError, handleChange, handleSubmit };
}

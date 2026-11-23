import { useId } from 'react';

export default function Input({ label, error, type = 'text', ...rest }) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-err` : undefined} {...rest} />
      {error && <span id={`${id}-err`} className="field__error">{error}</span>}
    </div>
  );
}

import { Link } from 'react-router-dom';

// One button for the whole app. Pass `to` to render a router link with identical styling.
export default function Button({ variant = 'primary', block, loading, to, className = '', children, ...rest }) {
  const cls = ['btn', `btn--${variant}`, block && 'btn--block', className].filter(Boolean).join(' ');
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  return (
    <button className={cls} disabled={loading || rest.disabled} {...rest}>
      {loading ? 'Please wait…' : children}
    </button>
  );
}

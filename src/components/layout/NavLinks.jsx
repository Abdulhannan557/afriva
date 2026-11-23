import { NavLink } from 'react-router-dom';

export default function NavLinks({ items, className = '' }) {
  return (
    <nav className={`navlinks ${className}`}>
      {items.map((i) => (
        <NavLink key={i.to} to={i.to} end={i.end ?? i.to === '/'}>{i.label}</NavLink>
      ))}
    </nav>
  );
}

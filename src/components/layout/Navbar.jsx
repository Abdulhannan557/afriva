import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import NavLinks from '@/components/layout/NavLinks';
import { useAuth } from '@/features/auth/AuthContext';
import { PUBLIC_NAV } from '@/config/navigation';
import { ROUTES } from '@/config/routes';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to={ROUTES.home} className="brand">Afriva</Link>
        <NavLinks items={PUBLIC_NAV} />
        <div className="navbar__actions">
          {isAuthenticated ? (
            <>
              <Button to={ROUTES.dashboard} variant="ghost">Dashboard</Button>
              <Button variant="secondary" onClick={logout}>Log out</Button>
            </>
          ) : (
            <>
              <Button to={ROUTES.login} variant="ghost">Log in</Button>
              <Button to={ROUTES.register}>Sign up</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

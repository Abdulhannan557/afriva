
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth/AuthContext';
import { ROUTES } from '@/config/routes';

export default function DashboardLayout() {
  const { logout } = useAuth();

  const [search, setSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);

  // Receive cart count updates from DashboardPage.
  useEffect(() => {
    const handleCartUpdate = (event) => {
      setCartCount(event.detail);
    };

    window.addEventListener('afriva-cart-update', handleCartUpdate);

    return () => {
      window.removeEventListener('afriva-cart-update', handleCartUpdate);
    };
  }, []);

  // Clear navbar search when dashboard filters are cleared.
  useEffect(() => {
    const handleClearSearch = () => {
      setSearch('');
    };

    window.addEventListener('afriva-search-clear', handleClearSearch);

    return () => {
      window.removeEventListener('afriva-search-clear', handleClearSearch);
    };
  }, []);

  // Update the search input without submitting.
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Submit search when the button is clicked or Enter is pressed.
  const handleSearch = (event) => {
    event.preventDefault();

    window.dispatchEvent(
      new CustomEvent('afriva-search', {
        detail: search.trim(),
      })
    );
  };

  return (
    <div className="store">
      <div className="store__announcement">
        Complimentary delivery on orders over Rs. 5,000
      </div>

      <header className="store__header">
        <div className="store__header-inner">
          <Link to={ROUTES.dashboard} className="store__logo">
            AFRIVA<span>.</span>
            <small>THE ART OF EVERYDAY LIVING</small>
          </Link>

          <form className="store__search" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search products, collections..."
              value={search}
              onChange={handleSearchChange}
              aria-label="Search products"
            />

            <button type="submit" aria-label="Search">
              Search
            </button>
          </form>

          <div className="store__actions">
            <Link
              to={ROUTES.dashboard}
              className="store__action store__cart-action"
              title={`Cart: ${cartCount} items`}
              aria-label={`Shopping cart, ${cartCount} items`}
            >
              <span className="store__cart-icon">🛒</span>
              <small>
                Cart <strong>{cartCount}</strong>
              </small>
            </Link>

            <Link
              to={ROUTES.profile}
              className="store__action"
              title="My account"
            >
              <span>♙</span>
              <small>Account</small>
            </Link>

            <button
              type="button"
              className="store__action store__logout"
              onClick={logout}
              title="Log out"
            >
              <span>↗</span>
              <small>Logout</small>
            </button>
          </div>
        </div>

        <nav className="store__nav">
          <NavLink to={ROUTES.dashboard} end>
            Home
          </NavLink>

          <a href="#collections">Collections</a>
          <a href="#featured-products">Featured</a>
          <a href="#new-arrivals">New Arrivals</a>

          <Link to={ROUTES.profile}>My Profile</Link>
        </nav>
      </header>

      <main className="store__main">
        <Outlet />
      </main>

      <footer className="store__footer">
        <div>
          <Link to={ROUTES.dashboard} className="store__footer-logo">
            AFRIVA.
          </Link>

          <p>Thoughtfully selected. Beautifully lived.</p>
        </div>

        <p>© {new Date().getFullYear()} Afriva. All rights reserved.</p>
      </footer>
    </div>
  );
}

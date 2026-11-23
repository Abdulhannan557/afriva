
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Card from '@/components/ui/Card';
import { useAuth } from '@/features/auth/AuthContext';

const products = [
  {
    id: 1,
    name: 'Classic Everyday Sneakers',
    category: 'Fashion',
    price: 5499,
    oldPrice: 6999,
    rating: '4.8',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=650&q=70',
    tag: 'Bestseller',
  },
  {
    id: 2,
    name: 'Premium Travel Backpack',
    category: 'Accessories',
    price: 3899,
    oldPrice: 4500,
    rating: '4.7',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=650&q=70',
    tag: 'Popular',
  },
  {
    id: 3,
    name: 'Minimal Classic Watch',
    category: 'Accessories',
    price: 7299,
    oldPrice: 8999,
    rating: '4.9',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=650&q=70',
    tag: 'Premium',
  },
  {
    id: 4,
    name: 'Essential Cotton Hoodie',
    category: 'Fashion',
    price: 2799,
    oldPrice: 3499,
    rating: '4.6',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=650&q=70',
    tag: 'New',
  },
];

const categories = [
  { name: 'All', icon: '✦' },
  { name: 'Fashion', icon: '◈' },
  { name: 'Accessories', icon: '◇' },
  { name: 'Electronics', icon: '⌁' },
  { name: 'Home', icon: '⌂' },
];

const orders = [
  {
    id: '#AFR-1024',
    product: 'Classic Everyday Sneakers',
    date: '20 Nov 2026',
    amount: 5499,
    status: 'Delivered',
  },
  {
    id: '#AFR-1023',
    product: 'Premium Travel Backpack',
    date: '18 Nov 2026',
    amount: 3899,
    status: 'Processing',
  },
  {
    id: '#AFR-1022',
    product: 'Minimal Classic Watch',
    date: '15 Nov 2026',
    amount: 7299,
    status: 'Shipped',
  },
];

const formatPrice = (price) =>
  `Rs. ${price.toLocaleString('en-PK')}`;

export default function DashboardPage() {
  const { user } = useAuth();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [wishlist, setWishlist] = useState([2, 3]);
  const [cartCount, setCartCount] = useState(0);
  const [searchRequest, setSearchRequest] = useState(0);

  const firstName = user?.name?.split(' ')[0] || 'Customer';

  // Receive search only when the navbar form is submitted.
  useEffect(() => {
    const handleSearch = (event) => {
      setSearch(event.detail || '');
      setCategory('All');
      setSearchRequest((current) => current + 1);
    };

    window.addEventListener('afriva-search', handleSearch);

    return () => {
      window.removeEventListener('afriva-search', handleSearch);
    };
  }, []);

  // Scroll to products only after search is submitted.
  useEffect(() => {
    if (searchRequest === 0) return;

    document.getElementById('featured-products')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [searchRequest]);

  // Send cart count updates to the navbar.
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('afriva-cart-update', {
        detail: cartCount,
      })
    );
  }, [cartCount]);

  // Filter products by name, category, and tag.
  const filteredProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === 'All' || product.category === category;

      const searchableText = [
        product.name,
        product.category,
        product.tag,
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = searchableText.includes(searchTerm);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  // Clear search and category filters.
  const clearFilters = () => {
    setSearch('');
    setCategory('All');

    window.dispatchEvent(
      new CustomEvent('afriva-search-clear')
    );
  };

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const addToCart = () => {
    setCartCount((count) => count + 1);
  };

  return (
    <div className="shop-dashboard">

      {/* WELCOME */}
      <section className="shop-welcome">
        <div className="shop-welcome__text">
          <span className="shop-eyebrow">
            YOUR AFRIVA EXPERIENCE
          </span>

          <h1>Welcome back, {firstName}.</h1>

          <p>
            Discover something beautiful for your everyday life.
          </p>
        </div>
      </section>

      {/* SHOPPING HERO - NO CLOTHING IMAGE */}
      <section className="shop-hero shop-hero--text-only">
        <div className="shop-hero__content">
          <span className="shop-hero__eyebrow">
            THE NEW AFRIVA COLLECTION
          </span>

          <h2>
            Find your next
            <br />
            favourite thing.
          </h2>

          <p>
            Thoughtfully selected products, timeless style
            and everyday essentials — all in one place.
          </p>

          <a
            href="#featured-products"
            className="shop-hero-button"
          >
            Explore collection <span>→</span>
          </a>
        </div>
      </section>

      {/* SHOPPING STATISTICS */}
      <section className="shop-stats">
        <Card className="shop-stat-card">
          <div className="stat-icon green">↗</div>

          <div>
            <span>Total Orders</span>
            <h3>12</h3>
            <small>Your shopping history</small>
          </div>
        </Card>

        <Card className="shop-stat-card">
          <div className="stat-icon gold">⌁</div>

          <div>
            <span>In Progress</span>
            <h3>2</h3>
            <small>Orders being processed</small>
          </div>
        </Card>

        <Card className="shop-stat-card">
          <div className="stat-icon blue">✓</div>

          <div>
            <span>Delivered</span>
            <h3>8</h3>
            <small>Successfully delivered</small>
          </div>
        </Card>

        <Card className="shop-stat-card">
          <div className="stat-icon pink">♡</div>

          <div>
            <span>Wishlist</span>
            <h3>{wishlist.length}</h3>
            <small>Saved products</small>
          </div>
        </Card>
      </section>

      {/* CATEGORIES */}
      <section className="shop-section" id="collections">
        <div className="shop-section-heading">
          <div>
            <span className="shop-eyebrow">EXPLORE AFRIVA</span>
            <h2>Shop by category.</h2>
            <p>Discover something that matches your style.</p>
          </div>
        </div>

        <div className="shop-categories">
          {categories.map((item) => (
            <button
              key={item.name}
              type="button"
              className={`shop-category ${
                category === item.name ? 'active' : ''
              }`}
              onClick={() => setCategory(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section
        className="shop-section"
        id="featured-products"
      >
        <div className="shop-section-heading shop-products-heading">
          <div>
            <span className="shop-eyebrow">
              HANDPICKED FOR YOU
            </span>

            <h2>Featured products.</h2>

            <p>
              Discover products worth adding to your collection.
            </p>
          </div>

          <div className="shop-search-actions">
            <span className="product-count">
              {filteredProducts.length} products
            </span>

            {(search.trim() || category !== 'All') && (
              <button
                type="button"
                className="shop-filter-clear"
                onClick={clearFilters}
              >
                Clear filters ✕
              </button>
            )}
          </div>
        </div>

        <div className="shop-products">
          {filteredProducts.map((product) => (
            <article
              className="shop-product-card"
              key={product.id}
            >
              <div className="shop-product-image">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                />

                <span className="product-tag">
                  {product.tag}
                </span>

                <button
                  type="button"
                  className={`wishlist-button ${
                    wishlist.includes(product.id)
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={
                    wishlist.includes(product.id)
                      ? 'Remove from wishlist'
                      : 'Add to wishlist'
                  }
                >
                  {wishlist.includes(product.id) ? '♥' : '♡'}
                </button>
              </div>

              <div className="shop-product-info">
                <span className="product-category">
                  {product.category}
                </span>

                <h3>{product.name}</h3>

                <div className="product-rating">
                  <span>★</span> {product.rating}
                </div>

                <div className="product-price">
                  <strong>
                    {formatPrice(product.price)}
                  </strong>

                  <del>
                    {formatPrice(product.oldPrice)}
                  </del>
                </div>

                <button
                  type="button"
                  className="add-cart-button"
                  onClick={addToCart}
                >
                  + Add to cart
                </button>
              </div>
            </article>
          ))}

          {filteredProducts.length === 0 && (
            <div className="shop-empty">
              <span>⌕</span>

              <h3>No products found</h3>

              <p>Try another search or category.</p>

              <button
                type="button"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* EDITORIAL PROMOTION - NO CLOTHING IMAGE */}
      <section className="shop-editorial shop-editorial--text-only">
        <div className="shop-editorial__content">
          <span className="shop-eyebrow">
            THE ART OF EVERYDAY LIVING
          </span>

          <h2>
            Thoughtfully selected.
            <br />
            Beautifully lived.
          </h2>

          <p>
            Find products that bring quality, style and
            inspiration into your everyday routine.
          </p>

          <Link
            to="/about"
            className="shop-editorial-link"
          >
            Discover our story →
          </Link>
        </div>
      </section>

      {/* RECENT ORDERS */}
      <section className="shop-section">
        <div className="shop-section-heading">
          <div>
            <span className="shop-eyebrow">
              YOUR PURCHASES
            </span>

            <h2>Recent orders.</h2>
          </div>

          <span className="product-count">
            Latest activity
          </span>
        </div>

        <Card className="orders-card">
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.id}</strong>
                    </td>

                    <td>{order.product}</td>
                    <td>{order.date}</td>
                    <td>{formatPrice(order.amount)}</td>

                    <td>
                      <span
                        className={`order-status ${
                          order.status.toLowerCase()
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* ACCOUNT INFORMATION */}
      <section className="shop-account">
        <div className="shop-account__heading">
          <span className="shop-eyebrow">
            YOUR ACCOUNT
          </span>

          <h2>Your Afriva account.</h2>

          <p>Manage your personal shopping information.</p>
        </div>

        <div className="shop-account-details">
          <div className="account-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>

          <div className="account-user-info">
            <strong>{user?.name || 'Customer'}</strong>

            <span>
              {user?.email || 'No email available'}
            </span>

            <span className="verified-label">
              ✓ Email verified
            </span>
          </div>

          <Link
            to="/dashboard/profile"
            className="account-link"
          >
            View profile →
          </Link>
        </div>
      </section>

      <footer className="shop-footer">
        © {new Date().getFullYear()} Afriva. Your everyday shopping destination.
      </footer>
    </div>
  );
}

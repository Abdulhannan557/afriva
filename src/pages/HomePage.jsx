
import { Link } from 'react-router-dom';
import { HERO, FEATURES } from '@/data/home';
import { ROUTES } from '@/config/routes';

const categories = [
  {
    number: '01',
    name: 'Fashion',
    description: 'Everyday style, thoughtfully selected.',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=65',
  },
  {
    number: '02',
    name: 'Accessories',
    description: 'The details that make a difference.',
    image:
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=600&q=65',
  },
  {
    number: '03',
    name: 'Lifestyle',
    description: 'Bring inspiration into everyday living.',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=65',
  },
];

export default function HomePage() {
  return (
    <div className="home-page">

      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero__content">
          <span className="home-eyebrow">
            WELCOME TO AFRIVA
          </span>

          <h1>
            {HERO.title || 'Discover your style.'}
          </h1>

          <p>
            {HERO.text ||
              'Explore thoughtfully selected products that bring style, quality and inspiration into your everyday life.'}
          </p>

          <div className="home-hero__actions">
            <Link to={ROUTES.dashboard} className="home-button">
              Shop Collection <span>→</span>
            </Link>

            <Link to={ROUTES.about} className="home-text-link">
              Discover Afriva
            </Link>
          </div>

          <div className="home-hero__note">
            <span></span>
            A better way to discover everyday essentials
          </div>
        </div>

        <div className="home-hero__image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1100&q=75"
            alt="Modern lifestyle shopping collection"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />

          <div className="home-image-label">
            <span>THE AFRIVA EDIT</span>
            <strong>Everyday, elevated.</strong>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="home-categories" id="collections">
        <div className="home-section-heading">
          <div>
            <span className="home-eyebrow">EXPLORE AFRIVA</span>
            <h2>Find your favourites.</h2>
          </div>

          <Link to={ROUTES.dashboard} className="home-view-link">
            Explore all collections →
          </Link>
        </div>

        <div className="home-category-grid">
          {categories.map((category) => (
            <Link
              to={ROUTES.dashboard}
              className="home-category-card"
              key={category.number}
            >
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                decoding="async"
              />

              <div className="home-category-overlay">
                <span>{category.number}</span>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <strong>Explore →</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Editorial banner */}
      <section className="home-editorial">
        <div className="home-editorial__image">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=65"
            alt="Curated fashion and lifestyle products"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="home-editorial__content">
          <span className="home-eyebrow">
            THE ART OF EVERYDAY LIVING
          </span>

          <h2>
            Good choices.
            <br />
            Beautiful living.
          </h2>

          <p>
            We believe everyday products should be more than
            ordinary. Discover a collection built around style,
            practicality and thoughtful choices.
          </p>

          <Link to={ROUTES.about} className="home-editorial-link">
            Our story <span>→</span>
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="home-benefits">
        <div className="home-section-heading home-benefits__heading">
          <div>
            <span className="home-eyebrow">
              THE AFRIVA EXPERIENCE
            </span>
            <h2>Shopping made more meaningful.</h2>
          </div>
        </div>

        <div className="home-benefits-grid">
          {FEATURES.map((feature, index) => (
            <article className="home-benefit-card" key={feature.id}>
              <span>0{index + 1}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="home-cta">
        <span className="home-eyebrow">
          YOUR NEXT FAVOURITE AWAITS
        </span>

        <h2>
          Make everyday
          <br />
          a little more special.
        </h2>

        <p>Discover something you'll love with Afriva.</p>

        <Link
          to={ROUTES.dashboard}
          className="home-button home-button--gold"
        >
          Start Exploring <span>→</span>
        </Link>
      </section>

    </div>
  );
}

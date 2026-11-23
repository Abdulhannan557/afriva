
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero__content">
          <span className="about-eyebrow">THE AFRIVA STORY</span>
          <h1>
            Everyday living,
            <br />
            <span>beautifully elevated.</span>
          </h1>
          <p>
            We believe the things you choose should reflect who
            you are. Afriva brings together thoughtful selections,
            timeless style and everyday essentials.
          </p>
          <Link to={ROUTES.dashboard} className="about-button">
            Explore our collection →
          </Link>
        </div>

        <div className="about-hero__image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
            alt="Modern retail store"
          />
        </div>
      </section>

      <section className="about-intro">
        <span className="about-eyebrow">WHO WE ARE</span>
        <h2>More than shopping.<br />It's a way of living.</h2>
        <p>
          Afriva is built around a simple idea: finding the right
          things should be an enjoyable experience. We bring
          together quality, style and practicality in one
          thoughtfully designed shopping destination.
        </p>
      </section>

      <section className="about-story">
        <div className="about-story__image">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000"
            alt="Fashion and lifestyle collection"
          />
        </div>

        <div className="about-story__content">
          <span className="about-eyebrow">OUR PHILOSOPHY</span>
          <h2>Thoughtfully selected.<br />Beautifully lived.</h2>
          <p>
            Great products should be useful, thoughtfully designed
            and worth bringing into your everyday life.
          </p>
          <p>
            Our vision is to make discovering products simple,
            inspiring and enjoyable.
          </p>
        </div>
      </section>

      <section className="about-values">
        <div className="about-values__heading">
          <span className="about-eyebrow">WHAT DEFINES US</span>
          <h2>The Afriva standard.</h2>
          <p>The principles behind the experience we want to create.</p>
        </div>

        <div className="about-values__grid">
          <article className="about-value-card">
            <span>01</span>
            <h3>Thoughtful Selection</h3>
            <p>Products chosen with attention to style, usefulness and everyday value.</p>
          </article>

          <article className="about-value-card">
            <span>02</span>
            <h3>Quality First</h3>
            <p>A good shopping experience starts with products worth discovering.</p>
          </article>

          <article className="about-value-card">
            <span>03</span>
            <h3>Customer Experience</h3>
            <p>A simple, welcoming and enjoyable way to explore and shop.</p>
          </article>
        </div>
      </section>

      <section className="about-cta">
        <span className="about-eyebrow">DISCOVER AFRIVA</span>
        <h2>Find something<br />that feels like you.</h2>
        <p>Explore our collections and discover your next everyday favourite.</p>
        <Link to={ROUTES.dashboard} className="about-button">
          Shop Afriva →
        </Link>
      </section>
    </div>
  );
}

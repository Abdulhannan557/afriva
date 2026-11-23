// Consistent vertical rhythm and width for every page section.
export default function Section({ title, children, className = '' }) {
  return (
    <section className={`section ${className}`}>
      <div className="container">
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  );
}

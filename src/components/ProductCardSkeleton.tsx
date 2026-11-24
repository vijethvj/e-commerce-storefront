export default function ProductCardSkeleton() {
  return (
    <div className="product-card">
      <div className="skeleton skeleton-image" />
      <div className="product-card__body">
        <div className="skeleton skeleton-text skeleton-text--short" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text skeleton-text--medium" />
        <div className="skeleton skeleton-text skeleton-text--price" />
      </div>
    </div>
  );
}

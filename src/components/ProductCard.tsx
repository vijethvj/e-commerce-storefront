import { Link } from 'react-router-dom';
import type { Product } from '../types/product';

import { formatPrice } from '../utils/formatPrice';
import { getOriginalPrice } from '../utils/getOriginalPrice';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, title, thumbnail, price, discountPercentage, rating, brand, stock } = product;

  const originalPrice = getOriginalPrice(price, discountPercentage);
  const isOutOfStock = stock === 0;
  const formattedRating = rating.toFixed(1);

  return (
    <Link to={`/products/${id}`} className="product-card">
      <div className="product-card__media">
        <img loading="lazy" src={thumbnail} alt={title} className="product-card__image" />
        {isOutOfStock && <span className="product-card__badge">Out of Stock</span>}
      </div>

      <div className="product-card__body">
        {brand && <p className="product-card__brand">{brand}</p>}

        <h3 className="product-card__title">{title}</h3>

        <p className="product-card__rating">
          <span aria-hidden="true">★ {formattedRating}</span>
          <span className="visually-hidden">Rated {formattedRating} out of 5</span>
        </p>

        <p className="product-card__pricing">
          <span className="product-card__price">{formatPrice(price)}</span>
          {originalPrice !== null && (
            <del className="product-card__original-price">
              <span className="visually-hidden">Original price: </span>
              {formatPrice(originalPrice)}
            </del>
          )}
        </p>
      </div>
    </Link>
  );
}

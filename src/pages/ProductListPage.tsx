import { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { fetchProducts } from '../api/products';

import ProductCard from '../components/ProductCard';

import ProductCardSkeleton from '../components/ProductCardSkeleton';

const SKELETON_COUNT = 8;

type Status = 'loading' | 'success' | 'error';

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>();
  const [reloadKey, setReloadKey] = useState(0); //bump to refetch

  useEffect(() => {
    const controller = new AbortController();

    fetchProducts(controller.signal)
      .then((data) => {
        setProducts(data.products);
        setStatus('success');
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Something went wrong');
        setStatus('error');
      });

    //Cleanup: cancel the request if the component unmounts
    return () => controller.abort();
  }, [reloadKey]);

  function handleRetry() {
    setStatus('loading');
    setError(null);
    setReloadKey((k) => k + 1);
  }

  if (status === 'loading') {
    return (
      <div role="status">
        <span className="visually-hidden">Loading products…</span>
        <ul className="product-grid" aria-hidden="true">
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <li key={i}>
              <ProductCardSkeleton />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div role="alert">
        <p>{error}</p>
        <button onClick={handleRetry}>Try Again</button>
      </div>
    );
  }

  if (products.length === 0) {
    return <p>No Products Found.</p>;
  }

  return (
    <>
      <ul className="product-grid">
        {products.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </>
  );
}

import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { fetchProducts } from "../api/products";

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
        console.log(data.products);
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
    return <p role="status">Loading Products...</p>;
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
    return <p>No Products Found.</p>
  }


  return (
    <>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.title} - ${p.price}
          </li>
        ))}
      </ul>
    </>
  );
}

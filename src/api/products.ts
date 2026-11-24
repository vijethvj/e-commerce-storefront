import type { ProductResponse } from '../types/product';

const BASE_URL = 'https://dummyjson.com';

export async function fetchProducts(signal?: AbortSignal): Promise<ProductResponse> {
    const res = await fetch(`${BASE_URL}/products?limit=20`, {signal});

    //fetch does NOT throw on 404/500
    if (!res.ok) {
        throw new Error(`Failed to fetch products (status ${res.status})`);
    }

    return res.json();
}
/**
 * Works out the pre-discount price from the current (discounted) price.
 * Returns null when there is no valid discount, so callers can skip rendering it.
 */
export function getOriginalPrice(price: number, discountPercentage: number): number | null {
  if (discountPercentage <= 0 || discountPercentage >= 100) return null;

  const originalPrice = price / (1 - discountPercentage / 100);
  return Math.round(originalPrice * 100) / 100;
}

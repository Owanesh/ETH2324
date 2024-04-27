// types.ts

export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  price: string;
  description: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  slug: string; // Add the slug property
}

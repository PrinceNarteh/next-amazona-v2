export type Product = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  banner: string;
  price: string;
  brand: string;
  description: string;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  colors?: string[];
  sizes?: string[];
};

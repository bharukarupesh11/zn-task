import { Category } from './category';

export interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: Category;
}

import {Brand} from './brand';
import {Company} from './company';
import {Category} from './category';

export interface Article {
  id: number;
  name: string;
  content: number;
  unit: number;
  brand: Brand;
  manufacturer: Company;
  categories: Category[];
  createdAt: Date;
  updatedAt?: Date;
}

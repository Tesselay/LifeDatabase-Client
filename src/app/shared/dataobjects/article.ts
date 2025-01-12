import {Brand} from './brand';
import {Company} from './company';
import {Category} from './category';
import {Unit} from './unit';

export interface Article {
  id: number;
  name: string;
  content: number;
  unit: Unit;
  brand: Brand;
  manufacturer: Company;
  categories: Category[];
  createdAt: Date;
  updatedAt?: Date;
}

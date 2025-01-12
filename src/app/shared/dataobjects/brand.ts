import {Company} from './company';

export interface Brand {
  id: number;
  name: string;
  company: Company;
  createdAt: Date;
  updatedAt?: Date;
}

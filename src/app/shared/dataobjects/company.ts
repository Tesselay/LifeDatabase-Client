export interface Company {
  id: number;
  name: string;
  parent?: Company[];
  child?: Company[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface Company {
  id: number;
  name: string;
  parentCompanies?: Company[];
  childCompanies?: Company[];
}

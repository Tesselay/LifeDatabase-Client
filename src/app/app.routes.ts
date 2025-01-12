import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import {CompaniesComponent} from './companies/companies.component';

export const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticlesComponent },
  { path: 'companies', component: CompaniesComponent }
];

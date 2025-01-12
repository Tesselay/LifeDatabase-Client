import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';

export const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticlesComponent }
];

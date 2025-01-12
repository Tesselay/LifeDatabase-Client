import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'Artikel', component: ArticlesComponent }
];

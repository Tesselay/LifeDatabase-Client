import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet, Routes} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {CommonModule} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, MatToolbar, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LifeDatabase Client';
  routes: Routes;
  console: any = console;

  constructor(private router: Router) {
    this.routes = this.router.config;
    this.routes = this.router.config.filter(route => !route.redirectTo);
  }
}

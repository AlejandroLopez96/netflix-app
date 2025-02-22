import { Component, computed, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './layout/hero/hero.component';
import { MoviesService } from './features/movies/movies.service';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  imports: [RouterOutlet, HeroComponent, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  private readonly _moviesService = inject(MoviesService);
  heroMovie = computed(() => this._moviesService.selectedMovie());

  showGoTopButton = false;

  goTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.showGoTopButton = window.scrollY > 100;
  }
}

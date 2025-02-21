import { Component, computed, HostListener, inject } from '@angular/core';
import { MoviesService } from './movies.service';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  imports: [RouterLink, MovieCardComponent],
  templateUrl: './movies.component.html'
})
export class MoviesComponent {

  isLoading = computed(() => this._moviesService.isLoading());
  hasMorePages = computed(() => this._moviesService.hasMorePages());

  private readonly _moviesService = inject(MoviesService);

  readonly movies = this._moviesService.movies;

  @HostListener('window:scroll')
  onScroll(): void {
    // TODO loading hasMorePages
    if (this.isLoading() || !this.hasMorePages()) { return; }

    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollThreshold = document.documentElement.scrollHeight;

    if (scrollPosition >= scrollThreshold) {
      this._moviesService.getMovies();
    }
  }

}

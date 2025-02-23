import { Component, inject, linkedSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { MoviesService } from '../../../features/movies/movies.service';
import { Movie } from '../../../features/movies/models/movies.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [DatePipe],
  templateUrl: './search.component.html'
})
export class SearchComponent {

  searchQuery = signal<string>('');

  private readonly _router = inject(Router);
  private readonly _moviesService = inject(MoviesService);

  filteredMovies = rxResource({
    request: this.searchQuery,
    loader: () => this._moviesService.searchMovie(this.searchQuery())
  });

  movies = linkedSignal(() => this.filteredMovies.value()?.results ?? ([] as Movie[]));

  onSearchInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.searchQuery.set(input);
  }

  goToDetails(movieId: number): void {
    this._router.navigate(['/movies', movieId]);
    this._clearQuery();
  }

  getImageUrl(posterPath: string): string {
    return posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}`: './assets/no_image.png';
  }

  private _clearQuery(): void {
    this.searchQuery.set('');
  }

}

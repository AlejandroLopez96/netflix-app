import { inject, Injectable, signal } from '@angular/core';
import { Movie, MovieResponse } from './models/movies.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movies = signal<Movie[]>([]);
  trendingMovies = signal<Movie[]>([]);
  selectedMovie = signal<Movie | null>(null);

  currentPage = signal<number>(1);
  hasMorePages = signal<boolean>(true);
  isLoading = signal<boolean>(false);

  private readonly apiKey = '';
  private readonly apiUrl = 'https://api.themoviedb.org/3';
  // private readonly _searchTerm = signal<string>('');

  private readonly _http = inject(HttpClient);

  constructor() {
    this.getMovies();
    this.getTrending();
  }

  // TODO: Implement interceptor to handle API key
  getMovieId(movieId: number): Observable<MovieResponse> {
    return this._http.get<MovieResponse>(`${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}`);
  }

  getMovies(): void {
    this._http
      .get<MovieResponse>(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}`)
      .pipe(
        tap((movies: MovieResponse) => {
          const currentMovies = this.movies();
          this.movies.set([...currentMovies, ...movies.results]);
          this.hasMorePages.set(movies.page < movies.total_pages);
          this.currentPage.update((currentPage) => currentPage + 1);
          this.isLoading.set(false);
        })
      )
      .subscribe();
  }

  getTrending(): void {
    this._http
      .get<MovieResponse>(`${this.apiUrl}/trending/movie/day?api_key=${this.apiKey}`)
      .pipe(
        tap((movies: MovieResponse) => this.trendingMovies.set(movies.results)),
        tap(() => this.setRandomMovie())
      )
      .subscribe();
  }

  setRandomMovie(): void {
    const trandingLength = this.trendingMovies().length;
    const randomIndex = this._getRandomInt(0, trandingLength);
    const randomMovie = this.trendingMovies()[randomIndex];
    this.selectedMovie.set(randomMovie);
  }

  private _getRandomInt(min = 0, max = 50): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}

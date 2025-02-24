import { Component, inject, linkedSignal, model, signal } from '@angular/core';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { MoviesService } from '../../../features/movies/movies.service';
import { Movie } from '../../../features/movies/models/movies.interface';
import { DatePipe } from '@angular/common';
import { ImageService } from '../../../shared/image.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [DatePipe, FormsModule],
  templateUrl: './search.component.html'
})
export class SearchComponent {

  searchQuery = model<string>('');

  private readonly _router = inject(Router);
  private readonly _moviesService = inject(MoviesService);
  private readonly  _imageService = inject(ImageService);

  filteredMovies = rxResource({
    request: this.searchQuery,
    loader: () => this._moviesService.searchMovie(this.searchQuery())
  });

  movies = linkedSignal(() => this.filteredMovies.value()?.results ?? ([] as Movie[]));

  goToDetails(movieId: number): void {
    this._router.navigate(['/movies', movieId]);
    this._clearQuery();
  }

  getImageUrl(posterPath: string): string {
    return this._imageService.getImageUrl(posterPath);
  }

  private _clearQuery(): void {
    this.searchQuery.set('');
  }

}

import { Component, input } from '@angular/core';
import { Movie } from '../models/movies.interface';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent {

  movie = input.required<Movie>();
  imageError = false;

  getImgUrl(): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return this.imageError ? '/placeholder.svg' : `${baseUrl}${this.movie().poster_path}`;
  }

  setImageError(value: boolean): void {
    this.imageError = value;
  }

}

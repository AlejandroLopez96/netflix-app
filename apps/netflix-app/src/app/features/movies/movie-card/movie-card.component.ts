import { Component, inject, input } from '@angular/core';
import { Movie } from '../models/movies.interface';
import { ImageService } from '../../../shared/image.service';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent {

  movie = input.required<Movie>();
  imageError = false;

  private readonly _imageService = inject(ImageService);

  getImgUrl(): string {
    return this.imageError ? '/placeholder.svg' : this._imageService.getImageUrl(this.movie().poster_path);
  }

  setImageError(value: boolean): void {
    this.imageError = value;
  }

}

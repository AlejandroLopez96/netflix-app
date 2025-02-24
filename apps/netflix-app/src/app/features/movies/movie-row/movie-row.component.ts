import { Component, inject, input } from '@angular/core';
import { Movie } from '../models/movies.interface';
import { ImageService } from '../../../shared/image.service';

@Component({
  selector: 'app-movie-row',
  imports: [],
  templateUrl: './movie-row.component.html'
})
export class MovieRowComponent {

  title = input<string>("Trending");
  movies = input.required<Movie[]>();

  private readonly _imageService = inject(ImageService);

  getImgUrl(posterPath: string): string {
    return this._imageService.getImageUrl(posterPath);
  }

}

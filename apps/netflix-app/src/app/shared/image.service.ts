import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  private readonly DEFAULT_POSTER_PATH = '/assets/images/no_image.png';

  getImageUrl(posterPath: string | null): string {
    if (!posterPath) {
      return this.DEFAULT_POSTER_PATH;
    }
    return `${this.IMAGE_BASE_URL}${posterPath}`;
  }

}

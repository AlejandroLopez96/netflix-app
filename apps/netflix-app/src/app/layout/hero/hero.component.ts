import { Component, input } from '@angular/core';
import { Movie } from '../../features/movies/models/movies.interface';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html'
})
export class HeroComponent {

  movie = input.required<Movie>();

}

import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { switchMap} from 'rxjs';
import { CommonModule } from '@angular/common';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule,
            RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  constructor(private dataService: GetDataService) {}

  private activatedRoute = inject(ActivatedRoute);
  
  movieDetails = this.activatedRoute.params.pipe(switchMap((params) => {
    return this.dataService.getMovieDetails(Number(params['id']))
  }))
  
}

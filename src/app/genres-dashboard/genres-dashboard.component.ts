import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { FormsModule } from '@angular/forms';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { HorizontalScrollDirective } from '../horizontal-scroll.directive';
import { RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-genres-dashboard',
  standalone: true,
  imports: [CommonModule, 
            FormsModule,
            MovieCardComponent,
            HorizontalScrollDirective,
            RouterLink,],

  templateUrl: './genres-dashboard.component.html',
  styleUrl: './genres-dashboard.component.css'
})
export class GenresDashboardComponent {
  constructor(private dataService: GetDataService) {}

  genresData = this.dataService.genreMovieApiData();
  
}





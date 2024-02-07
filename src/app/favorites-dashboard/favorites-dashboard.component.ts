import { Component } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites-dashboard',
  standalone: true,
  imports: [MovieCardComponent,
            CommonModule,
            FormsModule,],
  templateUrl: './favorites-dashboard.component.html',
  styleUrl: './favorites-dashboard.component.css'
})
export class FavoritesDashboardComponent {
  constructor(public dataService: FavoritesService) {}

  favoriteMovieApiData = this.dataService.favoriteMovieApiData();
  
  toggleFavorite(movieId:any) {
    this.dataService.toggleFavorite(movieId);
  }

}

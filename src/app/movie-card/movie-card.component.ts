import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule,
            RouterLink,
            RouterLinkActive],
            
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {

  constructor(public dataService:FavoritesService) {}

  @Input('movieDetails') movieDetails:any;

  toggleFavorite(movieId:any) {
    this.dataService.toggleFavorite(movieId);
  }
  
}

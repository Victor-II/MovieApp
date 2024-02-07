import { Component, inject,} from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, switchMap,} from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-dashboard',
  standalone: true,
  imports: [CommonModule,
            FormsModule,
            MovieCardComponent],
  templateUrl: './category-dashboard.component.html',
  styleUrl: './category-dashboard.component.css'
})

export class CategoryDashboardComponent {
  constructor(private dataService: GetDataService) {
  }

  currentPage:number = 1;

  private activatedRoute = inject(ActivatedRoute);
  
  displayText = this.activatedRoute.params.pipe(map((params) => {
    return params['genre'];
  }))

  
  getDisplayData = () => this.activatedRoute.params.pipe(switchMap((params) => {
    return this.dataService.getGenreMovies(params['id'], this.currentPage)
  }))

  incrementPage() {
    this.currentPage += 1;
    this.displayData = this.getDisplayData();
  }

  toFirstPage() {
    this.currentPage = 1;
    this.displayData = this.getDisplayData();
  }

  decrementPage() {
    if (this.currentPage == 1) {}
    else {
      this.currentPage -= 1;
      this.displayData = this.getDisplayData();
    }
  }

  displayData = this.getDisplayData()

}

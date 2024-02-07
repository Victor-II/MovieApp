import { Component } from '@angular/core';
import { GetDataService } from '../services/get-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, switchMap,} from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';


@Component({
  selector: 'app-movie-dashboard',
  standalone: true,
  imports: [CommonModule,
            FormsModule,
            MovieCardComponent],
  templateUrl: './movie-dashboard.component.html',
  styleUrl: './movie-dashboard.component.css'
})
export class MovieDashboardComponent {
  constructor(public dataService: GetDataService, public searchService: SearchService) {}

  currentPage:number = 1;
  switchFlag:number = 0;
  currentSwitchFlag:number = 0;
  displayText:string = '';

  getDisplayData = () => this.searchService.search.pipe(debounceTime(500), switchMap(searchValue => {
    if (searchValue == '') {
      this.currentSwitchFlag = 0;
      this.resetPage();
      this.displayText = 'Trending Movies'
      return this.dataService.trendingMovieApiData(this.currentPage);
    }
    else {
      this.currentSwitchFlag = 1;
      this.resetPage();
      this.displayText = `Results for "${searchValue}"`;
      return this.searchService.getSearchMovie(searchValue, this.currentPage);
    }
  }))

  resetPage = () => {
    if (this.currentSwitchFlag != this.switchFlag) {
      this.currentPage = 1;
      this.switchFlag = this.currentSwitchFlag;
    }
  }

  toFirstPage() {
    this.currentPage = 1;
    this.displayData = this.getDisplayData();
  }

  incrementPage() {
    this.currentPage += 1;
    this.displayData = this.getDisplayData();
  }

  decrementPage() {
    if (this.currentPage == 1) {}
    else {
      this.currentPage -= 1;
      this.displayData = this.getDisplayData();
    }
  }

  displayData = this.getDisplayData();

}

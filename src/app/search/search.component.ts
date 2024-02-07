import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,
            FormsModule,
            RouterLink,],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor(private searchService: SearchService, private router: Router) {}
  
  searchValue:string = '';

  resetSearch() {
    this.searchService.updateSearch('');
    this.searchValue = '';
    
  }
  
  search() {
    this.searchService.updateSearch(this.searchValue);
    this.router.navigate(['./movie-dashboard'])
  }
  
}

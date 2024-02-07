import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map,} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private http: HttpClient) {}

  public searchSubject = new BehaviorSubject<string>("");
  search = this.searchSubject.asObservable();
  baseurl = "https://api.themoviedb.org/3";
  apikey = "<YOUR_APIKEY>";

  updateSearch(search: string) {
    this.searchSubject.next(search);
  }

  getSearchMovie(movieName: string, page: number): Observable<any> {
    return this.http.get<{results: any[]}>(`${this.baseurl}/search/movie?api_key=${this.apikey}&query=${movieName}&page=${page}`)
    .pipe(map((result) => result.results));
  }
}

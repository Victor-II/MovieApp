import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of, switchMap,} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GetDataService {
  constructor(private http: HttpClient) { }

  baseurl = "https://api.themoviedb.org/3";
  apikey = "<YOUR_APIKEY>";

  trendingMovieApiData(page:number): Observable<any> {
    return this.http.get<{results: any[]}>(`${this.baseurl}/trending/movie/day?api_key=${this.apikey}&page=${page}`)
    .pipe(map((result) => result.results));
  }

  getMovieDetails(movie_id:number): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/${movie_id}?api_key=${this.apikey}`);
  }

  getGenres(): Observable<[{id:number, name:string}]> {
    return this.http.get<{genres:any}>(`${this.baseurl}/genre/movie/list?language=en&api_key=${this.apikey}`).pipe(map((genres) => genres.genres));
  }

  genreMovieApiData(): Observable<any> {
    return this.getGenres().pipe(switchMap(genres => {return forkJoin(genres.map(genre => (of({'genre':genre.name, 'genre_id':genre.id, 'movies':this.getGenreMovies(genre.id, 1)}))))}));
  }

  getGenreMovies(genre_id:any, page:number): Observable<any> {
    return this.http.get<{results:any}>(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=${genre_id}&page=${page}`)
    .pipe(map((result) => result.results));
  }
}

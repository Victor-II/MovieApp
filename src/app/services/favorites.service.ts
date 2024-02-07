import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of, switchMap,} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FavoritesService {

  constructor(private http:HttpClient) { }

  baseurl = "https://api.themoviedb.org/3";
  apikey = "<YOUR_APIKEY>";

  private favoritesSubject = new BehaviorSubject<number[]>(this.getFavorites());
  favorites = this.favoritesSubject.asObservable();

  getMovieDetails(movie_id:number): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/${movie_id}?api_key=${this.apikey}`);
  }

  favoriteMovieApiData(): Observable<any> {
    return this.favorites.pipe(switchMap(favorites => {
      if (favorites.length === 0) {
        return of([]);
      }
      return forkJoin(favorites.map(movieId => this.getMovieDetails(movieId)));
    }));
  }

  toggleFavorite(movieId: number) {
    let currentFavorites: number[] = this.favoritesSubject.getValue();
    console.log(movieId, currentFavorites, "toggleFavorite")
    if (currentFavorites.includes(movieId)) {
      this.removeFavorite(movieId);
    } else {
      this.addFavorite(movieId);
    }
  }

  addFavorite(movieId:number) {
    // Get current favorites
    let currentFavorites: number[] = this.favoritesSubject.getValue();
    // Add new value
    const favoriteSet = new Set([...currentFavorites, movieId]);
    // Push new value to behavior subject and write to local storage
    this.favoritesSubject.next([...favoriteSet]);
    this.writeFavoritesToLocalStorage();
  }

  removeFavorite(movieId:number) {
    let currentFavorites: number[] = this.favoritesSubject.getValue();
    const favoriteSet = new Set(currentFavorites);
    favoriteSet.delete(movieId);
    this.favoritesSubject.next([...favoriteSet]);
    this.writeFavoritesToLocalStorage();
  }

  isFavorite(movieId: number) {
    return this.favoritesSubject.getValue().includes(movieId);
  }

  getFavorites() {
    let currentFavorites: number[] = [];
    try {
      currentFavorites = JSON.parse(localStorage.getItem("favorites") ?? "[]");
    } catch (e) {
      console.error("Error parsing favorites from local storage", e);
    }
    return currentFavorites;
  }

  private writeFavoritesToLocalStorage() {
    const favorites = this.favoritesSubject.getValue();
    localStorage.setItem("favorites", JSON.stringify([...favorites]));
  }
}


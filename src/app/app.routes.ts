import { Routes } from '@angular/router';
import { MovieDashboardComponent } from './movie-dashboard/movie-dashboard.component';
import { SearchComponent } from './search/search.component';
import { FavoritesDashboardComponent } from './favorites-dashboard/favorites-dashboard.component';
import { GenresDashboardComponent } from './genres-dashboard/genres-dashboard.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CategoryDashboardComponent } from './category-dashboard/category-dashboard.component';



export const routes: Routes = [
    {path: '', redirectTo: '/movie-dashboard', pathMatch: 'full'},
    {path: 'movie-dashboard', component: MovieDashboardComponent},
    {path: 'favorites-dashboard', component: FavoritesDashboardComponent},
    {path: 'genres-dashboard', component: GenresDashboardComponent},
    {path: 'movies/:id', component: MovieDetailsComponent},
    {path: 'categories/:id/:genre', component: CategoryDashboardComponent},
    {path: '**', component: PageNotFoundComponent},
];

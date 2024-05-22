import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from './Pages/favorites/dbConfig';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MarkdownModule } from 'ngx-markdown';
import { SafeHtmlPipe } from './pipes/keep-html.pipe';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './Pages/home/home.component';

import { DanceTypesComponent } from './Pages/dancetypes/dancetypes.component';
import { DanceLevelsComponent } from './Pages/dancelevels/dancelevels.component';
import { DanceEpochsComponent } from './Pages/danceepochs/danceepochs.component';
import { DancesComponent } from './Pages/dances/dances.component';
import { DanceComponent } from './Pages/dance/dance.component';
import { MovesComponent } from './Pages/moves/moves.component';
import { MoveComponent } from './Pages/move/move.component';
import { FavoritesComponent } from './Pages/favorites/favorites.component';

import { AdminHomeComponent } from './Pages/admin/home/home.component';
import { AdminDancesComponent } from './Pages/admin/dances/dances.component';
import { AdminDanceComponent } from './Pages/admin/dance/dance.component';
import { AdminMovesComponent } from './Pages/admin/moves/moves.component';
import { AdminMoveComponent } from './Pages/admin/move/move.component';


@NgModule({
  declarations: [
    SafeHtmlPipe,
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DanceTypesComponent,
    DanceLevelsComponent,
    DanceEpochsComponent,
    DanceComponent,
    DancesComponent,
    MovesComponent,
    MoveComponent,
    FavoritesComponent,

    AdminHomeComponent,
    AdminDancesComponent,
    AdminDanceComponent,
    AdminMovesComponent,
    AdminMoveComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    NgxIndexedDBModule.forRoot(dbConfig),

    BsDropdownModule.forRoot(),
    MarkdownModule.forRoot(),

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'dancetypes', component: DanceTypesComponent },
      { path: 'dancelevels', component: DanceLevelsComponent },
      { path: 'danceepochs', component: DanceEpochsComponent },
      { path: 'dances', component: DancesComponent },
      { path: 'dance/:id', component: DanceComponent },
      { path: 'moves', component: MovesComponent },
      { path: 'move/:name', component: MoveComponent },
      { path: 'favorites', component: FavoritesComponent },

      { path: 'admin', component: AdminHomeComponent },
      { path: 'admin/dances', component: AdminDancesComponent },
      { path: 'admin/moves', component: AdminMovesComponent },
      { path: 'admin/dance/:id', component: AdminDanceComponent },
      { path: 'admin/move/:name', component: AdminMoveComponent },

    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

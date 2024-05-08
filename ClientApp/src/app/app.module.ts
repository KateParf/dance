import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MarkdownModule } from 'ngx-markdown';

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

import { AdminHomeComponent } from './Pages/admin/home/home.component';
import { AdminDancesComponent } from './Pages/admin/dances/dances.component';
import { AdminDanceComponent } from './Pages/admin/dance/dance.component';
import { AdminMovesComponent } from './Pages/admin/moves/moves.component';
import { AdminMoveComponent } from './Pages/admin/move/move.component';


@NgModule({
  declarations: [
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

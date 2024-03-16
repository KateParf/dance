import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent }   from './home/home.component';
import { DanceTypesComponent } from './dancetypes/dancetypes.component';
import { DanceLevelsComponent } from './dancelevels/dancelevels.component';
import { DanceEpochsComponent } from './danceepochs/danceepochs.component';
import { DancesComponent }  from './dances/dances.component';
import { DanceComponent }  from './dance/dance.component';
import { MovesComponent }  from './moves/moves.component';
import { MoveComponent }   from './move/move.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    MoveComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'dancetypes',     component: DanceTypesComponent },
      { path: 'dancelevels',     component: DanceLevelsComponent },
      { path: 'danceepochs',     component: DanceEpochsComponent },
      { path: 'dances',     component: DancesComponent },
      { path: 'dance/:id',  component: DanceComponent },
      { path: 'moves',      component: MovesComponent },
      { path: 'move/:id',   component: MoveComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

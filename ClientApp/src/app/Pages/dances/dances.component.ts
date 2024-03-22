import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DanceEpoch } from 'src/app/Models/models';
import { DanceType } from 'src/app/Models/models';
import { DanceLevel } from 'src/app/Models/models';

@Component({
  selector: 'app-catalog',
  templateUrl: './dances.component.html'
})
export class DancesComponent {
  public dances: DancesCatalog[] = [];
  public types: DanceType[] = [];
  public epochs: DanceEpoch[] = [];
  public levels: DanceLevel[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    http.get<DanceType[]>(baseUrl + 'api/dancetypes').subscribe(result => {
      this.types = result;
    }, error => console.error(error));

    http.get<DanceEpoch[]>(baseUrl + 'api/danceepochs').subscribe(result => {
      this.epochs = result;
    }, error => console.error(error));

    http.get<DanceLevel[]>(baseUrl + 'api/dancelevels').subscribe(result => {
      this.levels = result;
    }, error => console.error(error));

    http.get<DancesCatalog[]>(baseUrl + 'api/dances').subscribe(result => {
      this.dances = result;
    }, error => console.error(error));
  }
}

interface DancesCatalog {
  id: number;
  name: string;
}

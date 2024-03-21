import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DanceEpoch } from 'src/app/Models/models';


@Component({
  selector: 'app-catalog',
  templateUrl: './dances.component.html'
})
export class DancesComponent {
  public dances: DancesCatalog[] = [];

  public epochs: DanceEpoch[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<DanceEpoch[]>(baseUrl + 'api/danceepochs').subscribe(result => {
      this.epochs = result;
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

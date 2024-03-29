import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DanceEpoch } from 'src/app/Models/models';

@Component({
  selector: 'app-catalog',
  templateUrl: './danceepochs.component.html'
})
export class DanceEpochsComponent {
  public danceepochs: DanceEpoch[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<DanceEpoch[]>(baseUrl + 'api/danceepochs').subscribe(result => {
      this.danceepochs = result;
    }, error => console.error(error));
  }
}

import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalog',
  templateUrl: './dancelevels.component.html'
})
export class DanceLevelsComponent {
  public dancelevels: DanceLevel[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<DanceLevel[]>(baseUrl + 'api/dancelevels').subscribe(result => {
      this.dancelevels = result;
    }, error => console.error(error));
  }
}

interface DanceLevel {
  id: number;
  name: string;
  imgName: string;
}

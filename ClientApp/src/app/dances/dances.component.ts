import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalog',
  templateUrl: './dances.component.html'
})
export class DancesComponent {
  public dances: DancesCatalog[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<DancesCatalog[]>(baseUrl + 'api/dancescatalog').subscribe(result => {
      this.dances = result;
    }, error => console.error(error));
  }
}

interface DancesCatalog {
  id: number;
  name: string;
}

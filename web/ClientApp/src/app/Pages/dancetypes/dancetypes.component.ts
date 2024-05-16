import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DanceType } from 'src/app/Models/models';

@Component({
  selector: 'app-catalog',
  templateUrl: './dancetypes.component.html'
})
export class DanceTypesComponent {
  public dancetypes: DanceType[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<DanceType[]>(baseUrl + 'api/dancetypes').subscribe(result => {
      this.dancetypes = result;
    }, error => console.error(error));
  }
}

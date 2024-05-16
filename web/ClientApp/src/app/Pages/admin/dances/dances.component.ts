import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-catalog',
  templateUrl: './dances.component.html'
})
export class AdminDancesComponent {
  public dances: DancesCatalog[] = [];

  private baseUrl: string = "";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;

    this.onSubmitFilter();
  }

  onSubmitFilter() {
    console.log("submit filter");

    let filterParams = "?filter";

    filterParams += "&filterPartnerExchYes=true";
    filterParams += "&filterPartnerExchNo=true";

    this.http.get<DancesCatalog[]>(this.baseUrl + 'api/dances' + filterParams).subscribe(result => {
      this.dances = result;
    }, error => console.error(error));
  }
}

interface DancesCatalog {
  id: number;
  name: string;
}


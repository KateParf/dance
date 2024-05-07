import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-catalog',
  templateUrl: './moves.component.html'
})
export class AdminmovesComponent {
  public moves: MovesCatalog[] = [];

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

    this.http.get<MovesCatalog[]>(this.baseUrl + 'api/moves' + filterParams).subscribe(result => {
      this.moves = result;
    }, error => console.error(error));
  }
}

interface MovesCatalog {
  id: number;
  name: string;
}


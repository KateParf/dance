import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  baseUrl: string;
  public dances: DancesCatalog[] = [];
  public moves: MovesCatalog[] = [];
  public cntDances: number = 0;
  public cntMoves: number = 0;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute) {
    this.baseUrl = baseUrl;

    this.http.get<DancesCatalog[]>(baseUrl + 'api/dances?filter&filterPartnerExchYes=true&filterPartnerExchNo=true').subscribe(result => {
      this.dances = result;
      this.cntDances = result.length;
    }, error => console.error(error));

    http.get<MovesCatalog[]>(baseUrl + 'api/movescatalog').subscribe(result => {
      this.moves = result;
      this.cntMoves = result.length;
    }, error => console.error(error));
  }
}

interface DancesCatalog {
  id: number;
  name: string;
}

interface MovesCatalog {
  id: number;
  name: string;
}



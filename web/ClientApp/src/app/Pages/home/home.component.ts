import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  baseUrl: string;
  public info: IndexInfo|undefined;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute) {
    this.baseUrl = baseUrl;

    this.http.get<IndexInfo>(baseUrl + 'api/indexinfo').subscribe(result => {
      this.info = result;
    }, error => console.error(error));
  }
}

interface IndexInfo {
  cntDances: number;
  cntMoves: number;
  lastDanceId: number;
  lastDanceName: string;
  lastMoveName: string;
}



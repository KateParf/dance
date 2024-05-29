import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  baseUrl: string;
  public info: IndexInfo | undefined;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute) {
    this.baseUrl = baseUrl;

    this.http.get<IndexInfo>(baseUrl + 'api/indexinfo').subscribe(result => {
      this.info = result;
    }, error => console.error(error));
  }

  downloadApk() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '/Media/Images/bg.jpg');
    link.setAttribute('download', `bg.jpg`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

interface IndexInfo {
  cntDances: number;
  cntMoves: number;
  lastDanceId: number;
  lastDanceName: string;
  lastMoveName: string;
}



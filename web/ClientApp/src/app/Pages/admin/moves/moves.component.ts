import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-catalog',
  templateUrl: './moves.component.html'
})
export class AdminMovesComponent {
  public moves: MovesCatalog[] = [];

  private baseUrl: string = "";

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<MovesCatalog[]>(baseUrl + 'api/movescatalog').subscribe(result => {
      this.moves = result;
    }, error => console.error(error));
  }
}

interface MovesCatalog {
  id: number;
  name: string;
}
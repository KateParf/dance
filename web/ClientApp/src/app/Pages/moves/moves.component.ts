import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalog',
  templateUrl: './moves.component.html'
})
export class MovesComponent {
  public moves: MovesCatalog[] = [];

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

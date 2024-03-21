import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalog',
  templateUrl: './move.component.html'
})
export class MoveComponent {
  public move: Move | undefined = undefined;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Move>(baseUrl + 'api/move').subscribe(result => {
      this.move = result;
    }, error => console.error(error));
  }
}

interface Move {
  id: number;
  name: string;
  description: string;
  videos: Media[];
}
interface Media {
  name: string;
  url: string;
}